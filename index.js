require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
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

const perms = [
    {
        id: '881464315234885653',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '876103493751029802',
        type: 'ROLE',
        permission: true,
    },
];

client.on('ready', async () => {
    client.user.setActivity('Travail', { type: 'COMPETING' });

    // let t = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID));
    // for (const tt of t) {
    //     const command = await client.guilds.cache.get(process.env.GUILD_ID)?.commands.fetch(tt.id);
    //     await command.permissions.set({ perms });
    // }

    const stock = new MessageEmbed()
        .setColor('#bbff00')
        .setTitle('Gestion des stocks')
        .addFields(
            {
                "name": `Roue de secours`,
                "value": `0`
            },
            {
                "name": `Trousse à outils`,
                "value": `0`
            },
            {
                "name": `Bidon d'essence`,
                "value": `0`
            },
            {
                "name": `Moteur`,
                "value": `0`
            },
            {
                "name": `Bombe de peinture`,
                "value": `0`
            },
            {
                "name": `Liqueur de Stricker`,
                "value": `0`
            },
            {
                "name": `Boisson`,
                "value": `0`
            },
            {
                "name": `Nourriture`,
                "value": `0`
            }
        )
        .setTimestamp()

    const channel = client.channels.cache.get('876110522037194812');
    // channel.send({ embeds: [stock] });

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        if (interaction.commandName === 'add-stock') {
            const embedMessage = await client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE).then(message => message.edit({ embeds: [embed] }))
        } else if (interaction.commandName === 'remove-stock') {
            const embedMessage = await client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) - parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE).then(message => message.edit({ embeds: [embed] }))
        }
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.CLIENT_TOKEN);
