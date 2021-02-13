const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    require("request")({url: "http://www.splashbase.co/api/v1/images/random?images_only=true", json: true}, (req, res, json) => {
      let embed = new Discord.MessageEmbed()
      .setTitle("Random Picture")
      .setColor("#363942")
      .setImage(json.url);
      
      message.channel.send(embed);
      console.log(`Image sent: ${json.url}`);
    });
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
  aliases: ["randomimage", "randompic", "randomimg", "ranpic"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "randompicture",
  category: "Fun",
  description: "Returns a random picture.",
  usage: "randompicture"
};
