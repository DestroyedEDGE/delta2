exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1) return message.channel.send("You must provide a command to reload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.channel.send(`Error unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.channel.send(`Error loading: ${response}`);

    client.logger.info(`Reloading command: ${args[0]}`);
    message.channel(`The command \`${args[0]}\` has been reloaded`);
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
  aliases: ["refresh"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command.",
  usage: "reload [command]"
};
