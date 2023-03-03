const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder} = require('discord.js');

function formatDate(timestamp) {
	const date = new Date(timestamp);
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;
	const dateFormat = `${day}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	return dateFormat;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription("I will tell you when you've joinded."),
	async execute(interaction) {
		

		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`Hi ${interaction.user.username}`)
			.setThumbnail(interaction.user.avatarURL())
			.addFields(
				{
					name: "Joined Discord:",
					value: formatDate(interaction.user.createdAt),
					inline: false
				},
				{
					name: "Joined Server:",
					value: formatDate(interaction.member.joinedAt),
					inline: false
				})
				
		await interaction.reply('\u200b');
		interaction.channel.send({ embeds: [exampleEmbed]});
	},
};