module.exports = {
  // set name, description, and options
  name: 'clear',
  description: 'Löscht die aktuelle Queue!',
  voiceChannel: true,

  async execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if queue is empty
    if (queue.isEmpty()) return inter.reply({ content: `Die Queue ist bereits leer ${inter.member} ❌`, ephemeral: true })
    // Clear queue
    await queue.clear()
    // Reply to interaction
    inter.reply('Queue geleert 🗑️')
  }
}
