const Discord = require("discord.js");
const os = require("os");

exports.run = async (client, message, args, level) => { 
  try {
    var opsys = os.platform();
    var cleanOS = client.friendlyOS(opsys);
    const embed = new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setTitle(`${client.config.botName}`)
    .setFooter("Originally made by CelestialCrafter and EnderGirlGamer. Rewritten by Devnol, Rexowogamer, Odyssey346 and Midou.")
    .setDescription(`Github: [Repo](${client.config.github})
Website: [Check it out](${client.config.site})
Support Server: [Join](${client.config.supportServer})
Issues: [Right here](${client.config.github}/issues)
Version: V${client.config.version}
Currently running on: ${cleanOS}`);
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
  aliases: ["i"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "info",
  category: "General",
  description: "Returns info about Cytrus-RE.",
  usage: "info"
};
