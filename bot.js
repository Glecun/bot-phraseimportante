const Discord = require('discord.js')
const fetch = require('node-fetch');
const client = new Discord.Client()

client.on('ready', function () {
  console.log("Je suis connecté !")
})

client.on('message', async msg => {
  if (msg.content === '!phrase') {
    const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
    msg.channel.send(phrase);
  }
});

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

client.on('ready',  () => {
  setTimeout(function(){
    sendMessage();
    setInterval(function(){sendMessage();}, DAY_IN_MILLISECONDS)
  }, leftToEight())
})

function leftToEight(){
  var d = new Date();
  return (-d + d.setHours(8,0,0,0));
}
async function sendMessage() {
  const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
  client.channels.cache.get(`531196519936688148`).send("**Phrase du jour:** " + phrase);
}

client.login(process.env.BOT_TOKEN);

