const { EmbedBuilder } = require('discord.js')
module.exports = async ({ client, inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // Get current track
  const track = queue.currentTrack
  // Get repeat modes
  const methods = ['disabled', 'track', 'queue']
  // Get timestamp
  const timestamp = queue.node.getTimestamp()
  // Get track duration
  const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration
  // Get progress bar
  const progress = queue.node.createProgressBar()
  // Create embed with track information
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
    // Reply with embed
  inter.reply({ embeds: [embed], ephemeral: true })
}
