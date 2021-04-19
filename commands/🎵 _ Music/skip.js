const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
        name: 'skip',
        aliases : ['s'],
        description : 'To skip to the next song :3',
        run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send({embed : {
          description : `:x: \`You have to be in a voice channel to use this command\` `
        }});
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `:x: \`You have to be in the same channel as the bot\``,
              color : color.error,
              footer : {
                text : footer.footertext,
                icon_url : footer.footericon
              }
            }}).then(msg=>msg.react('❌'))
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed : {
          description : `:x: \`Nothing is playing\``,
          color : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg.react('❌'))
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send({
          embed:{
          color: color.blue,
          description: `⏩ \`Skipped the music for you\``,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          } 
          
        }})
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
