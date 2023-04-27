const { EmbedBuilder } = require('discord.js')

module.exports = {
  // set name, description, and options
  name: 'queue',
  description: 'Aktuelle Queue anzeigen',
  voiceChannel: true,

  execute ({ client, inter }) {
    // get queue
    const queue = player.nodes.get(inter.guildId)
    // Check if music is playing
    if (!queue) return inter.reply({ content: `Zur Zeit wird keine Musik abgespielt ${inter.member} ❌`, ephemeral: true })
    // Check if queue is empty
    if (queue.isEmpty()) return inter.reply({ content: `Keine Songs in der Queue ${inter.member} ❌`, ephemeral: true })
    // get loop modes
    const methods = ['', '🔁', '🔂']
    // get queue size
    const songs = queue.getSize()
    // get next songs
    const nextSongs = `Insgesamt: **${songs}** Song(s)`
    // get tracks
    const tracks = queue.tracks.map((track, i) => `**${i + 1}** \`${track.title} | ${track.author}\` ${track.requestedBy}`)
    // create embed with queue
    const embed = new EmbedBuilder()
      .setColor(client.config.botColor)
      .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
      .setAuthor({ name: `Queue - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
      .setDescription(`Jetzt Spielt: \`${queue.currentTrack.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
      .setTimestamp()
      .setFooter({ text: client.config.botName, iconURL: inter.member.avatarURL({ dynamic: true }) })
    // reply with embed
    inter.reply({ embeds: [embed] })
  }
}
