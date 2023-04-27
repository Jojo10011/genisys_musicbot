const { EmbedBuilder } = require('discord.js')
module.exports = async ({ client, inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // Check if queue is empty
  if (queue.isEmpty()) return inter.reply({ content: `Keine Songs in der Queue ${inter.member} ❌`, ephemeral: true })
  // Get repeat modes
  const methods = ['', '🔁', '🔂']
  // Get queue size
  const songs = queue.getSize()
  // Get next songs
  const nextSongs = `Insgesamt: **${songs}** Song(s)`
  // Get tracks
  const tracks = queue.tracks.map((track, i) => `**${i + 1}** \`${track.title} | ${track.author}\` ${track.requestedBy}`)
  // Create embed with queue
  const embed = new EmbedBuilder()
    .setColor(client.config.botColor)
    .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
    .setAuthor({ name: `Queue - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
    .setDescription(`Jetzt Spielt: \`${queue.currentTrack.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
    .setTimestamp()
    .setFooter({ text: client.config.botName, iconURL: inter.member.avatarURL({ dynamic: true }) })
  // Reply with embed
  inter.reply({ embeds: [embed], ephemeral: true })
}
