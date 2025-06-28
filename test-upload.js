// Test script to verify upload functionality
// Run with: node test-upload.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wnlacaqhdhavkafumhrt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubGFjYXFoZGhhdmthZnVtaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDE5NjcsImV4cCI6MjA2NjY3Nzk2N30.oACK8JZOWrbiAxup6W-0-kDGYfsrCTBui5ecs7dwAk0";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testUploadPermissions() {
  console.log('🔍 Testing Upload Permissions...\n');

  const buckets = ['portfolio-assets', 'avatars', 'resumes'];
  
  for (const bucketName of buckets) {
    try {
      console.log(`Testing upload to: ${bucketName}`);
      
      // Create a simple test file (1x1 pixel PNG)
      const testFile = new File(['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='], 'test.png', { type: 'image/png' });
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`test-${Date.now()}.png`, testFile);
      
      if (error) {
        console.log(`❌ ${bucketName}: ${error.message}`);
        if (error.message.includes('policy')) {
          console.log(`   → Need to set up policies in Supabase Dashboard`);
        }
      } else {
        console.log(`✅ ${bucketName}: Upload successful`);
        
        // Clean up - delete the test file
        await supabase.storage
          .from(bucketName)
          .remove([`test-${Date.now()}.png`]);
      }
    } catch (err) {
      console.log(`❌ ${bucketName}: ${err.message}`);
    }
  }

  console.log('\n📋 Summary:');
  console.log('- If you see ❌ policy errors, set up policies in Supabase Dashboard');
  console.log('- If you see ✅ for all buckets, uploads should work in admin panel');
}

async function main() {
  console.log('🚀 Upload Permission Test\n');
  
  await testUploadPermissions();
  
  console.log('\n📝 Next Steps:');
  console.log('1. If uploads fail, go to Supabase Dashboard → Storage → Policies');
  console.log('2. Add SELECT, INSERT, UPDATE, DELETE policies for each bucket');
  console.log('3. Or use URL fallback option in admin panel');
}

main().catch(console.error); 