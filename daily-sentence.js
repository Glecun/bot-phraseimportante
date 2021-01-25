const Discord = require('discord.js')
const fetch = require('node-fetch');
const client = new Discord.Client();

const GENERAL_CHANNEL_KEY = `144889713927520256`;
//const BOT_RYTHM_CHANNEL_KEY = `531196519936688148`;


client.on('ready', async function () {
   const { phrase } = await fetch('http://phraseimportante.fr/getPhrase.php').then(response => response.json());
   client.channels.cache.get(GENERAL_CHANNEL_KEY).send("**Phrase du jour:** " + phrase);
})

//https://dashboard.heroku.com/apps/bot-phraseimportante/settings
client.login(process.env.BOT_TOKEN);

