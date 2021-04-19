const discord = require("discord.js");

module.exports = {
  name: "help",
  description : 'To show this menu',
  run: async (client, message, args) => {
    const embed = new discord.MessageEmbed()

      .setTitle('Help section')


      .setDescription(`
      **help** \`show this menu\` 
      **ping** \`show the bot latency\`
      **loop** \`repeat music\`
      **now playing** \`show the current music\`
      **pause** \`pause the music\`
      **play** \`play music\`
      **queue** \`show the musics\`
      **resume** \`resume the music\`
      **skip to** \`skip to a song\`
      **skip** \`skip the song\`
      **stop** \`the bot leave\`
      **volume** \`change music volume\``)
      .setFooter(message.guild);
    message.channel.send(embed);
  }
};
