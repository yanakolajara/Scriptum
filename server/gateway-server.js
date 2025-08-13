// ===== MAIN SERVER FOR THE API GATEWAY =====
// This file starts the API Gateway server

import app from './gateway-app.js';

// Gateway port (different from microservices)
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`
🚀 ===== API GATEWAY STARTED =====
🌐 Port: ${PORT}
📍 URL: http://localhost:${PORT}
🔗 Health Check: http://localhost:${PORT}/health

📋 Configured services:
   👥 Users Service: ${process.env.USER_SERVICE_URL || 'http://localhost:4010'}
   📝 Entries Service: ${
     process.env.ENTRY_SERVICE_URL || 'http://localhost:4020'
   }
   🔍 User Context Service: ${
     process.env.USER_CONTEXT_SERVICE_URL || 'http://localhost:4030'
   }
   💬 Chat Service: ${process.env.CHAT_SERVICE_URL || 'http://localhost:4040'}
   📧 Email Service: ${process.env.EMAIL_SERVICE_URL || 'http://localhost:4050'}
   
🛡️  JWT Secret: ${
    process.env.JWT_SECRET ? '✅ Configured' : '❌ Not configured'
  }

ℹ️  Mode: ${process.env.NODE_ENV || 'development'}
=====================================
  `);
});
