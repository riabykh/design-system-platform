#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return 'localhost';
}

const ip = getLocalIP();
console.log(`\n🌐 Your Design System Platform is accessible at:`);
console.log(`   Local:  http://localhost:3000`);
console.log(`   Network: http://${ip}:3000`);
console.log(`\n📱 Other devices on your network can access it using the Network URL above.\n`);
