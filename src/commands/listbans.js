exports.run = async (client, message, args, level) => { 
  try {
    let output = "";
    let i = 0;
    
    let confirm = await client.awaitReply(message, "There may be lots of DM's. Do you still want to list the bans? (Reply with y or yes to list the bans)");
    
    if (!["y", "yes"].includes(confirm)) message.reply("Ok!\nCancled.");
    else {
      message.guild.fetchBans().then(async (bans) => {
        message.channel.send("The bans are in your DM's!");
        
        bans.forEach(async (ban) => {
          i++;
          await message.author.send(i + ". **Name: " + ban.tag + "** | **ID: " + ban.id + "**");
        });

      });
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
  aliases: ["bans", "banlist"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "listbans",
  category: "Moderation",
  description: "Returns the server's bans",
  usage: "listbans"
};
