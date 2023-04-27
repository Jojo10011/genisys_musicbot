const { EmbedBuilder } = require('discord.js')

module.exports = {
  // set name, description, showHelp
  name: 'help',
  description: 'Zeigt alle Befehle des Bots an',
  showHelp: false,

  execute ({ client, inter }) {
    // get commands
    const commands = client.commands.filter(x => x.showHelp !== false)
    // create embed with commands
    const embed = new EmbedBuilder()
      .setColor(client.config.botColor)
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
      .setDescription('Dein musikalisches Zuhause')
      .addFields([{ name: `Befehle: ${commands.size}`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }])
      .setTimestamp()
      .setFooter({ text: client.config.botName, iconURL: inter.member.avatarURL({ dynamic: true }) })
    // send reply
    inter.reply({ embeds: [embed] })
  }
}
