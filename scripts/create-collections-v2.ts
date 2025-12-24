/**
 * PocketBase Collections Setup Script v2
 * 필요한 컬렉션을 생성합니다.
 */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function createCollections() {
  console.log('🔐 Authenticating as admin...');
  await pb.admins.authWithPassword('admin@kbo-cards.com', 'admin123456');
  console.log('✅ Admin authenticated\n');

  // Get users collection ID
  const usersCollection = await pb.collections.getOne('users');
  const usersCollectionId = usersCollection.id;
  console.log('Users collection ID:', usersCollectionId);

  // 1. Cards Collection
  console.log('\n📦 Creating cards collection...');
  let cardsCollectionId = '';
  try {
    const existingCards = await pb.collections.getOne('cards').catch(() => null);
    if (existingCards) {
      console.log('  ⚠️  cards already exists');
      cardsCollectionId = existingCards.id;
    } else {
      const cardsResult = await pb.collections.create({
        name: 'cards',
        type: 'base',
        schema: [
          { name: 'creator', type: 'relation', required: true, options: { collectionId: usersCollectionId, maxSelect: 1, cascadeDelete: false } },
          { name: 'title', type: 'text', required: true, options: { min: 1, max: 200 } },
          { name: 'description', type: 'text', options: { max: 2000 } },
          { name: 'image', type: 'url' },
          { name: 'rarity', type: 'text' },
          { name: 'team', type: 'text' },
          { name: 'effect_type', type: 'text' },
          { name: 'tags', type: 'json' },
          { name: 'is_shared', type: 'bool' },
          { name: 'like_count', type: 'number' },
          { name: 'comment_count', type: 'number' },
          { name: 'view_count', type: 'number' },
          { name: 'share_count', type: 'number' },
          { name: 'holographic_effect', type: 'json' }
        ],
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: ''
      });
      console.log('  ✅ cards collection created');
      cardsCollectionId = cardsResult.id;
    }
  } catch (e: any) {
    console.log('  ❌ cards:', e.response?.data || e.message);
  }

  // 2. Comments Collection
  console.log('📦 Creating comments collection...');
  try {
    const existingComments = await pb.collections.getOne('comments').catch(() => null);
    if (existingComments) {
      console.log('  ⚠️  comments already exists');
    } else if (cardsCollectionId) {
      await pb.collections.create({
        name: 'comments',
        type: 'base',
        schema: [
          { name: 'user', type: 'relation', required: true, options: { collectionId: usersCollectionId, maxSelect: 1, cascadeDelete: false } },
          { name: 'card', type: 'relation', required: true, options: { collectionId: cardsCollectionId, maxSelect: 1, cascadeDelete: true } },
          { name: 'content', type: 'text', required: true, options: { max: 1000 } }
        ],
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: ''
      });
      console.log('  ✅ comments collection created');
    }
  } catch (e: any) {
    console.log('  ❌ comments:', e.response?.data || e.message);
  }

  // 3. Likes Collection
  console.log('📦 Creating likes collection...');
  try {
    const existingLikes = await pb.collections.getOne('likes').catch(() => null);
    if (existingLikes) {
      console.log('  ⚠️  likes already exists');
    } else if (cardsCollectionId) {
      await pb.collections.create({
        name: 'likes',
        type: 'base',
        schema: [
          { name: 'user', type: 'relation', required: true, options: { collectionId: usersCollectionId, maxSelect: 1, cascadeDelete: false } },
          { name: 'card', type: 'relation', required: true, options: { collectionId: cardsCollectionId, maxSelect: 1, cascadeDelete: true } }
        ],
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: ''
      });
      console.log('  ✅ likes collection created');
    }
  } catch (e: any) {
    console.log('  ❌ likes:', e.response?.data || e.message);
  }

  // 4. Feed Items Collection
  console.log('📦 Creating feed_items collection...');
  try {
    const existingFeed = await pb.collections.getOne('feed_items').catch(() => null);
    if (existingFeed) {
      console.log('  ⚠️  feed_items already exists');
    } else {
      await pb.collections.create({
        name: 'feed_items',
        type: 'base',
        schema: [
          { name: 'user', type: 'relation', required: true, options: { collectionId: usersCollectionId, maxSelect: 1, cascadeDelete: false } },
          { name: 'type', type: 'text', required: true },
          { name: 'content', type: 'json' },
          { name: 'metadata', type: 'json' }
        ],
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: ''
      });
      console.log('  ✅ feed_items collection created');
    }
  } catch (e: any) {
    console.log('  ❌ feed_items:', e.response?.data || e.message);
  }

  // 5. Notifications Collection
  console.log('📦 Creating notifications collection...');
  try {
    const existingNotif = await pb.collections.getOne('notifications').catch(() => null);
    if (existingNotif) {
      console.log('  ⚠️  notifications already exists');
    } else {
      await pb.collections.create({
        name: 'notifications',
        type: 'base',
        schema: [
          { name: 'user', type: 'relation', required: true, options: { collectionId: usersCollectionId, maxSelect: 1, cascadeDelete: false } },
          { name: 'type', type: 'text', required: true },
          { name: 'data', type: 'json' },
          { name: 'is_read', type: 'bool' }
        ],
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: ''
      });
      console.log('  ✅ notifications collection created');
    }
  } catch (e: any) {
    console.log('  ❌ notifications:', e.response?.data || e.message);
  }

  // Check final result
  const collections = await pb.collections.getFullList();
  console.log('\n📋 Final collections:', collections.map(c => c.name));
  console.log('\n✅ Collection setup complete!');
}

createCollections().catch(console.error);
