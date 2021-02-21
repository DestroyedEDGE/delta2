const Discord = require("discord.js");
exports.run = async (client, message) => { 
  try {
    let invEmbed = new Discord.MessageEmbed()
    .setTitle("Invite Cytrus-RE to your server!")
    .setDescription(`[**Click here!**](${client.config.botInvite})`)
    .setColor("#eeeeee");
    message.channel.send(invEmbed);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Something went wrong")
    .setFooter(`${client.config.botName} v${client.config.version}`)
    .addField("Info", `${client.errors.fancyError}`)
    .addField("What's the error?", `${err}`)
    .addField("What can I do?", `You can only report the error. We plan on making it automatically report errors in the future.`);
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["ri,", "botinvite", "bi", "returninvite", "cyinv"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "botinv",
  category: "General",
  description: "Returns the invite link for Cytrus-RE.",
  usage: "botinv"
};
