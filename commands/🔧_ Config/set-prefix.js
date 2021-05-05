const { default_prefix } = require("../../configuration/config.json")
const db = require("quick.db")
const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')


module.exports =  {
  name : 'set-prefix',
  aliases : ['prefix'],


  run : async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed : {
        description : `:x: \`You don't have permission [ADMINISTRATOR]\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }


       if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed : {
        description : `:x: \`I don't have permission [ADMINISTRATOR]\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    } 
    
    if(!args[0]) {
      return message.channel.send({embed : {
        description : `:x: \`Please provide the prefix that you want to put\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    } 
    
    if(args[1]) {
      return message.channel.send({embed : {
        description : `:x: \`The prefix can't be more than one argument\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
    
    if(args[0].length > 5) {
      return message.channel.send({embed : {
        description : `:x: \`The prefix can't be more than 5 charachters\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send({embed : {
        description : `✅ \`Reseted prefix\``,
        color : color.success,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('✅'))
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send({embed : {
        description : `✅ \`seted prefix to : ${args[0]}\``,
        color : color.sucess,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('✅'))

  }
}