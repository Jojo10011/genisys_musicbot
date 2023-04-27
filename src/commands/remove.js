const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, options
  name: 'remove',
  description: 'Song aus der Queue entfernen',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Der Name / Die URL des Songs, der entfernt werden soll',
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
    const number = inter.options.getNumber('number')
    const track = inter.options.getString('song')
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing and if track or number is provided
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    if (!track && !number) inter.reply({ content: `Du musst eine der Optionen verwenden, um einen Song aus der Queue entfernen zu können ${inter.member} ❌`, ephemeral: true })

    // if track option is provided
    if (track) {
      for (const song of queue.tracks.data) {
        if (song.title === track || song.url === track) {
          queue.removeTrack(song)
          return inter.reply({ content: `${track} entfernt 🗑️` })
        }
      }

      return inter.reply({ content: `Konnte ${track} nicht finden! ${inter.member} Versuche den vollständigen Namen oder die URL des Songs ❌`, ephemeral: true })
    }
    // if number option is provided
    if (number) {
      const index = number - 1
      if (number <= queue.getSize()) {
        const trackname = queue.tracks.data[index].title
        queue.removeTrack(index)
        return inter.reply({ content: `${trackname} entfernt 🗑️` })
      } else { return inter.reply({ content: `Konnte Song nicht finden ${inter.member} ❌`, ephemeral: true }) }
    }
  }
}
