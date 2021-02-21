const ms = require("ms");

exports.run = async (client, message, args, level) => { 
  try {
    if (!ms(args[0])) return message.reply("You have to give a valid time!");
    if (!args[1]) return message.reply("You have to say what to remind you about!");
    
    setTimeout(async () => {
      let embed = new client.Embed("normal", {
        title: "Reminder",
        description: args.slice(1).join(" ")
      });
      
      message.author.send(embed);
    }, ms(args[0]));
    
    message.channel.send("Reminder set!\nReminding you in: " + ms(ms(args[0]), {long: true}) + "\nI'll remind you in your DMS!");
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
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "remind",
  category: "General",
  description: "Reminds you at the specified time of the specified thing.",
  usage: "remind <time> <text>"
};