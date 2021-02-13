exports.run = async (client, message, args, level) => { 
  try {
    let res = await client.awaitReply(message, "Are you sure you want to kill the client?");
    
    if (res == "yes") {
      message.channel.send("Killing client...");
      client.destroy();
    }
    else message.channel.send("Aborted.");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["botdest", "clidest", "destroy"],
  guildOnly: true,
  permLevel: "Bot Admin"
};

exports.help = {
  name: "kill",
  category: "System",
  description: "Kills the client and logs out of Discord.",
  usage: "kill"
};
