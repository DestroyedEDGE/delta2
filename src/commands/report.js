const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { 
  try {
  //command code

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));    
    if (!rUser) return message.channel.send("I couldn't find the specified user!");
    console.log("user exists!"); 
    let rreason = args.join(" ").slice(22);


    let reportEmbed = new Discord.MessageEmbed()
     .setAuthor("Delta User Report")
     .setColor("#eeeeee")
     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
     .addField("Reported in", message.channel)
     .addField("Reported at", message.createdAt)
     .addField("Reason for report", rreason);

     let reportschannel = client.channels.get("810101595147730944");
     if(!reportschannel) return message.channel.send("I either can't access the report channel or it doesn't exist.");
     console.log("Report channel exists!"); 

     message.delete();
     console.log("Report message deleted!"); 
     reportschannel.send(reportEmbed);
     console.log("Report message sent!");
     message.channel.send("Report successfully sent!");

//error log
  
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
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
  description: "Reports a user to be put on the Global Ban List.",
  usage: "report <user> <reason>"
};
