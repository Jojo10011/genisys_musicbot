const { readdirSync } = require('fs')
const { Player } = require('discord-player')
const { Client, GatewayIntentBits, Collection } = require('discord.js')

// Create a new client instance
global.client = new Client({
  // Set intents to receive voice state updates and messages from guilds
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ],
  // Disable mentions by default
  disableMentions: 'everyone'
})

// Load config
client.config = require('./config')

// Create a new player instance
global.player = new Player(client, client.config.discordPlayer)

// Load all default extractors
player.extractors.loadDefault()

// Create a new collection for commands
client.commands = new Collection()
array = []

// Load events from events folder
const events = readdirSync('./src/events/').filter(file => file.endsWith('.js'))

for (const file of events) {
  const event = require(`./src/events/${file}`)
  console.log(`Loaded ${file.split('.')[0]}`)
  client.on(file.split('.')[0], event.bind(null, client))
  delete require.cache[require.resolve(`./src/events/${file}`)]
};

// Load commands from commands folder
const commands = readdirSync('./src/commands/').filter(files => files.endsWith('.js'))

// Register commands in an array
for (const file of commands) {
  const command = require(`./src/commands/${file}`)
  array.push(command)
  console.log(`Loaded ${command.name.toLowerCase()}`)
  client.commands.set(command.name.toLowerCase(), command)
  delete require.cache[require.resolve(`./src/commands/${file}`)]
};

// Register Slash Commands
console.log('Registering Slash Commands...')
client.on('ready', (client) => {
  client.application.commands.set(array)
})

// Register PlayerEvents
require('./src/playerEvents')

// Login to Discord with your client's token
console.log('Logging in...')
client.login(client.config.token)
