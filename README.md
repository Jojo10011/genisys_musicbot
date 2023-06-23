# Genisys Musicbot

## Description

Genisys MusicBot is a simple and fun bot that can play music from YouTube on your Discord server.
It uses Discord.js, Discord-player, ytdl and ffmpeg to stream audio and handle commands.
You can search for songs by name, URL or playlist, control the playback with basic commands like play, pause, skip, queue and volume, and enjoy some cool features like search and bassboost.

This project was created as a hobby and may or may not be maintained in the future. Feel free to fork it, modify it or contribute to it if you find it useful or interesting.

Currently the only supported language for the bot is German

## Installation

To run this bot, you need to have Node.js and npm installed on your system. You also need to create a Discord application and a bot account on the Discord developer portal and get your bot token.

Clone this repository and install the dependencies with:

```bash
$ git clone https://github.com/Jojo10011/genisys_musicbot.git
$ cd genisys_musicbot
$ npm i
```
Next, rename the config.example.js file to config.js and fill in your bot token and other options.
```js
module.exports = {
    // Discord Bot-token
    token: '<Token>',
    // Playing activity of the bot
    playing: 'deine Musikwünsche 🎵',
    // Bot Name in Embeds
    botName: 'Genisys 📻',
    // Bot Color in Embeds (Hex) (Default: #9600ff (Purple))
    botColor: '#9600ff',
    // Max Volume of the Player
    maxVolume: 100,
    // Default Volume of the Player
    defaultVolume: 75,
    // Settings for the Discord-Player
    discordPlayer: {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        }
    }
};
```

## Usage

Start the bot with:

```bash
$ npm run start
```
Invite the bot to a server and run `/help` to get more info on how to use the bot.

## License

This repository is licensed under an MIT License

---