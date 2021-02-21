const request = require("request");

exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.channel.send(client.errors.noQueryGiven);
    
    request({url: "https://djsdocs.sorta.moe/main/stable/embed?q=" + encodeURIComponent(args.join(" ")), json: true}, (req, res, json) => {
      message.channel.send({embed: json});
    });
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
  aliases: ["djs", "djsdocs", "discordjs"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "discordjsdocs",
  category: "Search",
  description: "Searches the Discord.js docs for your query.",
  usage: "discordjsdocs <query>"
};
