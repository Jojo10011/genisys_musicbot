const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
  // set name, description, and options
  name: 'search',
  description: 'Nach einem Song suchen',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Der Song nach dem du Suchen möchtest',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],

  async execute ({ client, inter }) {
    // get song
    const song = inter.options.getString('song')
    // search songs
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    })
    // check if songs are found
    if (!res || !res.tracks.length) return inter.reply({ content: `Keine Ergebnisse gefunden ${inter.member} ❌`, ephemeral: true })
    // get max 5 tracks
    const maxTracks = res.tracks.slice(0, 5)
    // create embed with max 5 tracks and send it
    const embed = new EmbedBuilder()
      .setColor(client.config.botColor)
      .setAuthor({ name: `Ergebnisse für: ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
      .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. \`${track.title} | ${track.author}\``).join('\n')}`)
      .setTimestamp()
      .setFooter({ text: client.config.botName, iconURL: inter.member.avatarURL({ dynamic: true }) })

    // create action row with select menu and send it
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(JSON.stringify({ ffb: 'search' }))
          .setPlaceholder('Auswählen')
          .addOptions(
            {
              label: `${maxTracks[0].title}`,
              description: `${maxTracks[0].author}`,
              value: `${maxTracks[0].url}`
            },
            {
              label: `${maxTracks[1].title}`,
              description: `${maxTracks[1].author}`,
              value: `${maxTracks[1].url}`
            },
            {
              label: `${maxTracks[2].title}`,
              description: `${maxTracks[2].author}`,
              value: `${maxTracks[2].url}`
            },
            {
              label: `${maxTracks[3].title}`,
              description: `${maxTracks[3].author}`,
              value: `${maxTracks[3].url}`
            },
            {
              label: `${maxTracks[4].title}`,
              description: `${maxTracks[4].author}`,
              value: `${maxTracks[4].url}`
            }
          )
      )
    // reply with embed and action row
    inter.reply({ embeds: [embed], components: [row], ephemeral: true })
  }
}
