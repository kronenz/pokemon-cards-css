<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { pb } from '$lib/pocketbase';
  import { currentUser } from '$lib/stores/unified';
  import type { UnifiedUser } from '$lib/types/unified';

  /**
   * Convert PocketBase user model to UnifiedUser
   */
  function convertToUnifiedUser(pbUser: any): UnifiedUser | null {
    if (!pbUser) return null;

    return {
      id: pbUser.id,
      username: pbUser.username || pbUser.name || pbUser.email?.split('@')[0] || 'User',
      email: pbUser.email || '',
      avatar: pbUser.avatar
        ? pb.files.getURL(pbUser, pbUser.avatar)
        : '/default-avatar.png',
      createdAt: new Date(pbUser.created || Date.now()),
      lastLoginAt: new Date(),
      fanProfile: {
        fanLevel: { level: 1, name: '루키팬' },
        currentPoints: 0,
        favoriteTeam: pbUser.favoriteTeam || '',
        achievedBadges: [],
        joinedFanclubs: []
      },
      creatorProfile: {
        creatorLevel: 'bronze',
        stats: {
          totalCards: pbUser.stats?.cardsCreated || 0,
          totalLikes: pbUser.stats?.totalLikes || 0,
          totalDownloads: 0,
          averageRating: 0,
          followers: pbUser.stats?.followers || 0,
          following: pbUser.stats?.following || 0
        },
        isVerified: pbUser.verified || false,
        specializations: []
      },
      collections: {
        owned: [],
        collectionProgress: [],
        totalCards: 0,
        rareCards: 0
      },
      preferences: {
        theme: 'dark',
        notifications: {
          newFollower: true,
          cardLike: true,
          cardComment: true,
          levelUp: true
        },
        privacy: {
          showCollections: true,
          showActivity: true
        }
      }
    };
  }

  /**
   * Sync PocketBase authStore with unified currentUser store
   */
  function syncAuthState() {
    if (!browser) return;

    const isValid = pb.authStore.isValid;
    const model = pb.authStore.model;

    if (isValid && model) {
      currentUser.set(convertToUnifiedUser(model));
    } else {
      currentUser.set(null);
    }
  }

  onMount(() => {
    if (!browser) return;

    // Sync auth state on mount
    syncAuthState();

    // Subscribe to PocketBase auth changes
    pb.authStore.onChange((token, model) => {
      if (token && model) {
        currentUser.set(convertToUnifiedUser(model));
      } else {
        currentUser.set(null);
      }
    });

    // Apple-style theme detection and management
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('kbo-cards-theme');
    const urlTheme = new URL(window.location.href).searchParams.get('theme');
    
    // Determine theme priority: URL > Saved > System > Default (dark)
    const theme = urlTheme || savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme immediately to prevent flash
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    // Save theme preference
    if (!urlTheme) {
      localStorage.setItem('kbo-cards-theme', theme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('kbo-cards-theme')) {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(e.matches ? 'dark' : 'light');
      }
    });
    
    // Hide loading screen with Apple-style animation
    const loading = document.getElementById('initial-loading');
    const appContainer = document.getElementById('app-container');
    
    if (loading && appContainer) {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1)';
      
      setTimeout(() => {
        loading.style.display = 'none';
        appContainer.style.display = 'block';
        appContainer.style.opacity = '0';
        appContainer.style.animation = 'fadeIn 400ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
      }, 300);
    }
    
    // Performance metrics (Apple-style)
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData && console.groupCollapsed) {
        console.groupCollapsed('🍎 Cards Performance Metrics');
        console.log('⚡ DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms');
        console.log('🎨 First Paint:', Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0) + 'ms');
        console.log('📱 Load Complete:', Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms');
        console.groupEnd();
      }
    }
    
    // Apple-style error handling
    window.addEventListener('error', (e) => {
      console.error('🚨 Cards Error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('🚨 Cards Promise Rejection:', e.reason);
    });
    
    // Apple-style viewport management for mobile
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', () => {
        document.documentElement.style.setProperty('--vh', (window.visualViewport?.height || window.innerHeight) * 0.01 + 'px');
      });
    }
    
    // Set initial viewport height
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    
    // Apple-style resize handling
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
      }, 100);
    });
  });
</script>

<!-- This component handles app initialization without rendering anything -->