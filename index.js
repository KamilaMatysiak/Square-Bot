const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
require("dotenv").config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
  
//get commands form files
const commandsPath = path.join(__dirname, 'commands/basics');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath)
  if('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] Command ${filePath} doesnt have 'data' or 'execute' property.`)
  }
}

client.once(Events.ClientReady, c => {
  console.log(`Ready! ${c.user.tag}`);  
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if(!command) {
    console.log(`Couldn't find command matching ${interaction.commandName}`);
    return;
  }

  if(interaction.commandName == "reset-pz") {
    client.channels.cache.get('1074458483908415538').send('@here - Server restart request!');
  }

  if(interaction.commandName == "warn" && interaction.member._roles.find(r => r === '894912762617135134')) {
    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    client.channels.cache.get('1079886058466054254').send(`${user} got warned, because of ${reason}`)
  }

  try {
    await command.execute(interaction);
  } catch(error) {
    console.log(error);
    await interaction.reply({content: 'Something went wrong!', ephemeral: true});
  }
});

client.login(process.env.TOKEN)