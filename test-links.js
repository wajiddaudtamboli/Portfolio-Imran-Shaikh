import https from 'https';
import http from 'http';

const links = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/918698839883',
    expectedStatus: 200
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/imran-shaikh-06785a3a00',
    expectedStatus: 200
  },
  {
    name: 'Resume',
    url: 'https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view?usp=sharing',
    expectedStatus: 200
  }
];

function testLink(link) {
  return new Promise((resolve) => {
    const url = new URL(link.url);
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`✅ ${link.name}: ${res.statusCode} ${res.statusMessage}`);
      resolve({
        name: link.name,
        status: res.statusCode,
        success: res.statusCode === link.expectedStatus
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${link.name}: Error - ${err.message}`);
      resolve({
        name: link.name,
        status: 'ERROR',
        success: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ ${link.name}: Timeout`);
      req.destroy();
      resolve({
        name: link.name,
        status: 'TIMEOUT',
        success: false
      });
    });
  });
}

async function testAllLinks() {
  console.log('🔗 Testing Contact Links...\n');
  
  const results = await Promise.all(links.map(testLink));
  
  console.log('\n📊 Results Summary:');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Links:');
    failed.forEach(link => {
      console.log(`  - ${link.name}: ${link.status}${link.error ? ` (${link.error})` : ''}`);
    });
  }
  
  return results;
}

testAllLinks().catch(console.error); 