const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription("Warn user.")
        .addUserOption(option => 
            option
				.setName('target')
				.setDescription('Pick a person')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason of warning.')
                .setRequired(true)),
	async execute(interaction) {
		if(interaction.member._roles.find(r => r === '894912762617135134')) {
			interaction.reply({ content: `Warned user.`, ephemeral: true });
		} else {
			interaction.reply({ content: `You're not qualified to do that. Sorry...`, ephemeral: true });
		}
	},
};