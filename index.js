require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const {Routes} = require("discord-api-types/v9");
const {REST} = require("@discordjs/rest");
const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const permissions = [
    {
        id: '287352359074660353',
        type: 'ROLE',
        permission: true,
    },
];

client.on('ready', async () => {
    let t = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID));
    for (const tt of t) {
        const command = await client.guilds.cache.get('287351401615720448')?.commands.fetch(tt.id);
        console.log(tt.id)
        await command.permissions.set({ permissions });
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(process.env.CLIENT_TOKEN);
