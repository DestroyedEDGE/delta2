// This code as of right now is quite bad and needs to be rewritten
// It doesnt even work at all and just throws an error in the console -EDGE

const google = require("google");

google.protocol = "https"; // this could help 
exports.run = async (client, message, args) => { 
  try { 
    if (!args[0]) return message.channel.send("You need to give me something to search for!");
    google.resultsPerPage = 5;

    google(args.join(" "), async (err, res) => {
      
      if (err) return message.channel.send(client.errors.genericError + err);
      
      if (!res.links[0].href) return message.channel.send("I couldn't find anything for your search term!");
      
      /*/!\work in progress/!\*/
      let output = "";
      let i = 1;
      
      res.links.forEach(async (link) => {
        output += "\n" + i + ". " + link.title; //idk what i'm doing let's try this out ig
        i++;
      });
      
            
      let page = await client.awaitReply(message, `Please choose the result you want:${output}`);
      if (isNaN(page)) return message.channel.send("That's not a number!");
      let pagenum = Number(page) - 1;
      
      let link = res.links[pagenum];
      
      let embed = new client.Embed("normal", {
        title: link.title,
        url: link.href,
        footer: link.href,
        description: client.truncate(link.description, 2000)
      });
      /*/!\work in progress/!\*/
      message.channel.send(embed);
    });
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
  enabled: false, // see below
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "google",
  category: "Search",
  description: "Searches Google for your query.",
  usage: "google <query>"
};

/* seems like the google feature is broken, we have to update it, look at this:
https://stackoverflow.com/questions/56856201/how-to-create-a-google-search-command-in-a-discord-bot */
