// index.js
// Bot entry point. Starts the client and handles the /ping command.

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN;
if (!token) {
  console.error('Missing TOKEN in .env');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  try {
    if (commandName === 'ping') {
      await interaction.reply('Pong!');
    } else {
      await interaction.reply({ content: 'Unknown command', ephemeral: true });
    }
  } catch (err) {
    console.error('Error handling interaction:', err);
    if (!interaction.replied) {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(token);
