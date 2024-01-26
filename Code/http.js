const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('http')
    .setDescription('Fetch HTTP dog image based on error code')
    .addIntegerOption(option =>
      option.setName('error_code')
        .setDescription('The HTTP error code')
        .setRequired(true)
    ),
  async execute(interaction) {
    const errorCode = interaction.options.getInteger('error_code');

    if (!errorCode || errorCode < 100 || errorCode >= 600) {
      return await interaction.reply('Invalid HTTP error code. Please provide a valid code between 100 and 599.');
    }

    const imageUrl = `https://httpstatusdogs.com/img/${errorCode}.jpg`;

    const embed = new MessageEmbed()
      .setColor(0x0099ff)
      .setTitle(`HTTP：${errorCode}`)
      .setImage(imageUrl);

    await interaction.reply({ embeds: [embed] });
  },
};
