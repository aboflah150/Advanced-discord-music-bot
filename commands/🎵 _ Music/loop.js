const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')

module.exports = {
  name: "loop",
  aliases: ["repeat"],
  description : 'To repeat the song that is playing :3',
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send({embed : {
        description : `:x: \`You have to be in a voice channel to use this command\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }

      }}).then(msg=>msg.react('❌'))
    const serverQueue = client.queue.get(message.guild.id);
    try {
      if (!serverQueue)
        return message.channel.send({embed : {
          description : `:x: \`There is nothing playing try to add some songs\``,
                  color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
        }}).then(msg=>msg.react('❌'))
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send({embed:{
          description : `:x: \`You have to be in the same channel as the bot\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
        
        }}).then(msg=>msg.react('❌'))
      }
      if (!serverQueue.loop) {
        serverQueue.loop = true;
        return message.channel.send({
          embed:{
        color: color.blue,
        description: `🔁 \`Loop now is enabled\``,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
        
        }}).then(msg=>msg.react('🔁'))
      } else {
        serverQueue.loop = false;
        return message.channel.send(
          {embed: {
            description : `🔁 \`Loop now is disabled\``,
            color : color.blue,
            footer : {
              text : footer.footertext,
              icon_url  : footer.footericon
            }
          }}).then(msg=>msg.react('🔁'))
      }
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send({embed:{
        description : `💥 \`Something went wrong in the bot system , try again later\``,
        color : color.boom,
        footer : {
          text : footer.footertext,
          icon_url : footer.footer.icon
        }
      }}).then(msg=>msg.react('💥'))
    }
  }
};
