// Test script to verify Supabase storage configuration
// Run with: node test-storage.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wnlacaqhdhavkafumhrt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubGFjYXFoZGhhdmthZnVtaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDE5NjcsImV4cCI6MjA2NjY3Nzk2N30.oACK8JZOWrbiAxup6W-0-kDGYfsrCTBui5ecs7dwAk0";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testStorageBuckets() {
  console.log('🔍 Testing Supabase Storage Configuration...\n');

  const buckets = ['portfolio-assets', 'avatars', 'resumes', 'project-images'];
  
  for (const bucketName of buckets) {
    try {
      console.log(`Testing bucket: ${bucketName}`);
      
      // Try to list files in the bucket
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list('', { limit: 1 });
      
      if (error) {
        console.log(`❌ ${bucketName}: ${error.message}`);
      } else {
        console.log(`✅ ${bucketName}: Accessible`);
      }
    } catch (err) {
      console.log(`❌ ${bucketName}: ${err.message}`);
    }
  }

  console.log('\n📋 Summary:');
  console.log('- If you see ❌ errors, run simple-storage-setup.sql in Supabase');
  console.log('- If you see ✅ for all buckets, storage is properly configured');
  console.log('- Make sure you have the correct Supabase URL and API key');
}

async function testDatabaseConnection() {
  console.log('\n🔍 Testing Database Connection...\n');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Database connection failed: ${error.message}`);
    } else {
      console.log('✅ Database connection successful');
    }
  } catch (err) {
    console.log(`❌ Database connection failed: ${err.message}`);
  }
}

async function main() {
  console.log('🚀 Portfolio Site Storage Test\n');
  
  await testDatabaseConnection();
  await testStorageBuckets();
  
  console.log('\n📝 Next Steps:');
  console.log('1. If storage tests fail, run simple-storage-setup.sql in Supabase');
  console.log('2. If database tests fail, check your Supabase configuration');
  console.log('3. Make sure your Supabase project is active and not paused');
  console.log('4. Check that your API keys are correct and have proper permissions');
}

main().catch(console.error); 