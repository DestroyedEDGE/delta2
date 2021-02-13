const Discord = require("discord.js");

exports.run = async (client, message, args) => { 
  try {
    if (!args.join(" ")) return message.channel.send("You need to give me a question!");
    
    let pollEmbed = new Discord.MessageEmbed()
    .setTitle(args.join(" "))
    .setDescription("Poll created by " + message.author.tag)
    .setColor("#eeeeee");

    let msg = await message.channel.send(pollEmbed);
    
    await msg.react("👍");
    await msg.react("👎");
    await msg.react("🤷");
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
  aliases: ["vote", "ask"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "poll",
  category: "General",
  description: "Starts a poll.",
  usage: "poll <question>"
};
