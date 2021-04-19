const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')

module.exports = {
        name: 'resume',
        aliases : ['re'],
        description : 'To resume the music that is playing :3',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) { 
          
          message.channel.send({embed : {
            description : `:x: \`You have to be in a voice channel before using this command\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
                      }
        const serverQueue = client.queue.get(message.guild.id);


        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
            description : `:x: \`You have to be in the same voice channel as the bot\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
      try {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send({embed:{
color: color.blue,                                       
description: `▶ \`Resumed the music for you\``,
footer : {
  text : footer.footertext,
  icon_url : footericon
}

}}).then(msg=>msg.react('▶️'))
        }
        return message.channel.send({embed : {
          description : `:x: \`There is nothing playing\``,
          color : color.error,
          footer :  {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg('❌'))
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
      }}).then(msg=>msg.react('💥'));
      }
  }
  }
};
