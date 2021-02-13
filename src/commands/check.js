const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let members = [];
    const settings = client.getSettings(message.guild.id);
    
    let msg = await message.channel.send("Checking members...");
    message.guild.members.cache.forEach(async (member) => {
      if (client.config.globalBan.includes(member.id)) members.push(member.id);
    });
    
    if (!members[0]) msg.edit("This server is all clean!");
    else {
      let toban = await client.awaitReply(message, `I found ${members.length} members on the Global Ban List. Do you want to ban them? (Reply with yes or no)`);
      
      if (["y", "yes", "true", "mhm", "yep", "yeah", "hell yeah", "sure"].includes(toban)) {
        let banmsg = await message.channel.send("Banning members...");
        members.forEach(async (id) => {
          message.guild.members.cache.find(member => member.id == id).ban("Detected by the Cytrus-RE Global Ban List").then(() => {
            const modLogChannel = settings.modLogChannel;
            if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
              let embed = new Discord.MessageEmbed()
              .setTitle("User Banned")
              .setColor("#eeeeee")
              .setDescription(`ID: ${id}\nReason: Detected by the Cytrus Global Ban List\nModerator: ${message.author.username}`);

              message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
            }
          }).catch(err => {
            message.channel.send("Unable to ban user. User ID: " + id);
          });
        });
        
        banmsg.edit("I've banned all the users on the Global Ban List!");
      } else message.channel.send("OK! Aborting...");
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
  aliases: [],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "check",
  category: "Moderation",
  description: "Checks if anyone in your server is on the Cytrus-RE Global Ban List.",
  usage: "check [ban]"
};
