exports.run = async (client, message, args, level) => {
  try {
    let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
    
    switch (args[0]) {
      case "animated":
        if (!id) return message.reply("You didn't input a valid emoji or it is a default Discord emoji!");
        if (!args.slice(2).join(" ")) return message.reply("You need to give the name of the emoji!");
        message.guild.createEmoji("https://cdn.discordapp.com/emojis/" + id + ".gif", args.slice(2).join(" "))
          .then(emoji => message.channel.send("I've created the " + emoji.name + " emoji!"))
          .catch(err => message.reply("I couldn't create the emoji!\n" + err));
        break;
      case "static":
        if (!id) return message.reply("You didn't input a valid emoji or it is a default Discord emoji!");
        message.guild.createEmoji("https://cdn.discordapp.com/emojis/" + id + ".png", args.slice(2).join(" "))
          .then(emoji => message.channel.send("I've created the " + emoji.name + " emoji."))
          .catch(err => message.reply("I couldn't create the emoji!\n" + err));
        break;
      default:
        message.reply("You need to supply the type of emoji it is!");
        break;
    }
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
  aliases: ["emotesteal", "es", "esteal"],
  guildOnly: false,
  permLevel: "Moderator"
};

exports.help = {
  name: "emojisteal",
  category: "Fun",
  description: "Steals an emoji from the current server.",
  usage: "emojisteal <static/animated> <emoji>"
};
