const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = args[0];
    const settings = client.getSettings(message.guild.id);

    if (user) {
        message.guild.ban(user).then(() => {
          message.reply("Successfully banned the user!");

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.MessageEmbed()
            .setTitle("User Banned")
            .setColor("#eeeeee")
            .setDescription(`Name: ${user.username}\nID: ${args[0]}\nReason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          }
        }).catch(err => {
          message.reply("I was unable to ban the user.");
        });
    } else message.channel.send("You didn't provide a valid user ID!");
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
  aliases: ["hb"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "hackban",
  category: "Moderation",
  description: "Bans a member not in your server.",
  usage: "hackban @<userID> [reason]"
};
