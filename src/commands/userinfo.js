const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {    
    let user = message.mentions.members.first() || message.member;
    
    let embed = new Discord.MessageEmbed()
    .setTitle(user.user.username)
    .setDescription(`ID: ${user.id}
Name: ${user.user.username}
Icon URL: ${user.user.avatarURL("jpeg", true, 256)}
Account Created At: ${user.user.createdAt}
Game: ${user.user.presence.game || "none"}
Status: ${user.user.presence.status.toProperCase()}
Full Name: ${user.user.tag}`)
    .setThumbnail(user.user.avatarURL("jpeg", true, 256))
    .setColor("#eeeeee");
    
    message.channel.send(embed);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Something went wrong")
    .setFooter(`${client.config.botName} v1.3.0-delta`)
    .addField("Info", `${client.errors.fancyError}`)
    .addField("What's the error?", `${err}`)
    .addField("What can I do?", `You can only report the error. We plan on making it automatically report errors in the future.`);
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["user", "ui"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "userinfo",
  category: "Utility",
  description: "Returns info about the specified user.",
  usage: "userinfo <mention (defaults to author)>"
};
