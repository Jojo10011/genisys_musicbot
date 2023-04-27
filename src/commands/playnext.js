const { ApplicationCommandOptionType } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
  // set name, description, and options
  name: 'playnext',
  description: 'Fügt einen Song als zweites in die Queue',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Der Song, den du abspielen möchtest',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],

  async execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // get song
    const song = inter.options.getString('song')
    // search song
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    })
    // Check if song found
    if (!res || !res.tracks.length) return inter.reply({ content: `Keine Ergebnisse gefunden ${inter.member} ❌`, ephemeral: true })
    // Check if playlist
    if (res.playlist) return inter.reply({ content: `Dieser Befehl unterstützt keine Playlists (Verwende dafür /play) ${inter.member} ❌`, ephemeral: true })
    // Add song to queue
    queue.insertTrack(res.tracks[0], 0)
    // Reply to interaction
    await inter.reply({ content: 'Lade track ⏳' })
  }
}
