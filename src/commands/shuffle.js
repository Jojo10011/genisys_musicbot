module.exports = {
  // set name, description, and options
  name: 'shuffle',
  description: 'Shuffle die Queue',
  voiceChannel: true,

  async execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if there are enough songs in the queue
    if (queue.node.isEmpty()) return inter.reply({ content: `Nicht genug Songs in der Queue um zu Shufflen ${inter.member} ❌`, ephemeral: true })
    // Shuffle
    await queue.tracks.shuffle()
    // Reply to interaction
    return inter.reply({ content: `🔀 **${queue.getSize()}** song(s)` })
  }
}
