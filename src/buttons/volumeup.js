const maxVol = client.config.maxVolume
module.exports = async ({ inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // get current volume + 5
  const vol = Math.floor(queue.node.volume + 5)
  // if volume is maxVol reply with error
  if (vol > maxVol) return inter.reply({ content: `Lauter geht nicht ${inter.member} ❌`, ephemeral: true })
  // set volume
  const success = queue.node.setVolume(vol)
  // Reply to interaction
  return inter.reply({ content: success ? `Lautstärke **${vol}**/**${maxVol}**% 🔊` : `Etwas ist schief gelaufen! ${inter.member} ❌`, ephemeral: true })
}
