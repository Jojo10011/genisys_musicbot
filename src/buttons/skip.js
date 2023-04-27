module.exports = async ({ inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // try to skip track -> returns true or false
  const success = queue.node.skip()
  // Reply to interaction
  return inter.reply({ content: success ? '⏭️' : `Etwas ist schief gelaufen ${inter.member} ❌`, ephemeral: true })
}
