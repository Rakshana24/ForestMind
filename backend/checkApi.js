const http = require('http');

http.get('http://localhost:5000/alerts', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const alerts = JSON.parse(data);
      console.log(`API returned ${alerts.length} alerts.`);
      if (alerts.length > 0) {
          console.log("Sample Alert ID:", alerts[0]._id);
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
      console.log("Raw Data:", data);
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
