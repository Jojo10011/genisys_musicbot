module.exports = {
  // set name, description, and options
  name: 'resume',
  description: 'Wiedergabe fortsetzen',
  voiceChannel: true,

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if is already playing
    if (!queue.node.isPaused()) return inter.reply({ content: `Wiedergabe läuft bereits, ${inter.member} ❌`, ephemeral: true })
    // Resume
    const success = queue.node.resume()
    // Reply to interaction
    return inter.reply({ content: success ? `${queue.currentTrack.title} fortgesetzt ▶️` : `Etwas ist schief gelaufen ${inter.member} ❌` })
  }
}
