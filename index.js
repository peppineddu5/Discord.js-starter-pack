const { Client, Intents, Collection } = require("discord.js");
global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
require("./error/error.js");

const fs = require("fs");

client.commands = new Collection();

fs.readdir("./commands", (err, files) => {
    files.forEach(file => {
        if (file.endsWith(".js")) {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        }
    });
});

fs.readdir("./events", (err, files) => {

    files.forEach(file => {
        if (file.endsWith(".js")) {
            const event = require(`./events/${file}`);
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
});

client.on("messageCreate", msg => {
    //Prefix
    global.prefix = "!";

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLocaleLowerCase();
    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return;

    const commandsAlias = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    commandsAlias.execute(msg, args);
})

client.login(config.TOKEN);
