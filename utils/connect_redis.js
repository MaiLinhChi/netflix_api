const redis = require("redis");

let redisPort = 6379; // Replace with your redis port
let redisHost = "127.0.0.1"; // Replace with your redis host
const client = redis.createClient({
  socket: {
    port: redisPort,
    host: redisHost,
  },
});

(async () => {
  // Connect to redis server
  await client.connect();
})();

client.on("connect", () => {
  console.log("Connected to redis");
});

client.on("ready", () => {
  console.log("Redis to ready");
});

// Log any error that may occur to the console
client.on("error", (err) => {
  console.log(`Error:${err}`);
});

module.exports = client;
