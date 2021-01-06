const Discord = require('discord.js')
const fetch = require('node-fetch');
const client = new Discord.Client()

const GENERAL_CHANNEL_KEY = `144889713927520256`;
const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

client.on('ready', function () {
  console.log("Bot ON !")
})

client.on('message', async msg => {
  if (msg.content === '!phrase') {
    const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
    msg.channel.send(phrase);
  }
  if (msg.content === '!loremIpsum') {
    let loremIpsum = await fetch('http://phraseimportante.fr/getLoremIpsum.php').then(response => response.json());
    loremIpsum
       .replace(/<br\/>/g, '\n')
       .split('\n')
       .forEach((paragraph) => msg.channel.send(paragraph))
  }
  if (msg.content === '!phrase-help') {
    msg.channel.send(
       "!phrase : Poster une phrase aléatoire\n"+
       "!loremIpsum: Poster un lorem ipsum aléatoire"
    );
  }
});

client.on('ready',  () => {
  setTimeout(function(){
    setInterval(function(){sendSentenceOfTheDay();}, DAY_IN_MILLISECONDS)
  }, leftToEight())
})

function leftToEight(){
  var d = new Date();
  return (-d + d.setHours(8,0,0,0));
}
async function sendSentenceOfTheDay() {
  const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
  client.channels.cache.get(GENERAL_CHANNEL_KEY).send("**Phrase du jour:** " + phrase);
}

client.login(process.env.BOT_TOKEN);

