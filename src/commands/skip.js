module.exports = {
  // set name, description, and options
  name: 'skip',
  description: 'Überspringt den aktuellen Song',
  voiceChannel: true,

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Skip
    const success = queue.node.skip()
    // Reply to interaction
    return inter.reply({ content: success ? '⏭️' : `Etwas ist schief gelaufen ${inter.member} ❌` })
  }
}
