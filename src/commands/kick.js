const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    if (user == message.author) return message.channel.send(client.errors.cannotKickSelf);
    const settings = client.getSettings(message.guild.id);

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick(args.slice(1).join(" ")).then(() => {
          message.channel.send(`Successfully kicked ${user.tag}`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.MessageEmbed()
            .setTitle("User Kicked")
            .setColor("#eeeeee")
            .setDescription(`Name: ${user.username}\nID: ${user.id}\nReason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

            message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);        
          }
        }).catch(err => {
          message.channel.send(`I wasn't able to kick the member!\n\n${err}`);
        });
      } else {
        message.channel.send(client.errors.userNotInGuild);
      }
    } else {
      message.channel.send("You didn't mention the user to kick!");
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
  aliases: ["ki"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks the specified member.",
  usage: "kick @<user> [reason]"
};
