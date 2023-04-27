const { EmbedBuilder, InteractionType } = require('discord.js')

module.exports = (client, inter) => {
  if (inter.type === InteractionType.ApplicationCommand) {
    const command = client.commands.get(inter.commandName)

    // If the command doesn't exist, exit early and delete the slash command
    // Also give the user a response letting them know the command doesn't exist
    if (!command) {
      client.slash.delete(inter.commandName)
      return inter.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Unbekannter Befehl')], ephemeral: true })
    }

    // Check if user has permission to run the command
    if (command.permissions && !inter.member.permissions.has(command.permissions)) {
      return inter.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Du hast nicht die Berechtigung diesen Befehl auszuführen!')], ephemeral: true })
    }

    // Check if the command was executed while the user was in a voicechannel
    if (command.voiceChannel) {
      // Check if the user is in a voicechannel
      if (!inter.member.voice.channel) {
        return inter.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Du bist in keinem Voicechannel')], ephemeral: true })
      }
      // Check if the bot is in a different voicechannel than the user
      if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) {
        return inter.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Du bist nicht in meinem Voicechannel')], ephemeral: true })
      }
    }
    // Execute the command
    command.execute({ inter, client })
  }

  // Check if the interaction is a button
  // and execute the button if it exists
  if (inter.type === InteractionType.MessageComponent) {
    const customId = JSON.parse(inter.customId)
    const buttonFile = customId.ffb
    const queue = player.nodes.get(inter.guildId)
    if (buttonFile) {
      delete require.cache[require.resolve(`../src/buttons/${buttonFile}.js`)]
      const button = require(`../src/buttons/${buttonFile}.js`)
      if (button) return button({ client, inter, customId, queue })
    }
  }
}
