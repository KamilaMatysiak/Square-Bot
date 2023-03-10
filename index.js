const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { EmbedBuilder,AttachmentBuilder } = require('discord.js');

require("dotenv").config()
const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

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

client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  if(message.content.toLowerCase().split(' ').includes("square") || message.content.toLowerCase().split(' ').includes("squarebot")) {
      message.reply(`It's me!`)
    }
  if(message.content.toLowerCase().includes("what") && message.content.toLowerCase().includes("square")) {
      message.channel.send("Type ``/help`` to now what I'm capable of 👀")
    }

  if(message.content.toLowerCase().split(' ').includes("lenny")) {
    message.reply(`( ͡° ͜ʖ ͡°)`)
  }

  if(message.content.toLocaleLowerCase().includes("damage calculator")) {
    message.reply(`Maybe you need <@1068214629286809722>?`);
  }

  if(message.content.toLocaleLowerCase().includes("annoy aedile")) {
    message.reply(`How many squares to beat aedile`);
  }

  if(message.content.toLocaleLowerCase().includes("best bot")) {
    message.reply(`👀`);
  }

  if(message.content.toLocaleLowerCase().includes("divinity")) {
    if(message.channel.id === '1073258493303345212') {
      const image = new AttachmentBuilder('./yes-square.png', { name: 'yes-square.png', description: 'ugabuga'});
      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Hello there!')
      .setDescription('Availability for 6.03 - 12.03')
      .setThumbnail("attachment://yes-square.png")
      .addFields(
        { name: 'Monday', value: '<t:1678118400:t> - <t:1678060800:t>' },
        { name: 'Tuesday', value:  '<t:1678107600:t> - <t:1678060800:t>'},
        { name: 'Wednesday', value: '<t:1678118400:t> - <t:1678060800:t>' },
        { name: 'Thursday', value: '<t:1678132800:t> - <t:1678060800:t>' },
        { name: 'Friday', value: 'Business trip.' },
        { name: 'Saturday', value: 'Meeting friends.' },
        { name: 'Sunday', value: '<t:1678107600:t> - <t:1678060800:t>' },
      )
      .setImage("https://media.tenor.com/KfjkZqTsrdUAAAAM/divinity-original-sin2-divinty.gif")
      .setTimestamp()
      .setFooter({ text: 'See you soon!', iconURL: "attachment://yes-square.png"});
      message.reply({ embeds: [embed], files: [image] });
    }
  }
 });


client.on(Events.InteractionCreate, async interaction => {
  
  if(interaction.isButton()) {
    console.log(interaction.id);
    console.log(interaction.customId);
    if(interaction.customId === 'zomboid') {
      const role = interaction.options.getRole("role");
      if(interaction.member._roles.includes(role.id)) {
        interaction.member.roles.remove(role.id);
        await interaction.reply({content: `**${role.name}** role removed`, ephemeral: true});
      } else {
        interaction.member.roles.add(role.id);
        await interaction.reply({content: `**${role.name}** role added`, ephemeral: true});
      }
    }
  }

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