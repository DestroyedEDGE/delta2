exports.run = async (client, message, args, level) => { 
  try {
    let msg = await message.channel.send("<@"+message.author.id+">");

    let embed = new client.Embed("normal", {
      title: "Ping",
      description: `Message Trip: ${msg.createdTimestamp - message.createdTimestamp}ms`
// Websocket Heartbeat: ${Math.floor(client.pings[0])}ms
// Average Websocket Heartbeat: ${Math.floor(client.pings.average())}ms
    });

    msg.edit(embed);
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
  aliases: ["lag"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "General",
  description: "Returns the bot's ping.",
  usage: "ping"
};
