const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
        name: 'volume',
        aliases: ["vol"],
        description : 'To change the music volume :3',
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send({embed : {
          description : `:x: \`You have to be a voice channel to use this command\``,
          color : color.error,
          footer : {
            text  : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg.react('❌'))
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `:x: \`You have to be in the same voice channel as the bot\``,
              color : color.error,
              footer : {
                text : footer.footertext,
                icon_url : footer.footericon
              }
            }}).then(msg=>msg.react('❌'))
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue){
          message.channel.send({embed : {
            description : `:x: \`There is nothing playing\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
        }
        if (!args[0]) return message.channel.send({embed : {
          description : `🔊 \`The current server volume is :\` **${serverQueue.volume}**`, 
          color : color.blue,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg.react('🔊'))
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send({embed : {
          description : `🔊 \`Changed volume to :\` **${args[0]}**`,
          color : color.blue,
          footer : {
            text : footer.footertext,
            icon_url  : footer.footericon
          }
        }}).then(msg=>msg.react('🔊'))
      } catch {
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
