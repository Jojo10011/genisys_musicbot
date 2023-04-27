const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'jump',
  description: 'Springt zu einem bestimmten Song in der Queue',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Der Name / Die URL des Songs',
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
      name: 'number',
      description: 'Der Platz in der Queue',
      type: ApplicationCommandOptionType.Number,
      required: false
    }
  ],

  async execute ({ inter }) {
    // get track and number
    const track = inter.options.getString('song')
    const number = inter.options.getNumber('number')
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if track or number is provided
    if (!track && !number) inter.reply({ content: `Du musst eine der Optionen verwenden, um einen Song aus der Queue entfernen zu können ${inter.member} ❌`, ephemeral: true })
    // Check if track option is provided
    if (track) {
      for (const song of queue.tracks.data) {
        if (song.title === track || song.url === track) {
          // skip to track
          queue.node.skipTo(song)
          // reply to interaction
          return inter.reply({ content: `Zu ${track} geskipped ✅` })
        }
      }
      // reply to interaction that track was not found
      return inter.reply({ content: `Konnte ${track} nicht finden! ${inter.member} Versuche den vollständigen Namen oder die URL des Songs ❌`, ephemeral: true })
    }
    // Check if number option is provided
    if (number) {
      // get index
      const index = number - 1
      // get trackname
      const trackname = queue.tracks.data[index].title
      // If trackname is not found reply to interaction with error
      if (!trackname) return inter.reply({ content: `Konnte Song nicht finden ${inter.member} ❌`, ephemeral: true })
      // skip to track
      queue.node.skipTo(index)
      // reply to interaction
      return inter.reply({ content: `Springe zu ${trackname}` })
    }
  }
}
