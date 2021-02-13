const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { 
  try {
  //command code

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));    
    if (!rUser) return message.channel.send("I couldn't find the specified user!");
    console.log("user exists!"); 
    let rreason = args.join(" ").slice(22);


    let reportEmbed = new Discord.MessageEmbed()
     .setAuthor("Cytrus-RE User Report")
     .setColor("#eeeeee")
     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
     .addField("Reported in", message.channel)
     .addField("Reported at", message.createdAt)
     .addField("Reason for report", rreason);

     let reportschannel = client.channels.get("691142562253242409");
     if(!reportschannel) return message.channel.send("I couldn't find the reports channel!");
     console.log("Report channel exists!"); 

     message.delete();
     console.log("Report message deleted!"); 
     reportschannel.send(reportEmbed);
     console.log("Report message sent!");
     message.channel.send("Report successfully sent!");

//error log
  
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
  enabled: false, // needs some work
  aliases: ["gbr", "gbreport"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "report",
  category: "Moderation",
  description: "Reports a user to be put on the Cytrus-RE Global Ban List.",
  usage: "report <user> <reason>"
};
