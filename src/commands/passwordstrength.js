const zxcvbn = require("zxcvbn");

exports.run = async (client, message, args, level) => { 
  try {
    if (message.guild) {
      message.channel.send("For security reasons, this command is not available in servers. Please run this command in DM's.");
      message.delete(); //delete the command usage.
    }
    if (!args[0]) return message.reply("You need to give the password!");
    
    let res = await zxcvbn(args.join(" "));
    let scorefr = "";
    
    if (res.score == 0) scorefr = "Very Weak";
    if (res.score == 1) scorefr = "Weak";
    if (res.score == 2) scorefr = "Medium";
    if (res.score == 3) scorefr = "Strong";
    if (res.score == 4) scorefr = "Very Strong";
    
    let embed = new client.Embed("normal", {
      title: "Password Strength",
      fields: [
        {
          title: "Score",
          text: res.score + " - " +  scorefr
        },
        {
          title: "Throttled Online Attack Crack Time",
          text: res.crack_times_display.online_throttling_100_per_hour.toProperCase() || "Not Available"
        },
        {
          title: "Unthrottled Online Attack Crack Time",
          text: res.crack_times_display.online_no_throttling_10_per_second.toProperCase() || "Not Available"
        },
        {
          title: "Offline attack, Slow hash, Many cores Crack Time",
          text: res.crack_times_display.offline_slow_hashing_1e4_per_second.toProperCase() || "Not Available"
        },
        {
          title: "Offline attack, Fast hash, Many cores Crack Time",
          text: res.crack_times_display.offline_fast_hashing_1e10_per_second.toProperCase() || "Not Available"
        }
      ]
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
  aliases: ["pss", "ps", "pi"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "passwordstrength",
  category: "General",
  description: "Returns how long your password will take to crack and the strength score of it. DM only.",
  usage: "passwordstrength <password>"
};
