// why the fuck does this exist

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) {
      return message.reply("You need to specify a region!");
    } else {
      message.guild.setRegion(args[0]).catch(err => message.channel.send(client.errors.genericError + err));
      message.channel.send("Region set!");
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
  aliases: ["sr"],
  guildOnly: false,
  permLevel: "Administrator"
};

exports.help = {
  name: "region",
  category: "Moderation",
  description: "Changes the server's region.",
  usage: "region <region>"
};
