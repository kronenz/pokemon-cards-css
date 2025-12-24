/**
 * Test Data Seeder Script
 * 테스트 계정 2개와 커뮤니티 활성화 데이터 생성
 *
 * 실행: npx tsx scripts/seed-test-data.ts
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL = 'http://localhost:8090';
const pb = new PocketBase(POCKETBASE_URL);

// =============================================
// 테스트 사용자 데이터
// =============================================
const testUsers = [
  {
    email: 'baseball_fan_01@test.com',
    password: 'TestPass123!',
    passwordConfirm: 'TestPass123!',
    name: '야구덕후김철수',
    username: 'baseball_chulsoo',
    favoriteTeam: 'lg',
    bio: '30년차 LG 트윈스 팬입니다. 잠실구장이 제 집이에요! 카드 수집 3년차, 레전드 카드 모으는 재미에 빠졌습니다.',
    emailVisibility: true
  },
  {
    email: 'card_collector_02@test.com',
    password: 'TestPass123!',
    passwordConfirm: 'TestPass123!',
    name: '카드수집왕박영희',
    username: 'card_queen_younghee',
    favoriteTeam: 'doosan',
    bio: '두산 베어스 응원단장! 홀로그램 카드의 매력에 푹 빠진 카드 수집가입니다. 희귀 카드 교환 환영합니다 🎴',
    emailVisibility: true
  }
];

// =============================================
// 카드 데이터 (각 유저별)
// =============================================
const user1Cards = [
  {
    title: '2024 LG 우승 기념 홀로그램',
    description: '2024시즌 LG 트윈스 우승을 기념하는 특별 홀로그램 카드입니다. 잠실구장의 환희와 함께!',
    rarity: 'legendary',
    team: 'lg',
    effectType: 'cosmic',
    tags: ['LG트윈스', '우승', '2024시즌', '잠실구장'],
    is_shared: true,
    like_count: 128,
    comment_count: 23,
    view_count: 1523
  },
  {
    title: '오지환 끝내기 홈런 순간',
    description: '9회말 2아웃 동점 상황에서 터진 오지환의 끝내기 3점 홈런! 그 순간을 담았습니다.',
    rarity: 'epic',
    team: 'lg',
    effectType: 'rainbow',
    tags: ['오지환', '끝내기홈런', 'LG트윈스', '명장면'],
    is_shared: true,
    like_count: 89,
    comment_count: 15,
    view_count: 892
  },
  {
    title: '잠실구장 야경 파노라마',
    description: '야간 경기 시작 전 잠실구장의 아름다운 야경을 담은 카드',
    rarity: 'rare',
    team: 'lg',
    effectType: 'aurora',
    tags: ['잠실구장', '야경', '스타디움', 'LG트윈스'],
    is_shared: true,
    like_count: 67,
    comment_count: 8,
    view_count: 543
  },
  {
    title: '임찬규 삼진 컬렉션',
    description: '2024시즌 임찬규 주요 삼진 장면 모음 카드',
    rarity: 'epic',
    team: 'lg',
    effectType: 'neon',
    tags: ['임찬규', '삼진', 'LG트윈스', '투수'],
    is_shared: true,
    like_count: 72,
    comment_count: 11,
    view_count: 678
  },
  {
    title: '홍창기 슈퍼캐치 모음',
    description: '외야의 수비 장인 홍창기의 슈퍼캐치 베스트 모음',
    rarity: 'rare',
    team: 'lg',
    effectType: 'rainbow',
    tags: ['홍창기', '슈퍼캐치', '수비', 'LG트윈스'],
    is_shared: true,
    like_count: 54,
    comment_count: 7,
    view_count: 412
  },
  {
    title: '2024 시범경기 첫 승 기념',
    description: '새 시즌을 알리는 시범경기 첫 승을 기념하며',
    rarity: 'uncommon',
    team: 'lg',
    effectType: 'cosmic',
    tags: ['시범경기', '시즌시작', 'LG트윈스'],
    is_shared: true,
    like_count: 32,
    comment_count: 4,
    view_count: 234
  },
  {
    title: '류현진 vs LG 명승부',
    description: '류현진 선수와의 역대급 투수전을 기념하는 카드',
    rarity: 'rare',
    team: 'lg',
    effectType: 'aurora',
    tags: ['류현진', '투수전', 'LG트윈스', '한화이글스'],
    is_shared: true,
    like_count: 95,
    comment_count: 18,
    view_count: 1102
  },
  {
    title: '팬 응원 모자이크 아트',
    description: '잠실 관중들의 응원 사진을 모아 만든 모자이크 아트 카드',
    rarity: 'epic',
    team: 'lg',
    effectType: 'cosmic',
    tags: ['팬아트', '모자이크', '응원', 'LG트윈스'],
    is_shared: true,
    like_count: 156,
    comment_count: 29,
    view_count: 2341
  }
];

const user2Cards = [
  {
    title: '두산 베어스 2024 개막전',
    description: '2024시즌 개막전 두산 베어스의 첫 경기를 기념하는 홀로그램 카드',
    rarity: 'epic',
    team: 'doosan',
    effectType: 'cosmic',
    tags: ['두산베어스', '개막전', '2024시즌', '잠실구장'],
    is_shared: true,
    like_count: 98,
    comment_count: 19,
    view_count: 1234
  },
  {
    title: '양의지 500호 홈런 기념',
    description: '두산의 레전드 양의지 선수의 통산 500호 홈런을 기념하는 특별 카드',
    rarity: 'legendary',
    team: 'doosan',
    effectType: 'rainbow',
    tags: ['양의지', '500홈런', '레전드', '두산베어스'],
    is_shared: true,
    like_count: 213,
    comment_count: 45,
    view_count: 3456
  },
  {
    title: '곽빈 노히트 달성 순간',
    description: '2024시즌 곽빈 투수의 역사적인 노히트노런 달성 순간',
    rarity: 'mythic',
    team: 'doosan',
    effectType: 'aurora',
    tags: ['곽빈', '노히트노런', '역사', '두산베어스'],
    is_shared: true,
    like_count: 321,
    comment_count: 67,
    view_count: 5678
  },
  {
    title: '김재환 만루홈런 컬렉션',
    description: '김재환 선수의 짜릿한 만루홈런 순간들을 모은 카드',
    rarity: 'epic',
    team: 'doosan',
    effectType: 'neon',
    tags: ['김재환', '만루홈런', '그랜드슬램', '두산베어스'],
    is_shared: true,
    like_count: 87,
    comment_count: 12,
    view_count: 876
  },
  {
    title: '두산 VS 삼성 라이벌전',
    description: '영원한 라이벌 삼성과의 명승부를 담은 카드',
    rarity: 'rare',
    team: 'doosan',
    effectType: 'cosmic',
    tags: ['라이벌', '두산베어스', '삼성라이온즈', '명승부'],
    is_shared: true,
    like_count: 76,
    comment_count: 14,
    view_count: 654
  },
  {
    title: '잠실구장 두산 응원단',
    description: '열정적인 두산 베어스 응원단의 응원 풍경',
    rarity: 'rare',
    team: 'doosan',
    effectType: 'rainbow',
    tags: ['응원단', '팬', '잠실구장', '두산베어스'],
    is_shared: true,
    like_count: 65,
    comment_count: 9,
    view_count: 543
  },
  {
    title: '2023 준플레이오프 승리',
    description: '2023시즌 준플레이오프 승리의 기쁨을 담은 카드',
    rarity: 'epic',
    team: 'doosan',
    effectType: 'aurora',
    tags: ['플레이오프', '승리', '2023시즌', '두산베어스'],
    is_shared: true,
    like_count: 112,
    comment_count: 21,
    view_count: 1567
  },
  {
    title: '두산 유니폼 역사 컬렉션',
    description: '두산 베어스 역대 유니폼을 한눈에 담은 카드',
    rarity: 'rare',
    team: 'doosan',
    effectType: 'cosmic',
    tags: ['유니폼', '역사', '컬렉션', '두산베어스'],
    is_shared: true,
    like_count: 89,
    comment_count: 16,
    view_count: 987
  },
  {
    title: 'OB 베어스 레트로 카드',
    description: 'OB 베어스 시절의 추억을 담은 레트로 카드',
    rarity: 'legendary',
    team: 'doosan',
    effectType: 'rainbow',
    tags: ['OB베어스', '레트로', '추억', '두산베어스'],
    is_shared: true,
    like_count: 178,
    comment_count: 34,
    view_count: 2345
  },
  {
    title: '두산 신인왕 특집',
    description: '두산 베어스 역대 신인왕들을 모은 특별 카드',
    rarity: 'epic',
    team: 'doosan',
    effectType: 'neon',
    tags: ['신인왕', '유망주', '역대', '두산베어스'],
    is_shared: true,
    like_count: 94,
    comment_count: 17,
    view_count: 1123
  }
];

// =============================================
// 커뮤니티 게시글 (피드 아이템)
// =============================================
const feedPosts = [
  // User 1 posts
  {
    userIndex: 0,
    type: 'card_created',
    content: '드디어 2024 우승 기념 카드 완성했습니다!! 🏆 30년 기다린 보람이 있네요 ㅠㅠ',
    metadata: { mood: 'excited', hasCard: true }
  },
  {
    userIndex: 0,
    type: 'card_created',
    content: '오지환 끝내기 홈런 카드 만들었어요. 그날 직관하고 왔는데 아직도 소름돋네요',
    metadata: { mood: 'happy', hasCard: true }
  },
  {
    userIndex: 0,
    type: 'achievement_earned',
    content: '카드 50장 달성! 이제 진짜 수집가 반열에 올랐나요? ㅋㅋ',
    metadata: { achievement: '50_cards_collected' }
  },
  {
    userIndex: 0,
    type: 'card_liked',
    content: '요즘 두산 카드들도 퀄리티가 좋네요. 팬은 아니지만 인정합니다 👍',
    metadata: { mood: 'impressed' }
  },
  // User 2 posts
  {
    userIndex: 1,
    type: 'card_created',
    content: '양의지 500호 홈런 기념 카드입니다! 레전드는 레전드 💪',
    metadata: { mood: 'proud', hasCard: true }
  },
  {
    userIndex: 1,
    type: 'card_created',
    content: '곽빈 노히트노런 카드 드디어 완성!! 이건 진짜 신화급이죠',
    metadata: { mood: 'ecstatic', hasCard: true }
  },
  {
    userIndex: 1,
    type: 'user_followed',
    content: '야구 좋아하는 분들 서로 팔로우해요! 카드 구경 환영합니다 🙌',
    metadata: { social: true }
  },
  {
    userIndex: 1,
    type: 'grade_upgraded',
    content: '드디어 포토그래퍼 등급 달성했어요! 열심히 모은 보람이 있네요 📸',
    metadata: { newGrade: 'photographer' }
  },
  {
    userIndex: 1,
    type: 'card_created',
    content: 'OB 베어스 레트로 카드 만들어봤습니다. 아버지 세대 팬분들께 추천!',
    metadata: { mood: 'nostalgic', hasCard: true }
  },
  {
    userIndex: 0,
    type: 'card_created',
    content: '팬 응원 모자이크 아트 완성! 직관 사진들 모아서 만들었어요',
    metadata: { mood: 'creative', hasCard: true }
  },
  {
    userIndex: 1,
    type: 'card_liked',
    content: 'LG 우승 카드 봤는데 퀄리티 미쳤네요... 부럽다 ㅠㅠ',
    metadata: { mood: 'envious' }
  },
  {
    userIndex: 0,
    type: 'achievement_earned',
    content: '첫 전설급 카드 획득!! 가챠 100번만에 나왔어요 ㅋㅋㅋ',
    metadata: { achievement: 'first_legendary' }
  }
];

// =============================================
// 댓글 데이터
// =============================================
const commentsData = [
  // Comments on User1's cards (from User2)
  { cardOwner: 0, cardIndex: 0, commenter: 1, content: '와 이거 진짜 퀄리티 대박이네요! 홀로그램 효과가 장난 아니에요 👏' },
  { cardOwner: 0, cardIndex: 0, commenter: 1, content: '우승 기념 카드로 딱이네요. 저도 두산 우승하면 만들어야지...' },
  { cardOwner: 0, cardIndex: 1, commenter: 1, content: '오지환 끝내기 직관하셨어요?! 부럽습니다 ㅠㅠ' },
  { cardOwner: 0, cardIndex: 2, commenter: 1, content: '잠실 야경 진짜 예쁘죠. 사진 잘 뽑으셨네요!' },
  { cardOwner: 0, cardIndex: 7, commenter: 1, content: '모자이크 아트 대박... 이거 어떻게 만드신 거예요??' },

  // Comments on User2's cards (from User1)
  { cardOwner: 1, cardIndex: 0, commenter: 0, content: '개막전 카드 퀄리티 좋네요! 두산도 올해 화이팅!' },
  { cardOwner: 1, cardIndex: 1, commenter: 0, content: '양의지 레전드는 인정합니다. 500홈런 대단해요' },
  { cardOwner: 1, cardIndex: 2, commenter: 0, content: '노히트노런 카드... 이건 진짜 소장가치 있겠네요 👍' },
  { cardOwner: 1, cardIndex: 2, commenter: 0, content: '신화급 레어도 맞는 것 같아요. 부럽습니다!' },
  { cardOwner: 1, cardIndex: 8, commenter: 0, content: 'OB 베어스 레트로 감성 좋네요. 추억이 새록새록' },

  // Additional varied comments
  { cardOwner: 0, cardIndex: 3, commenter: 1, content: '임찬규 삼진 장면 모음 좋아요! 투수 카드 더 만들어주세요' },
  { cardOwner: 1, cardIndex: 3, commenter: 0, content: '김재환 만루홈런 컬렉션 대박이네요 ㅋㅋ' },
  { cardOwner: 0, cardIndex: 6, commenter: 1, content: '류현진전 투수전 그 경기 기억나요! 명경기였죠' },
  { cardOwner: 1, cardIndex: 4, commenter: 0, content: '라이벌전 카드 좋네요. 다음엔 LG vs 두산도 만들어주세요!' },
  { cardOwner: 1, cardIndex: 9, commenter: 0, content: '신인왕 특집 좋은 기획이에요! 기대되는 선수들 많죠' }
];

// =============================================
// 이미지 URL (Picsum 랜덤 이미지 사용)
// =============================================
function getRandomCardImage(seed: number): string {
  return `https://picsum.photos/seed/${seed}/400/560`;
}

// =============================================
// Main Seeder Functions
// =============================================

async function createUsers(): Promise<string[]> {
  console.log('📝 Creating test users...');
  const userIds: string[] = [];

  for (const userData of testUsers) {
    try {
      // Check if user already exists
      const existing = await pb.collection('users').getList(1, 1, {
        filter: `email="${userData.email}"`
      }).catch(() => ({ items: [] }));

      if (existing.items.length > 0) {
        console.log(`  ⚠️  User ${userData.email} already exists, using existing ID`);
        userIds.push(existing.items[0].id);
        continue;
      }

      const user = await pb.collection('users').create({
        ...userData,
        stats: {
          cardsCreated: 0,
          totalLikes: 0,
          followers: 0,
          following: 0,
          gradePoints: 0
        },
        preferences: {
          emailNotifications: true,
          publicProfile: true
        }
      });

      userIds.push(user.id);
      console.log(`  ✅ Created user: ${userData.name} (${user.id})`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create user ${userData.email}:`, error.message);
    }
  }

  return userIds;
}

async function createCards(userIds: string[]): Promise<Map<string, string[]>> {
  console.log('\n🎴 Creating cards...');
  const cardMap = new Map<string, string[]>();

  // User 1 cards
  const user1CardIds: string[] = [];
  for (let i = 0; i < user1Cards.length; i++) {
    const cardData = user1Cards[i];
    try {
      const card = await pb.collection('cards').create({
        creator: userIds[0],
        title: cardData.title,
        description: cardData.description,
        image: getRandomCardImage(1000 + i),
        rarity: cardData.rarity,
        team: cardData.team,
        effect_type: cardData.effectType,
        tags: cardData.tags,
        is_shared: cardData.is_shared,
        like_count: cardData.like_count,
        comment_count: cardData.comment_count,
        view_count: cardData.view_count,
        holographic_effect: {
          type: cardData.effectType,
          intensity: 0.8,
          animationSpeed: 1
        }
      });
      user1CardIds.push(card.id);
      console.log(`  ✅ Created card: ${cardData.title}`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create card ${cardData.title}:`, error.message);
    }
  }
  cardMap.set(userIds[0], user1CardIds);

  // User 2 cards
  const user2CardIds: string[] = [];
  for (let i = 0; i < user2Cards.length; i++) {
    const cardData = user2Cards[i];
    try {
      const card = await pb.collection('cards').create({
        creator: userIds[1],
        title: cardData.title,
        description: cardData.description,
        image: getRandomCardImage(2000 + i),
        rarity: cardData.rarity,
        team: cardData.team,
        effect_type: cardData.effectType,
        tags: cardData.tags,
        is_shared: cardData.is_shared,
        like_count: cardData.like_count,
        comment_count: cardData.comment_count,
        view_count: cardData.view_count,
        holographic_effect: {
          type: cardData.effectType,
          intensity: 0.8,
          animationSpeed: 1
        }
      });
      user2CardIds.push(card.id);
      console.log(`  ✅ Created card: ${cardData.title}`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create card ${cardData.title}:`, error.message);
    }
  }
  cardMap.set(userIds[1], user2CardIds);

  return cardMap;
}

async function createFeedItems(userIds: string[]): Promise<void> {
  console.log('\n📰 Creating feed items...');

  for (const post of feedPosts) {
    try {
      await pb.collection('feed_items').create({
        user: userIds[post.userIndex],
        type: post.type,
        content: { text: post.content },
        metadata: post.metadata
      });
      console.log(`  ✅ Created feed item: "${post.content.substring(0, 30)}..."`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create feed item:`, error.message);
    }
  }
}

async function createComments(userIds: string[], cardMap: Map<string, string[]>): Promise<void> {
  console.log('\n💬 Creating comments...');

  const user1Cards = cardMap.get(userIds[0]) || [];
  const user2Cards = cardMap.get(userIds[1]) || [];

  for (const commentData of commentsData) {
    try {
      const cards = commentData.cardOwner === 0 ? user1Cards : user2Cards;
      const cardId = cards[commentData.cardIndex];
      const commenterId = userIds[commentData.commenter];

      if (!cardId) {
        console.log(`  ⚠️  Card not found for comment, skipping`);
        continue;
      }

      await pb.collection('comments').create({
        user: commenterId,
        card: cardId,
        content: commentData.content
      });
      console.log(`  ✅ Created comment: "${commentData.content.substring(0, 30)}..."`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create comment:`, error.message);
    }
  }
}

async function createFollowRelationships(userIds: string[]): Promise<void> {
  console.log('\n👥 Creating follow relationships...');

  // User 1 follows User 2
  try {
    await pb.collection('follows').create({
      follower: userIds[0],
      following: userIds[1]
    });
    console.log(`  ✅ ${testUsers[0].name} → ${testUsers[1].name}`);
  } catch (error: any) {
    console.error(`  ❌ Failed to create follow:`, error.message);
  }

  // User 2 follows User 1 (mutual follow)
  try {
    await pb.collection('follows').create({
      follower: userIds[1],
      following: userIds[0]
    });
    console.log(`  ✅ ${testUsers[1].name} → ${testUsers[0].name}`);
  } catch (error: any) {
    console.error(`  ❌ Failed to create follow:`, error.message);
  }
}

async function createLikes(userIds: string[], cardMap: Map<string, string[]>): Promise<void> {
  console.log('\n❤️ Creating likes...');

  const user1Cards = cardMap.get(userIds[0]) || [];
  const user2Cards = cardMap.get(userIds[1]) || [];

  // User 2 likes User 1's cards
  for (let i = 0; i < Math.min(5, user1Cards.length); i++) {
    try {
      await pb.collection('likes').create({
        user: userIds[1],
        card: user1Cards[i]
      });
      console.log(`  ✅ ${testUsers[1].name} liked card ${i + 1} of ${testUsers[0].name}`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create like:`, error.message);
    }
  }

  // User 1 likes User 2's cards
  for (let i = 0; i < Math.min(6, user2Cards.length); i++) {
    try {
      await pb.collection('likes').create({
        user: userIds[0],
        card: user2Cards[i]
      });
      console.log(`  ✅ ${testUsers[0].name} liked card ${i + 1} of ${testUsers[1].name}`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create like:`, error.message);
    }
  }
}

async function updateUserStats(userIds: string[], cardMap: Map<string, string[]>): Promise<void> {
  console.log('\n📊 Updating user stats...');

  for (let i = 0; i < userIds.length; i++) {
    try {
      const cards = cardMap.get(userIds[i]) || [];
      const totalLikes = i === 0
        ? user1Cards.reduce((sum, c) => sum + c.like_count, 0)
        : user2Cards.reduce((sum, c) => sum + c.like_count, 0);

      await pb.collection('users').update(userIds[i], {
        'stats.cardsCreated': cards.length,
        'stats.totalLikes': totalLikes,
        'stats.followers': 1,
        'stats.following': 1,
        'stats.gradePoints': i === 0 ? 1250 : 1890
      });
      console.log(`  ✅ Updated stats for ${testUsers[i].name}`);
    } catch (error: any) {
      console.error(`  ❌ Failed to update stats:`, error.message);
    }
  }
}

async function createNotifications(userIds: string[], cardMap: Map<string, string[]>): Promise<void> {
  console.log('\n🔔 Creating notifications...');

  const notifications = [
    {
      user: userIds[0],
      type: 'like',
      data: {
        card_title: user1Cards[0].title,
        liker_name: testUsers[1].name
      },
      is_read: false
    },
    {
      user: userIds[0],
      type: 'comment',
      data: {
        card_title: user1Cards[0].title,
        commenter_name: testUsers[1].name,
        comment_preview: commentsData[0].content.substring(0, 50)
      },
      is_read: false
    },
    {
      user: userIds[0],
      type: 'follow',
      data: {
        follower_name: testUsers[1].name
      },
      is_read: true
    },
    {
      user: userIds[1],
      type: 'like',
      data: {
        card_title: user2Cards[1].title,
        liker_name: testUsers[0].name
      },
      is_read: false
    },
    {
      user: userIds[1],
      type: 'comment',
      data: {
        card_title: user2Cards[2].title,
        commenter_name: testUsers[0].name,
        comment_preview: commentsData[7].content.substring(0, 50)
      },
      is_read: true
    },
    {
      user: userIds[1],
      type: 'follow',
      data: {
        follower_name: testUsers[0].name
      },
      is_read: true
    }
  ];

  for (const notif of notifications) {
    try {
      await pb.collection('notifications').create(notif);
      console.log(`  ✅ Created ${notif.type} notification for user`);
    } catch (error: any) {
      console.error(`  ❌ Failed to create notification:`, error.message);
    }
  }
}

// =============================================
// Main Execution
// =============================================

async function main() {
  console.log('🚀 Starting test data seeding...\n');
  console.log('='.repeat(50));

  try {
    // Check PocketBase connection
    console.log('🔌 Checking PocketBase connection...');
    const health = await pb.health.check();
    console.log(`  ✅ PocketBase is healthy: ${health.message}\n`);

    // Create users
    const userIds = await createUsers();
    if (userIds.length < 2) {
      throw new Error('Failed to create required test users');
    }

    // Create cards
    const cardMap = await createCards(userIds);

    // Create feed items
    await createFeedItems(userIds);

    // Create comments
    await createComments(userIds, cardMap);

    // Create follow relationships
    await createFollowRelationships(userIds);

    // Create likes
    await createLikes(userIds, cardMap);

    // Update user stats
    await updateUserStats(userIds, cardMap);

    // Create notifications
    await createNotifications(userIds, cardMap);

    console.log('\n' + '='.repeat(50));
    console.log('✅ Test data seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log(`  • Users created: ${testUsers.length}`);
    console.log(`  • Cards created: ${user1Cards.length + user2Cards.length}`);
    console.log(`  • Feed posts: ${feedPosts.length}`);
    console.log(`  • Comments: ${commentsData.length}`);
    console.log(`  • Follow relationships: 2 (mutual)`);
    console.log(`  • Notifications: 6`);
    console.log('\n📧 Test Accounts:');
    testUsers.forEach((u, i) => {
      console.log(`  ${i + 1}. ${u.email} / ${u.password}`);
      console.log(`     Name: ${u.name}, Team: ${u.favoriteTeam.toUpperCase()}`);
    });

  } catch (error: any) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
