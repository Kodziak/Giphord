const Discord = require('discord.js');
const axios = require('axios')
const client = new Discord.Client();
const credentials = require('./credentials');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const ARGS = msg.content.split(" ");
    if (ARGS[0] === "/gif") {
        msg.channel.send("doing request with: " + ARGS[1])
        let url = "http://api.giphy.com/v1/gifs/random?tag=" + ARGS[1] + "&api_key=" + credentials.credentials.api_key;
        axios.get(url).then(response => {
            msg.channel.send("Gif:", { file: response.data.data.images.preview_gif.url });
        }).catch(error => {
            msg.channel.send(error)
        })
    }
});

client.login(credentials.credentials.token);