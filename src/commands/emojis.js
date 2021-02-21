exports.run = async (client, message, args, level) => {
  try {
    let notAnimated = [];
    let animated = [];
    
    message.guild.emojis.forEach(async emoji => {
      if (emoji.animated) animated.push(emoji.toString());
      else notAnimated.push(emoji.toString());
    });

    if (!animated[0]) animated = ["None"];
    if (!notAnimated[0]) notAnimated = ["None"];
    
    message.channel.send("Animated:\n" + animated.join(" ") + "\n\nNot Animated" + notAnimated.join(" "));
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
  aliases: ["emoji"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "emojis",
  category: "General",
  description: "Returns all of the emojis in the server.",
  usage: "emojis"
};
