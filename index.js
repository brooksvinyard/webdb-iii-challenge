const server = require('./server.js');


const port = 4444;
server.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});
