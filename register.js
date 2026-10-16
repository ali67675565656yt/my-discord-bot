// register.js
// Usage: node register.js
// Reads TOKEN, CLIENT_ID and optional GUILD_ID from .env and registers the commands.
// If GUILD_ID is present, registers to that guild (instant). Otherwise registers globally (may take up to 1 hour).

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId) {
  console.error('Missing TOKEN or CLIENT_ID in .env');
  process.exit(1);
}

// Define commands here
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  }
];

(async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(token);

    if (guildId) {
      console.log(`Registering ${commands.length} command(s) to guild ${guildId}...`);
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
      console.log('Successfully registered guild commands.');
    } else {
      console.log(`Registering ${commands.length} global command(s)... (may take up to 1 hour)`);
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
      console.log('Successfully registered global commands.');
    }
  } catch (error) {
    console.error('Failed to register commands:', error);
    process.exit(1);
  }
})();
