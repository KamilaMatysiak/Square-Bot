const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send-love')
		.setDescription("Show some lovin'.")
        .addUserOption(option => 
            option
				.setName('person')
				.setDescription('Pick a person')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Tell the person why you love them.')),
	async execute(interaction) {
		const user = interaction.options.getUser('person');
		const reason = interaction.options.getString('message');
		await interaction.reply(reason ? `Love you ${user} ${reason}!` : `Love you ${user}!`);
	},
};