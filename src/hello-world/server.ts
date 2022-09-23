import { Reply } from 'zeromq'

async function runServer() {
  const sock = new Reply();

  await sock.bind('tcp://*:5555');

  for await (const [msg] of sock) {
    switch (msg.toString()) {
      case 'QUIT': {
        console.log('Exiting server');
        sock.close()
        return;
      }
      default: {
        console.log('Received ' + ': [' + msg.toString() + ']');
        await sock.send('World');
      }
    }
  }
}

runServer();