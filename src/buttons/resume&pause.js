module.exports = async ({ inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // Try to resume music if paused -> returns true or false
  const success = queue.node.resume()
  // Pause music if success is false
  if (!success) queue.node.pause()
  // Reply to interaction
  return inter.reply({ content: `${success ? `${queue.currentTrack.title} fortgesetzt ▶️` : `${queue.currentTrack.title} pausiert ⏸️`}`, ephemeral: true })
}
