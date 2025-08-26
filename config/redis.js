const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: 'K2PNlSrlLlbl4mLjKGvFp8GnxQscb6Et',
    socket: {
        host: 'redis-18815.c91.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 18815
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection failed:', err);
    }
})();

module.exports = client;
