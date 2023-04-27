const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')
module.exports = {
  // set name, description, and options
  name: 'play',
  description: 'Spielt einen Song ab',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Song oder Playlist',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],

  async execute ({ inter }) {
    // get song
    const song = inter.options.getString('song')
    // search song
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    })
    // check if song is found
    if (!res || !res.tracks.length) return inter.reply({ content: `Keine Ergebnisse gefunden ${inter.member} ❌`, ephemeral: true })
    // create queue
    const queue = player.nodes.create(inter.guild, {
      metadata: inter.channel,
      spotifyBridge: client.config.spotifyBridge,
      initialVolume: client.config.defaultvolume,
      leaveOnEnd: client.config.leaveOnEnd
    })

    try {
      // connect to voice channel
      if (!queue.connection) await queue.connect(inter.member.voice.channel)
    } catch {
      await player.node.delete(queue)
      return inter.reply({ content: `Ich kann dem Channel nicht beitreten ${inter.member} ❌`, ephemeral: true })
    }

    await inter.reply({ content: `Lade ${res.playlist ? 'Playlist' : 'Track'} ⏳` })
    // add song to queue and play
    res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0])
    if (!queue.isPlaying()) await queue.node.play()
  }
}
