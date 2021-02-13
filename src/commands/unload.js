exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1) return message.channel.send("You must provide a command to unload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.channel.send(`Error unloading: ${response}`);

    client.logger.info(`Unloading command: ${args[0]}`);
    message.channel.send(`The command \`${args[0]}\` has been unloaded.`);
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
  aliases: ["uload"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "unload",
  category: "System",
  description: "Unloads a command",
  usage: "unload [command]"
};
