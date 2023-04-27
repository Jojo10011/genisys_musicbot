const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

player.events.on('error', (queue, error) => {
  console.log(`Fehler in der Queue ${error.message}`)
})

player.events.on('playerError', (queue, error) => {
  console.log(`Verbindungsfehler ${error.message}`)
})

player.events.on('playerStart', (queue, track) => {
  const timestamp = queue.node.getTimestamp()
  const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration

  const embed = new EmbedBuilder()
    .setAuthor({ name: 'Jetzt läuft 📻', iconURL: track.requestedBy.avatarURL() })
    .addFields({ name: 'Song: ', value: `\`${track.title}\``, inline: true },
      { name: 'Von: ', value: `${track.requestedBy}`, inline: true },
      { name: 'Länge: ', value: `\`${trackDuration}\``, inline: true })
    .setColor('#9600ff')

  const back = new ButtonBuilder()
    .setLabel('⏮')
    .setCustomId(JSON.stringify({ ffb: 'back' }))
    .setStyle('Primary')

  const skip = new ButtonBuilder()
    .setLabel('⏭')
    .setCustomId(JSON.stringify({ ffb: 'skip' }))
    .setStyle('Primary')

  const resumepause = new ButtonBuilder()
    .setLabel('⏯')
    .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
    .setStyle('Success')

  const loop = new ButtonBuilder()
    .setLabel('🔁')
    .setCustomId(JSON.stringify({ ffb: 'loop' }))
    .setStyle('Primary')

  const queuebutton = new ButtonBuilder()
    .setLabel('📋')
    .setCustomId(JSON.stringify({ ffb: 'queue' }))
    .setStyle('Primary')

  const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
  queue.metadata.send({ embeds: [embed], components: [row1] })
})

player.events.on('audioTrackAdd', (queue, track) => {
  queue.metadata.send(`**+** \`Song: ${track.title}\``)
})

player.events.on('disconnect', (queue) => {
  queue.metadata.send('Auf wiedersehen 👋')
})

player.events.on('emptyChannel', (queue) => {
  queue.metadata.send('Niemand mehr da? Auf wiedersehen 👋')
})

player.events.on('emptyQueue', (queue) => {
  queue.metadata.send('Queue abgespielt ⌛')
})

player.events.on('audioTracksAdd', (queue, tracks) => {
  queue.metadata.send('**+** `Playlist`')
})
