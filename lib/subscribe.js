const awsIot = require('aws-iot-device-sdk');
const moment = require('moment'); // for DateTime formatting
const username = 'badgerine' // TODO: replace this

const device = awsIot.device({
   keyPath: 'certificates/gizmo.private.key',
  certPath: 'certificates/gizmo.cert.pem',
    caPath: 'certificates/root-CA.crt',
  clientId: `${username}-subscribe`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', () => {
  console.log('Subscriber client connected to AWS IoT cloud.\n');

  device.subscribe('makers/challenge/tokens');
  // TODO subscribe to more topics here
  // device.subscribe('makers/challenge/clues');
  device.subscribe('makers/challenge/answers/accepted');
  device.subscribe('makers/challenge/answers/errors');
});

device.on('message', (topic, payload) => {

  let message = JSON.parse(payload.toString());

  switch (topic) {
    case 'makers/challenge/tokens':
      let tokenExpiry = moment(message.expiresAt).format('MMMM Do YYYY, h:mm:ss a')
      console.log(`New answer token received: "${message.answerToken}", expires ${tokenExpiry}\n`)
    break;

    case 'makers/challenge/clues':
      console.log(`clue index: "${message.clueIndex}"\n`)
      console.log(`clue: "${message.clue}"\n`)
      console.log(`clue count: "${message.totalClues}"\n`)
    break;

    case 'makers/challenge/answers/accepted':
      console.log(`answer name: "${message.answererName}"\n`)
      console.log(`result: "${message.result}"\n`)
      console.log(message)
    break;
    case 'makers/challenge/answers/errors':
      console.log(`answer name: "${message.answererName}"\n`)
      console.log(`error: "${message.result}"\n`)
      console.log(message)
    break;

    default:
      console.log(`Message received on topic "${topic}"\n`)
  }
});

