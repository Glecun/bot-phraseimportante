const Discord = require('discord.js')
const fetch = require('node-fetch');
const client = new Discord.Client()

client.on('ready', function () {
  console.log("Bot ON !")
})

client.on('message', async msg => {
  if (msg.content === '!phrase') {
    const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
    msg.channel.send(phrase);
  }
  if (msg.content.startsWith('!addPhrase')) {
    var phrase = msg.content.split('!addPhrase ')[1];
    const response = await fetch('http://phraseimportante.fr/addPhrase.php?phrase='+encodeURIComponent(phrase)).then(response => response);
    response.text().then(function (responseText) {
      msg.channel.send(responseText);
    });

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
       "!addPhrase VOTRE-PHRASE : Ajouter une phrase\n"+
       "!loremIpsum: Poster un lorem ipsum aléatoire"
    );
  }
});

//https://dashboard.heroku.com/apps/bot-phraseimportante/settings
client.login(process.env.BOT_TOKEN);
