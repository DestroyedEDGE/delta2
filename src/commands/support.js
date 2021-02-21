const Discord = require("discord.js");

exports.run = async (client, message) => { 
  try {
      const embed = new Discord.MessageEmbed()
      .setColor("#eeeeee")
      .setTitle("Cytrus-RE's Support Discord")
      .setFooter("Join our server to get help, report bugs, suggest features and more!")
      .setDescription(`[**Join here!**](${client.config.supportServer})`);
      message.channel.send(embed);
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
  aliases: ["supportserver"],
  guildOnly: false,
  permLevel: "User"
};
  
exports.help = {
  name: "support",
  category: "System",
  description: "Gives you a link to our Discord server.",
  usage: "support"
};
