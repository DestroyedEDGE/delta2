module.exports = async client => {
  const statusList = [
    {msg: `Delta v1.3.0 | ${client.config.defaultSettings.prefix}help`, type: "PLAYING"},
    {msg: `for commands | ${client.config.defaultSettings.prefix}help`, type: "WATCHING"},
    {msg: `over ${client.guilds.cache.size} servers | ${client.config.defaultSettings.prefix}help`, type: "WATCHING"},
    {msg: `development progress! | ${client.config.defaultSettings.prefix}help`, type: "WATCHING"},
  ];

  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);
 
 
  client.user.setStatus("online");
  
  let users = client.users.cache.size;
  let servers = client.guilds.cache.size;
  let channels = client.channels.cache.size;

  // logs the status
  client.logger.info(`RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, "ready");
  client.logger.info(`Users: ${users}`, "ready");
  client.logger.info(`Servers: ${servers}`, "ready");
  client.logger.info(`Channels: ${channels}`, "ready");
  client.logger.info(`Running on Node ${process.version.replace(" ", "")}`, "ready");
  client.logger.info(`...and using Discord.js v${require("discord.js").version.replace(" ", "")}`, "ready");

  client.logger.info("Delta v" + require("../../package").version + " | https://github.com/DestroyedEDGE/delta2");
  client.startuptime = new Date().getTime() - client.starttime;
  client.logger.info("It took " + client.startuptime + "ms to start Delta.");
};
