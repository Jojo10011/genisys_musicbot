module.exports = async (client) => {
  // Send a message to the console once the bot has started up.
  console.log(`${client.user.username} Ready! \nOnline on ${client.guilds.cache.size} servers for ${client.users.cache.size} users`)
  // Set the client user's activity
  client.user.setActivity(client.config.playing)
}
