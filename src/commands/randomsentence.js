const sen = require("txtgen").sentence;

exports.run = async (client, message, args, level) => { 
  try {
    message.channel.send(sen());
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
  aliases: ["sentence", "rsent"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "randomsentence",
  category: "General",
  description: "Returns a random sentence.",
  usage: "randomsentence"
};
