const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'nowplaying',
  description: 'Zeigt Details zum aktuellen Song',
  voiceChannel: true,

  execute ({ inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // get current track
    const track = queue.currentTrack
    // get loop modes
    const methods = ['disabled', 'track', 'queue']
    // get timestamp
    const timestamp = queue.node.getTimestamp()
    // get track duration
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration
    // get progress bar
    const progress = queue.node.createProgressBar()
    // create embed with track info
    const embed = new EmbedBuilder()
      .setAuthor({ name: `📻 ${track.title}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
      .setThumbnail(track.thumbnail)
      .addFields({ name: 'Lautstärke:', value: `\`${queue.node.volume}%\``, inline: true },
        { name: 'Länge:', value: `\`${trackDuration}\``, inline: true },
        { name: 'Loop:', value: `\`${methods[queue.repeatMode]}\``, inline: true },
        { name: 'Von:', value: `${track.requestedBy}`, inline: true },
        { name: 'Fortschritt:', value: `${progress}`, inline: false })
      .setFooter({ text: client.config.botName, iconURL: inter.member.avatarURL({ dynamic: true }) })
      .setColor(client.config.botColor)
      .setTimestamp()
    // create buttons
    const saveButton = new ButtonBuilder()
      .setLabel('💾')
      .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
      .setStyle('Primary')

    const volumeup = new ButtonBuilder()
      .setLabel('🔊')
      .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
      .setStyle('Primary')

    const volumedown = new ButtonBuilder()
      .setLabel('🔈')
      .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
      .setStyle('Primary')

    const loop = new ButtonBuilder()
      .setLabel('🔁')
      .setCustomId(JSON.stringify({ ffb: 'loop' }))
      .setStyle('Primary')

    const resumepause = new ButtonBuilder()
      .setLabel('⏯')
      .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
      .setStyle('Success')
    // create row
    const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup)
    // send reply
    inter.reply({ embeds: [embed], components: [row] })
  }
}
