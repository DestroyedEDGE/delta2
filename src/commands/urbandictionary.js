const ud = require("urban-dictionary");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.channel.send("You need to give me a word or phrase!");
    ud.term(args.join(" ")).then(async (result) => {
      let output = "";
      let entries = result.entries;
      let i = 1;
      
      if (entries == []) return message.channel.send(`I couldn't find any results for ${args.join(" ")}!`);
      
      Object.keys(entries).forEach(async (pageID) => {
        output += "\n" + i + ". " + entries[pageID].word;
        i++;
      });
      
      let page = await client.awaitReply(message, `Please choose the page you want, or respond with "abort" to quit:\n${output}`);
      
      if (page.toLowerCase() === "abort") return message.channel.send("Aborted.");
      if (isNaN(page)) return message.channel.send(`${page} is not a number!`);
      
      let embed = new Discord.MessageEmbed()
      .setTitle(entries[page - 1].word)
      .addField("**Definition**", entries[page - 1].definition)
      .addField("**Example:**", entries[page - 1].example)
      .setFooter(`Requested by ${message.author.tag}`)
      .setColor("#eeeeee");

      message.channel.send(embed).catch(err => message.channel.send("The definition was too big or there was another error!\n\n" + err));
    });
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
  aliases: ["urban", "ud"],
  guildOnly: false,
  nsfwOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "urbandictionary",
  category: "Search",
  description: "Searches the Urban Dictionary for your query.",
  usage: "urbandictionary <word/phrase>"
};
