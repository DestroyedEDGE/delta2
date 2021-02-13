exports.run = async (client, message, args, level) => {
  try {
    let num;

    if (!isNaN(args[0])) {
      num = parseInt(args[0]);

      if (num <= 100 && num > 1) {
        message.delete();
        message.channel.bulkDelete(num);
      } else message.reply("You must enter a number between 2 and 100 for me to clear!");
    } else {
      message.reply("You must enter a number between 2 and 100 for me to clear!");
    }
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
  aliases: ["clear", "c"],
  guildOnly: true,
  permLevel: "Bot Support"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Purges the amount of messages you specify",
  usage: "purge <2-100>"
};
