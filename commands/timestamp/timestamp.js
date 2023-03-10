const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timestamp')
        .setDescription("Send a timestamp.")
        .addStringOption(option =>
            option
                .setName("date")
                .setDescription("Date in yyyy/mm/dd format! (default: today)"))
        .addStringOption(option =>
            option
                .setName("time")
                .setDescription("Time in hh:mm format! (default: now)"))
        .addStringOption(option =>
            option
                .setName("format")
                .setDescription("Choose format (default: long date with short time)")
                .addChoices(
                    { name: 'short date', value: 'd'},
                    { name: 'short time', value: 't'},
                    { name: 'long date', value: 'D'},
                    { name: 'long time', value: 'T'},
                    { name: 'long date with time', value: 'f'},
                    { name: 'relative', value: 'R'},
                ))
        .addBooleanOption(option =>
            option
                .setName('private')
                .setDescription('I will send timestamp only to you')),
    async execute(interaction) {
        const now = new Date();
        const date = interaction.options.getString('date') ?? `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`;
        const time = interaction.options.getString('time') ?? `${now.getHours()}:${now.getMinutes()}`;
        const format = interaction.options.getString('format') ?? 'f';
        const newDate = new Date(`${date} ${time}`);
        const timestamp = parseInt(newDate / 1000);
        const private = interaction.options.getBoolean('private');
        if(private) {
            await interaction.reply({content: `<t:${timestamp}:${format}> :  \`<t:${timestamp}:${format}>\``, ephemeral: true});
        } else {
            await interaction.reply(`<t:${timestamp}:${format}>`);
        }
    }
}