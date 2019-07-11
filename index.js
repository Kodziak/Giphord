const Discord = require('discord.js');
const axios = require('axios')
const client = new Discord.Client();
const credentials = require('./credentials');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const ARGS = msg.content.split(" ");
    let firstWord = [];
    let restWords = [];
    for(let i = 0; i < ARGS.length; i++) {
        if(i === 0) {
            firstWord.push(ARGS[0])
        } else {
            restWords.push(ARGS[i])
        }
    }
    firstWord = firstWord.join('');
    restWords = restWords.join(' ');
    let plusWords = restWords.replace(/ /g, "+");

    if (firstWord === "/gif" && restWords.length > 0) {
        let url = "http://api.giphy.com/v1/gifs/translate?s=" + plusWords + "&api_key=" + credentials.credentials.api_key + "&weirdness=10";
        axios.get(url).then(response => {
            msg.channel.send("Gif:", { file: response.data.data.images.fixed_height_downsampled.url });
        }).catch(error => {
            msg.channel.send(error)
        })
    }
});

client.login(credentials.credentials.token);