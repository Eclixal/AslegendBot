require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed, GuildMemberManager} = require('discord.js');
const fs = require('fs');
const client1 = new Client({ intents: [Intents.FLAGS.GUILDS] });

client1.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client1.commands.set(command.data.name, command);
}

client1.on('ready', async () => {
    client1.user.setActivity('Travail', { type: 'COMPETING' });
    console.log(`Logged in as ${client1.user.tag}!`);
});

client1.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client1.commands.get(interaction.commandName);

    if (!command) return;
    try {
        if (interaction.commandName === 'add-stock') {
            const embedMessage = await client1.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))).toString()}
            client1.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client1.channels.cache.get("929774715965440070").send(interaction.user.username + ' > add-stock type: ' + interaction.options.getString('stockage') + " nb + :" + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        } else if (interaction.commandName === 'remove-stock') {
            const embedMessage = await client1.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) - parseInt(interaction.options.getInteger('stock'))).toString()}
            client1.channels.cache.get('929764255203487755').messages.fetch(process.env.C2_MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client1.channels.cache.get("929774715965440070").send(interaction.user.username + ' > remove-stock type: ' + interaction.options.getString('stockage') + " nb + : " + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        }
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client1.login(process.env.C2_CLIENT_TOKEN);


/******************/

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', async () => {
    client.user.setActivity('Travail', { type: 'COMPETING' });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        if (interaction.commandName === 'add-stock') {
            const embedMessage = await client.channels.cache.get('925755087320678460').messages.fetch(process.env.MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('925755087320678460').messages.fetch(process.env.MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client.channels.cache.get("930216477733322763").send(interaction.user.username + ' > add-stock type: ' + interaction.options.getString('stockage') + " nb + :" + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        } else if (interaction.commandName === 'remove-stock') {
            const embedMessage = await client.channels.cache.get('925755087320678460').messages.fetch(process.env.MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) - parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('925755087320678460').messages.fetch(process.env.MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client.channels.cache.get("930216477733322763").send(interaction.user.username + ' > remove-stock type: ' + interaction.options.getString('stockage') + " nb + : " + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        }
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.CLIENT_TOKEN);