import { Reply } from 'zeromq'

async function runServer() {
  const sock = new Reply();

  await sock.bind('tcp://*:5555');

  for await (const [msg] of sock) {
    console.log('Received ' + ': [' + msg.toString() + ']');
    await sock.send('World');
  }
}

runServer();