const Discord = require("discord.js");
const os = require("os");

exports.run = async (client, message, args, level) => { 
  try {
    var opsys = os.platform();
    var cleanOS = client.friendlyOS(opsys);
    const embed = new Discord.MessageEmbed()
    .setColor("#eeeeee")
    .setTitle("Cytrus-RE")
    .setFooter("Originally made by CelestialCrafter and EnderGirlGamer. Rewritten by DestroyedEDGE, Rexowogamer, Odyssey346 and Midou.")
    .setDescription(`Github: [Repo](${client.conf.links.github})
Website: [Check it out](https://cytrus-re.github.io)
Support Server: [Join](https://discord.gg/BfpMgXs)
Issues: [Here](${client.conf.links.github}/issues)
Version: V1.3
Currently running on: ${cleanOS}`);
    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
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
