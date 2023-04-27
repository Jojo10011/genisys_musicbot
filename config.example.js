module.exports = {
  // Discord Token
  token: '<Token>',
  // Playing Status
  playing: 'deine Musikwünsche 🎵',
  // Bot Name in Embeds
  botName: 'Genisys 📻',
  // Bot Color in Embeds (Hex) (Default: #9600ff (Purple))
  botColor: '#9600ff',
  // Max Volume of the Player
  maxVolume: 100,
  // Default Volume of the Player
  defaultVolume: 75,
  // Settings for the Discord Player
  discordPlayer: {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    }
  }
}
