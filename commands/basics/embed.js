const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder,AttachmentBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription("Create embed, fast.")
        .addStringOption(option => 
            option
                .setName("title")
                .setDescription("Embed title")
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName("description")
                .setDescription("Embed description")
                .setRequired(true)),
    async execute(interaction) {

        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(interaction.options.getString("title"))
            .setDescription(`${interaction.options.getString("description")}`)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL()})

        await interaction.deferReply()
        await interaction.deleteReply()
        interaction.channel.send({ embeds: [Embed] });
    }
}