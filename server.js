const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const distPath = 'dist';

const notifier = new FastBootWatchNotifier({
  debounceDelay: 250,
  distPath,
  saneOptions: {
    poll: true
  }
});

let server = new FastBootAppServer({
  distPath,
  notifier,
  gzip: true, // Optional - Enables gzip compression.
});

server.start();
