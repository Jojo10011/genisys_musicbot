const { QueryType } = require('discord-player')
module.exports = async ({ inter, _ }) => {
  // get selected value
  const selected = inter.values[0]
  // if cancel return
  if (selected === 'cancel') { return }
  // if not cancel search for tracks
  const res = await player.search(selected, {
    requestedBy: inter.member,
    searchEngine: QueryType.AUTO
  })
  // if no results return and reply
  if (!res || !res.tracks.length) return inter.reply({ content: `Keine Ergebnisse gefunden ${inter.member} ❌`, ephemeral: true })
  // if results found play track
  const queue = player.nodes.create(inter.guild, {
    metadata: inter.channel,
    spotifyBridge: client.config.spotifyBridge,
    initialVolume: client.config.defaultvolume,
    leaveOnEnd: client.config.leaveOnEnd
  })

  // if no connection join channel
  try {
    if (!queue.connection) await queue.connect(inter.member.voice.channel)
  } catch {
    await player.node.delete(queue)
    return inter.reply({ content: `Ich kann dem Channel nicht beitreten ${inter.member} ❌`, ephemeral: true })
  }
  // reply to user that track is loading
  await inter.reply({ content: 'Lade Track ⏳' })
  // add track to queue
  res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0])
  // play song
  if (!queue.isPlaying()) await queue.node.play()
}
