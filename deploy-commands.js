const { REST, Routes } = require('discord.js');
require("dotenv").config()
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands/basics').filter(file => file.endsWith('.js'));
console.log(commandFiles);

for (const file of commandFiles) {
    console.log(file);
	const command = require(`./commands/basics/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const globalData = await rest.put(
			Routes.applicationCommands(process.env.client_id),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${globalData.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();