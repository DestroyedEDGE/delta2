exports.run = async (client, message, args, level) => {
  try {
    message.channel.messages.fetch({limit: 2}).then(async messages => {
      if (!Array.from(messages.keys())[1]) return message.reply("You have to send a message.");
      let msg = messages.get(Array.from(messages.keys())[1]);
      msg.pin().catch(() => {
        return message.channel.send(client.errors.genericError);
      });
      message.channel.send("I've pinned the message!");
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
  aliases: [],
  guildOnly: false,
  permLevel: "Moderator"
};

exports.help = {
  name: "pin",
  category: "Moderation",
  description: "Pins the last message sent in the channel.",
  usage: "pin"
};
