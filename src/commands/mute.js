const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if (!message.guild.roles.cache.find(r => r.name == settings.muteRole)) {
          message.guild.roles.create({
            name: settings.muteRole || "CytrusMute",
            color: "#eeeeee",
            permissions: ["READ_MESSAGES"]
          }).catch();
        }
        
        
        member.roles.add(message.guild.roles.cache.find(r => r.name == settings.muteRole)).then(async () => {
          message.reply(`**Successfully muted ${user.tag}**`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.MessageEmbed()
            .setTitle("User Mute")
            .setColor("#eeeeee")
            .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

            message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);
          }
        }).catch(err => {
          message.reply("I wasn't to mute this user.\n" + err);
        });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to mute!");
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
  aliases: ["m"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Mutes the specified user.",
  usage: "mute @<user>"
};
