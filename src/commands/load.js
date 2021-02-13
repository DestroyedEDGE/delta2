exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1) return message.channel.send("You must specify what command to load!");

    let response;
    response = client.loadCommand(args[0]);
    if (response) return message.channel.send(response);
    client.logger.info(`Loading command: ${args[0]}`);
    message.channel.send(`The command ${args[0]} has been loaded.`);
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
  guildOnly: false,
  aliases: ["coml", "loadc"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "load",
  category: "System",
  description: "Loads a command.",
  usage: "load [command]"
};
