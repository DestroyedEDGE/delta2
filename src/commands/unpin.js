exports.run = async (client, message, args, level) => {
  try {
      if (!args[0]) return message.channel.send("You need to give me a message ID!");
    
      let msg = message.channel.messages.get(args[0]);
      if (!msg) return message.channel.send("That message does not exist! Make sure to use this command in the same channel as the message.");
      
      msg.pin().catch(() => {
        return message.channel.send(client.errors.genericError);
      });
      message.channel.send("I've unpinned the message!");
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
  aliases: ["upin"],
  guildOnly: false,
  permLevel: "Moderator"
};

exports.help = {
  name: "unpin",
  category: "Moderation",
  description: "Unpins the specified message.",
  usage: "unpin <id>"
};
