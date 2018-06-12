const awsIot = require('aws-iot-device-sdk');
const username = 'badgerine' // TODO: replace this

const device = awsIot.device({
  keyPath: 'certificates/gizmo.private.key',
  certPath: 'certificates/gizmo.cert.pem',
    caPath: 'certificates/root-CA.crt',
  clientId: `${username}-subscribe`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', () => {
  console.log('Publisher client connected to AWS IoT cloud.\n');

  device.publish('makers/challenge/answers', JSON.stringify({
    "name": "Sbu Matsini",
    "answerToken": "nYjvDEUPK6QHJSNBw8rxpCwG",
    "answer": "white rabbit"
  }));
});
