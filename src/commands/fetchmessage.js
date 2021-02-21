exports.run = async (client, message, args, level) => { 
  try {
    let fetched = await message.channel.fetchMessage(args[0]);
    let afiles = [];
    
    fetched.attachments.forEach((attachment) => {
      afiles.push({
        name: attachment.filename,
        attachment: attachment.url
      });
    });
    
    let embed = new client.Embed("normal", {
      title: fetched.id,
      url: fetched.url,
      thumbnail: fetched.author.avatarURL,
      footer: "Message created by " + fetched.author.tag,
      description: fetched.content || "No Message",
      files: afiles
    });
    
    message.channel.send(embed);
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
  aliases: ["fetm", "fetchmsg", "fmsg"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "fetchmessage",
  category: "General",
  description: "Sends the message linked to the specified message ID.",
  usage: "fetchmessage <id>"
};
