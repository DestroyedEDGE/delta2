const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {
    let embed = new Discord.MessageEmbed()
    .setTitle(message.guild.name)
    .setDescription(`
ID: ${message.guild.id}
Members: ${message.guild.memberCount}
Region: ${message.guild.region}
Name: ${message.guild.name}
Icon URL: ${message.guild.iconURL("jpeg", true, 256)}
Created At: ${message.guild.createdAt}
MFA Level: ${message.guild.mfaLevel}
Verification Level: ${message.guild.verificationLevel.toProperCase()}
Owner ID: ${message.guild.ownerID}
Name Acronym: ${message.guild.nameAcronym}
`)    
    .setThumbnail(message.guild.iconURL("jpeg", false, 256))
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
  aliases: ["server", "si"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Utility",
  description: "Returns info about the server you're in.",
  usage: "serverinfo"
};
