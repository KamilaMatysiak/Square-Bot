const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription("I will tell you when you've joinded."),
	async execute(interaction) {
		await interaction.reply(`Hi ${interaction.user.username}, you're here since ${interaction.member.joinedAt}.`);
	},
};