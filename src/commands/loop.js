const { QueueRepeatMode } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, showHelp
  name: 'loop',
  description: 'Loop Modus umschalten',
  voiceChannel: true,
  options: [
    {
      name: 'action',
      description: 'Loop Modus',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'Queue', value: 'enable_loop_queue' },
        { name: 'Disable', value: 'disable_loop' },
        { name: 'Song', value: 'enable_loop_song' }
      ]
    }
  ],
  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check selected loop mode
    switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
      case 'enable_loop_queue': {
        if (queue.repeatMode === 1) return inter.reply({ content: `Du Musst zuerst den Loop Modus ausschalten (/loop Disable) ${inter.member} ❌`, ephemeral: true })
        // set loop mode to queue
        queue.setRepeatMode(QueueRepeatMode.QUEUE)

        return inter.reply({ content: `Loop Modus: **${methods[queue.repeatMode]}** 🔁` })
      }
      case 'disable_loop': {
        // set loop mode to off
        queue.setRepeatMode(QueueRepeatMode.OFF)

        return inter.reply({ content: `Loop Modus: **${methods[queue.repeatMode]}** 🔁` })
      }
      case 'enable_loop_song': {
        if (queue.repeatMode === 2) return inter.reply({ content: `Du Musst zuerst den Loop Modus ausschalten (/loop Disable) ${inter.member} ❌`, ephemeral: true })
        // set loop mode to song
        queue.setRepeatMode(QueueRepeatMode.TRACK)

        return inter.reply({ content: `Loop Modus: **${methods[queue.repeatMode]}** 🔁` })
      }
    }
  }
}
