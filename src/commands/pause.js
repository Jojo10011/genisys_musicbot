module.exports = {
  // set name, description, and options
  name: 'pause',
  description: 'Pausiert die Wiedergabe',
  voiceChannel: true,

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if is already paused
    if (queue.node.isPaused()) return inter.reply({ content: `Die Wiedergabe ist bereits pausiert, ${inter.member} ❌`, ephemeral: true })
    // Pause
    const success = queue.node.pause()
    // Reply to interaction
    return inter.reply({ content: success ? `${queue.currentTrack.title} pausiert ⏸️` : `Etwas ist schief gelaufen ${inter.member} ❌` })
  }
}
