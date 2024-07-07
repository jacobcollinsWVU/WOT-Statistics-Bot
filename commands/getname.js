const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
  data: new SlashCommandBuilder()
  .setName('getname')
  .setDescription('Returns User')
  .addUserOption(option =>
      option
          .setName('user')
          .setDescription('Get the name of another user')
          .setRequired(false)
  ),

  async execute(interaction){
    const user = interaction.options.getUser('user') || interaction.user;
    interaction.reply(`${user.username}`);
  }
}