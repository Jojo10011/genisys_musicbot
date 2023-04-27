const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
  // Check if music is playing
  if (!queue || !queue.isPlaying()) return inter.reply({ content: 'Zur Zeit wird keine Musik abgespielt ❌', ephemeral: true })
  // send embed to user with current track via DM
  inter.member.send({
    // create embed
    embeds: [
      new EmbedBuilder()
        .setColor(client.config.botColor)
        .setTitle(`${queue.currentTrack.title}`)
        .setURL(queue.currentTrack.url)
        .addFields(
          { name: '⌛ Länge:', value: `\`${queue.currentTrack.duration}\``, inline: true },
          { name: 'Von:', value: `\`${queue.currentTrack.author}\``, inline: true },
          { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
          { name: 'URL:', value: `\`${queue.currentTrack.url}\`` }
        )
        .setThumbnail(queue.currentTrack.thumbnail)
        .setFooter({ text: `Von ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
    ]
    // send DM
  }).then(() => {
    return inter.reply({ content: 'Kuck mal in deine DM\'s ✉️', ephemeral: true })
    // if error
  }).catch(error => {
    console.error(error)
    return inter.reply({ content: 'Ich kann dir keine Privatnachricht senden ❌', ephemeral: true })
  })
}
