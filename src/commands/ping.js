const ms = require('ms')

module.exports = {
  // set name, description, and options
  name: 'ping',
  description: 'Zeigt den aktuellen Ping an',
  async execute ({ client, inter }) {
    // send reply containing ping
    await inter.reply('Ping?')
    inter.editReply(`Latenz: ${Math.round(client.ws.ping)}ms 🛰️, Letzter heartbeat vor: ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}`)
  }
}
