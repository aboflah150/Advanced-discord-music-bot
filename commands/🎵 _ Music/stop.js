const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
const {MessageEmbed} = require('discord.js')
module.exports = {
        name: 'stop',
        aliases : ['leave'],
        description :  'To Make the bot leave the channel and clear the queue :3',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel){ message.channel.send({embed :{
          description : `:x: \`You have to be in a voice channel to use this command\``,
          color  : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg.react('❌'))
        }
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `:x: \`You have to be in the same channel as the bot\` `
            }}).then(msg=>msg.react('❌'))
          }
        const serverQueue = client.queue.get(message.guild.id);
      try {
        if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        return message.channel.send({embed: {
          description: `🛑 Okay fine..im leaving :'(`,
          color : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
          
          }}).then(msg=>msg.react('🛑'))
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
