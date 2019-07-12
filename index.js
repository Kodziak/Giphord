const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs')
const client = new Discord.Client();
const { token, api_key } = require('./credentials');
const utils = require('./utils');
let commandsList = fs.readFileSync('commands/help.txt', 'utf8')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let prefix = utils.getFirstWord(msg.content);
    let restWords = utils.getStringExceptFirstWord(msg.content);
    restWords = utils.replaceSpaceWithPlus(restWords);

    if (!restWords) {
        msg.reply("You need to put a word!")
    }

    if (prefix === "/gif" && restWords) {
        let url = "http://api.giphy.com/v1/gifs/translate?s=" + restWords + "&api_key=" + api_key + "&weirdness=10";
        axios.get(url).then(response => {
            msg.channel.send("Gif:", { file: response.data.data.images.fixed_height_downsampled.url });
        }).catch(error => {
            msg.channel.send(error)
        })
    } else if (prefix === "/gif-help") {
        msg.channel.send(commandsList);
    }
});

client.login(token);