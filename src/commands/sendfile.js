const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.channel.send("You have to tell me which file to send!");
    
    message.author.send(new Discord.Attachment(fs.createReadStream("/app/" + args.join(" ")))).catch(() => {
      return message.channel.send("I couldn't find the file or there was an error!");
    });

    
    message.channel.send("The file has been sent to your DM's!");
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
  aliases: ["sfl", "sfile"],
  guildOnly: false,
  permLevel: "Bot Manager"
};

exports.help = {
  name: "sendfile",
  category: "System",
  description: "Returns the specified file",
  usage: "sendfile <path>"
};
