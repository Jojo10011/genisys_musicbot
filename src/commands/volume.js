const maxVol = client.config.maxVolume
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'volume',
  description: 'Lautstärke',
  voiceChannel: true,
  options: [
    {
      name: 'volume',
      description: 'Passt die Lautstärke an',
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
      maxValue: maxVol
    }
  ],

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // get volume
    const vol = inter.options.getNumber('volume')
    // check if volume is already set
    if (queue.volume === vol) return inter.reply({ content: `Die Lautstärke ist bereits auf diesem Level ${inter.member} ❌`, ephemeral: true })
    // set volume
    const success = queue.node.setVolume(vol)
    // Reply to interaction
    return inter.reply({ content: success ? `Lautstärke **${vol}**/**${maxVol}**% 🔊` : `Etwas ist schief gelaufen! ${inter.member} ❌` })
  }
}
