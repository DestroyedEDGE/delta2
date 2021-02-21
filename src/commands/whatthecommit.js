const request = require("request");

exports.run = async (client, message, args, level) => {
  try {
    request("http://whatthecommit.com/index.txt", (req, res, txt) => message.channel.send("Commit Message: " + txt));
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
  aliases: ["wtc"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "whatthecommit",
  category: "Fun",
  description: "Returns a random commit message",
  usage: "whatthecommit"
};
