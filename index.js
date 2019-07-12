const Discord = require('discord.js');
const axios = require('axios')
const client = new Discord.Client();
const { token, api_key } = require('./credentials');
const utils = require('./utils');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let firstWord = utils.getFirstWord(msg.content);
    let restWords = utils.getStringExceptFirstWord(msg.content);
    restWords = utils.replaceSpaceWithPlus(restWords);

    if (!restWords) {
        msg.reply("You need to put a word!")
    }

    if (firstWord === "/gif" && restWords) {
        let url = "http://api.giphy.com/v1/gifs/translate?s=" + restWords + "&api_key=" + api_key + "&weirdness=10";
        axios.get(url).then(response => {
            msg.channel.send("Gif:", { file: response.data.data.images.fixed_height_downsampled.url });
        }).catch(error => {
            msg.channel.send(error)
        })
    }
});

client.login(token);