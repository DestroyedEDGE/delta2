const joke = require("one-liner-joke").getRandomJoke;

exports.run = async (client, message, args, level) => { 
  try {
    message.channel.send(joke({"exclude_tags": ["dirty", "racist", "marriage", "sex", "death"]}).body);
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
  aliases: ["joke"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "randomjoke",
  category: "General",
  description: "Returns a random joke.",
  usage: "randomjoke"
};
