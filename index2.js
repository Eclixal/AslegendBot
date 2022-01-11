require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed, GuildMemberManager} = require('discord.js');
const fs = require('fs');
const {Routes} = require("discord-api-types/v9");
const {REST} = require("@discordjs/rest");
const rest = new REST({ version: '9' }).setToken(process.env.C2_CLIENT_TOKEN);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const perms = [
    {
        id: '929758032420823050',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '929760172245676132',
        type: 'ROLE',
        permission: true,
    }
];

client.on('ready', async () => {
    client.user.setActivity('Travail', { type: 'COMPETING' });
    //
    let t = await rest.get(Routes.applicationGuildCommands(process.env.C2_CLIENT_ID, process.env.C2_GUILD_ID));
    for (const tt of t) {
        const command = await client.guilds.cache.get(process.env.C2_GUILD_ID)?.commands.fetch(tt.id);
        await command.permissions.set({ permissions: perms, command: 926187070207172651 });
    }


    // Moteur
    // Roue de secours
    // Trousse à outils
    // Liqueur
    const stock = new MessageEmbed()
        .setColor('#bbff00')
        .setTitle('Gestion des stocks')
        .addFields(
            {
                "name": `Moteur`,
                "value": `0`
            },{
                "name": `Roue de secours`,
                "value": `0`
            },{
                "name": `Trousse à outils`,
                "value": `0`
            },{
                "name": `Liqueur`,
                "value": `0`
            }
        )
        .setTimestamp()

    const channel = client.channels.cache.get('929764255203487755');
    // channel.send({ embeds: [stock] });

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        if (interaction.commandName === 'add-stock') {
            const embedMessage = await client.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client.channels.cache.get("929774715965440070").send(interaction.user.username + ' > add-stock type:' + interaction.options.getString('stockage') + " nb + :" + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        } else if (interaction.commandName === 'remove-stock') {
            const embedMessage = await client.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) - parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client.channels.cache.get("929774715965440070").send(interaction.user.username + ' > remove-stock type: ' + interaction.options.getString('stockage') + " nb + : " + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        }
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.C2_CLIENT_TOKEN);
