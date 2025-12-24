/**
 * PocketBase Collections Setup Script
 * 필요한 컬렉션을 생성합니다.
 */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function createCollections() {
  console.log('🔐 Authenticating as admin...');
  await pb.admins.authWithPassword('admin@kbo-cards.com', 'admin123456');
  console.log('✅ Admin authenticated\n');

  // 1. Cards Collection
  console.log('📦 Creating cards collection...');
  try {
    await pb.collections.create({
      name: 'cards',
      type: 'base',
      schema: [
        { name: 'creator', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'url' },
        { name: 'rarity', type: 'select', options: { values: ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'] } },
        { name: 'team', type: 'select', options: { values: ['lg', 'doosan', 'kt', 'samsung', 'lotte', 'kia', 'nc', 'hanwha', 'ssg', 'kiwoom'] } },
        { name: 'effect_type', type: 'select', options: { values: ['rainbow', 'cosmic', 'aurora', 'neon'] } },
        { name: 'tags', type: 'json' },
        { name: 'is_shared', type: 'bool' },
        { name: 'like_count', type: 'number', options: { min: 0 } },
        { name: 'comment_count', type: 'number', options: { min: 0 } },
        { name: 'view_count', type: 'number', options: { min: 0 } },
        { name: 'share_count', type: 'number', options: { min: 0 } },
        { name: 'holographic_effect', type: 'json' }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: 'creator = @request.auth.id',
      deleteRule: 'creator = @request.auth.id'
    });
    console.log('  ✅ cards collection created');
  } catch (e: any) {
    console.log('  ⚠️  cards:', e.message);
  }

  // 2. Comments Collection
  console.log('📦 Creating comments collection...');
  try {
    await pb.collections.create({
      name: 'comments',
      type: 'base',
      schema: [
        { name: 'user', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'card', type: 'relation', required: true, options: { collectionId: 'cards', maxSelect: 1, cascadeDelete: true } },
        { name: 'content', type: 'text', required: true }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: 'user = @request.auth.id',
      deleteRule: 'user = @request.auth.id'
    });
    console.log('  ✅ comments collection created');
  } catch (e: any) {
    console.log('  ⚠️  comments:', e.message);
  }

  // 3. Likes Collection
  console.log('📦 Creating likes collection...');
  try {
    await pb.collections.create({
      name: 'likes',
      type: 'base',
      schema: [
        { name: 'user', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'card', type: 'relation', required: true, options: { collectionId: 'cards', maxSelect: 1, cascadeDelete: true } }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '',
      deleteRule: 'user = @request.auth.id',
      indexes: ['CREATE UNIQUE INDEX idx_user_card ON likes (user, card)']
    });
    console.log('  ✅ likes collection created');
  } catch (e: any) {
    console.log('  ⚠️  likes:', e.message);
  }

  // 4. Follows Collection
  console.log('📦 Creating follows collection...');
  try {
    await pb.collections.create({
      name: 'follows',
      type: 'base',
      schema: [
        { name: 'follower', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'following', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '',
      deleteRule: 'follower = @request.auth.id',
      indexes: ['CREATE UNIQUE INDEX idx_follower_following ON follows (follower, following)']
    });
    console.log('  ✅ follows collection created');
  } catch (e: any) {
    console.log('  ⚠️  follows:', e.message);
  }

  // 5. Feed Items Collection
  console.log('📦 Creating feed_items collection...');
  try {
    await pb.collections.create({
      name: 'feed_items',
      type: 'base',
      schema: [
        { name: 'user', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'type', type: 'select', required: true, options: { values: ['card_created', 'card_liked', 'user_followed', 'grade_upgraded', 'achievement_earned'] } },
        { name: 'content', type: 'json' },
        { name: 'metadata', type: 'json' }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: 'user = @request.auth.id',
      deleteRule: 'user = @request.auth.id'
    });
    console.log('  ✅ feed_items collection created');
  } catch (e: any) {
    console.log('  ⚠️  feed_items:', e.message);
  }

  // 6. Notifications Collection
  console.log('📦 Creating notifications collection...');
  try {
    await pb.collections.create({
      name: 'notifications',
      type: 'base',
      schema: [
        { name: 'user', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1, cascadeDelete: false } },
        { name: 'type', type: 'select', required: true, options: { values: ['like', 'comment', 'follow', 'achievement'] } },
        { name: 'data', type: 'json' },
        { name: 'is_read', type: 'bool' }
      ],
      listRule: 'user = @request.auth.id',
      viewRule: 'user = @request.auth.id',
      createRule: '',
      updateRule: 'user = @request.auth.id',
      deleteRule: 'user = @request.auth.id'
    });
    console.log('  ✅ notifications collection created');
  } catch (e: any) {
    console.log('  ⚠️  notifications:', e.message);
  }

  // Check final result
  const collections = await pb.collections.getFullList();
  console.log('\n📋 Final collections:', collections.map(c => c.name));
  console.log('\n✅ Collection setup complete!');
}

createCollections().catch(console.error);
