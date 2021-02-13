exports.run = async (client, message, args, level) => { 
    try {
        // This code is GARBAGE. We could make it much better if we just read the copypastas from a file and caching it
        if (args[0] == "genericError")
            message.channel.send(client.errors.genericError);
        if (args[0] == "wiiError")
            message.channel.send(client.errors.wiiError);
        if (args[0] == "userNotInGuild")
            message.channel.send(client.errors.userNotInGuild);
        if (args[0] == "cannotBanSelf")
            message.channel.send(client.errors.cannotBanSelf);
        if (args[0] == "noResults")
            message.channel.send(client.errors.noResults);
        if (args[0] == "noArticleDescription")
            message.channel.send(client.errors.noArticleDescription);
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
  
  //permissions and aliases
  
  exports.conf = {
    enabled: true,
    aliases: ["testerrmsg", "terr"],
    guildOnly: false,
    permLevel: "Bot Dev"
  };
  
  
  //what the command does
  
  exports.help = {
    name: "testerrormessage",
    category: "Testing",
    description: "Test out error messages to see if they look good and stuff",
    usage: "testerrormessage (errorname)"
  };
