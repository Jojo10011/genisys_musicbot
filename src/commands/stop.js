module.exports = {
  // set name, description, and options
  name: 'stop',
  description: 'Stoppt die Wiedergabe',
  voiceChannel: true,

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Stop the player and delete the queue
    queue.delete()
    // Reply to interaction
    inter.reply({ content: 'Gestoppt 🛑' })
  }
}
