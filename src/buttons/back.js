module.exports = async ({ inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // Check if queue has previous track
  if (!queue.history.previousTrack) return inter.reply({ content: `Es existiert kein Song vor Diesem ${inter.member} ❌`, ephemeral: true })
  // Go back to previous track
  await queue.history.back()
  // Reply to interaction
  inter.reply({ content: '⏮️', ephemeral: true })
}
