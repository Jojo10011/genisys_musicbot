module.exports = {
  // set name, description, and options
  name: 'back',
  description: 'Zurück zum vorherigen Song',
  voiceChannel: true,

  async execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if queue has previous track
    if (!queue.history.previousTrack) return inter.reply({ content: `Es existiert kein Song vor Diesem ${inter.member} ❌`, ephemeral: true })
    // Go back to previous track
    await queue.history.back()
    // Reply to interaction
    inter.reply({ content: '⏮️' })
  }
}
