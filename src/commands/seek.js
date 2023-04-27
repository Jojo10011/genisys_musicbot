const ms = require('ms')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'seek',
  description: 'An eine bestimmte Stelle im Song springen',
  voiceChannel: true,
  options: [
    {
      name: 'time',
      description: 'Zeitpunkt zu dem du springen willst',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  async execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.reply} ❌`, ephemeral: true })
    // convert time to ms
    const timeInMs = ms(inter.options.getString('time'))
    // check if time is valid
    if (timeInMs >= queue.currentTrack.durationMS) return inter.reply({ content: `Die zeit liegt außerhalb des aktuellen Songs ${inter.member} ❌\n*Versuche eine korrekte Zeit einzugeben: **Zahl + Einheit (10s, 1m)**...*`, ephemeral: true })
    // seek to time and reply
    await queue.node.seek(timeInMs)
    inter.reply({ content: `Spule vor: **${ms(timeInMs, { long: true })}** ⏩` })
  }
}
