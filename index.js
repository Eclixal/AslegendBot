require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed, GuildMemberManager} = require('discord.js');
const fs = require('fs');
const {Routes} = require("discord-api-types/v9");
const {REST} = require("@discordjs/rest");
const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

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

    // const stock = new MessageEmbed()
    //     .setColor('#bbff00')
    //     .setTitle('Gestion des stocks')
    //     .addFields(
    //         {
    //             "name": `Roue de secours`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Trousse à outils`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Bidon d'essence`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Moteur`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Bombe de peinture`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Liqueur de Stricker`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Boisson`,
    //             "value": `0`
    //         },
    //         {
    //             "name": `Nourriture`,
    //             "value": `0`
    //         }
    //     )
    //     .setTimestamp()

    const channel = client.channels.cache.get('876110522037194812');
    // channel.send({ embeds: [stock] });

    // Open / close

    // const open = new MessageEmbed()
    //     .setColor('#0aff00')
    //     .setTitle('Le mécano est ouvert !')
    //     .setImage("https://media.discordapp.net/attachments/876183553564606494/881841874145525811/Paleto_Repair_Ouvert1.jpg")
    //     .setTimestamp()
    //
    // const close = new MessageEmbed()
    //     .setColor('#ff0000')
    //     .setTitle('Le mécano est fermé !')
    //     .setImage("https://cdn.discordapp.com/attachments/876183553564606494/881841865320726548/Paleto_Repair_Ouvert.jpg")
    //     .setTimestamp()
    //
    // const openCloseChannel = client.channels.cache.get('876127166490886245');
    // openCloseChannel.send({ embeds: [open] });
    // openCloseChannel.send({ embeds: [close] });

    console.log((await (await client.guilds.fetch(process.env.GUILD_ID)).roles.fetch(process.env.ROLE)).members)

    if (await client.guilds.cache.get(process.env.GUILD_ID)?.roles.cache.get(process.env.ROLE)?.members.size >= 1) {
        const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788');
        const embed = embedMessage.embeds[0];
        if (embed.title === 'Le mécano est fermé !') {
            embed.setTimestamp()
            embed.setColor("#0aff00")
            embed.setTitle("Le mécano est ouvert !")
            embed.setImage("https://media.discordapp.net/attachments/876183553564606494/881841874145525811/Paleto_Repair_Ouvert1.jpg")
            client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788').then(message => message.edit({ embeds: [embed] }))
        }
    } else if (await client.guilds.cache.get(process.env.GUILD_ID)?.roles.cache.get(process.env.ROLE)?.members.size === 0) {
        const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788');
        const embed = embedMessage.embeds[0];
        if (embed.title === 'Le mécano est fermé !') {
            embed.setTimestamp()
            embed.setColor("#ff0000")
            embed.setTitle("Le mécano est ouvert !")
            embed.setImage("https://cdn.discordapp.com/attachments/876183553564606494/881841865320726548/Paleto_Repair_Ouvert.jpg")
            client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788').then(message => message.edit({ embeds: [embed] }))
        }
    }

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (await client.guilds.cache.get(process.env.GUILD_ID)?.roles.cache.get(process.env.ROLE)?.members.size >= 1) {
        const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788');
        const embed = embedMessage.embeds[0];
        if (embed.title === 'Le mécano est fermé !') {
            embed.setTimestamp()
            embed.setColor("#0aff00")
            embed.setTitle("Le mécano est ouvert !")
            embed.setImage("https://media.discordapp.net/attachments/876183553564606494/881841874145525811/Paleto_Repair_Ouvert1.jpg")
            client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788').then(message => message.edit({ embeds: [embed] }))
        }
    } else if (await client.guilds.cache.get(process.env.GUILD_ID)?.roles.cache.get(process.env.ROLE)?.members.size === 0) {
        const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788');
        const embed = embedMessage.embeds[0];
        if (embed.title === 'Le mécano est fermé !') {
            embed.setTimestamp()
            embed.setColor("#ff0000")
            embed.setTitle("Le mécano est ouvert !")
            embed.setImage("https://cdn.discordapp.com/attachments/876183553564606494/881841865320726548/Paleto_Repair_Ouvert.jpg")
            client.channels.cache.get('876127166490886245').messages.fetch('888472282287177788').then(message => message.edit({ embeds: [embed] }))
        }
    }

})

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
            client.channels.cache.get("888402115540680716").send(interaction.user.username + ' > add-stock type:' + interaction.options.getString('stockage') + " nb + :" + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        } else if (interaction.commandName === 'remove-stock') {
            const embedMessage = await client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE);
            const embed = embedMessage.embeds[0];
            embed.setTimestamp()
            let pos = (embed.fields.findIndex(t => t.name === interaction.options.getString('stockage')))
            embed.fields[pos] = { name: interaction.options.getString('stockage'), value: (parseInt(embed.fields[pos].value) - parseInt(interaction.options.getInteger('stock'))).toString()}
            client.channels.cache.get('876110522037194812').messages.fetch(process.env.MESSAGE).then(message => message.edit({ embeds: [embed] }))
            client.channels.cache.get("888402115540680716").send(interaction.user.username + ' > remove-stock type: ' + interaction.options.getString('stockage') + " nb + : " + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
        }
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.CLIENT_TOKEN);
