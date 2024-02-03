const { QueueRepeatMode } = require('discord-player')
module.exports = async ({ inter, queue }) => {
  const methods = ['disabled', 'track', 'queue']

  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // get repeat mode
  const repeatMode = queue.repeatMode
  // set repeat mode to track
  if (repeatMode === 0) {
    queue.setRepeatMode(QueueRepeatMode.TRACK)
    // Reply to interaction
    return inter.reply({ content: `Loop Modus: **Track** 🔁` })
  }
  // set repeat mode to queue
  if (repeatMode === 1) {
    queue.setRepeatMode(QueueRepeatMode.QUEUE)
    // Reply to interaction  
    return inter.reply({ content: `Loop Modus: **Queue** 🔁` })
  }
  // set repeat mode to disabled
  if (repeatMode === 2) {
    queue.setRepeatMode(QueueRepeatMode.OFF)
    // Reply to interaction
    return inter.reply({ content: `Loop Modus: **Off** 🔁` })
  }
}
