const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'bassboost',
  description: 'Bassboost umschalten',
  voiceChannel: true,
  options: [
    {
      name: 'action',
      description: 'Bassboost',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'on', value: 'enable_bassboost' },
        { name: 'off', value: 'disable_bassboost' }
      ]
    }
  ],
  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // get options
    switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
      case 'enable_bassboost': {
        // set bassboost via equalizer
        queue.filters.equalizer.setEQ(queue.filters.equalizerPresets.FullBass)

        return inter.reply({ content: 'Bassboost: **an** ' })
      }
      case 'disable_bassboost': {
        // disable bassboost
        queue.filters.equalizer.setEQ(queue.filters.equalizerPresets.Flat)

        return inter.reply({ content: 'Bassboost: **aus** ' })
      }
    }
  }
}
