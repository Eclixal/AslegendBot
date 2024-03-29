require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed, GuildMemberManager} = require('discord.js');
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
        id: '910281415017521196',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '910281415017521194',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '910281415017521193',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '910281415017521197',
        type: 'ROLE',
        permission: true,
    },
    {
        id: '910281415017521199',
        type: 'ROLE',
        permission: true,
    }
];

client.on('ready', async () => {
    client.user.setActivity('Travail', { type: 'COMPETING' });
    //
    // let t = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID));
    // for (const tt of t) {
    //     const command = await client.guilds.cache.get(process.env.GUILD_ID)?.commands.fetch(tt.id);
    //     await command.permissions.set({ permissions: perms, command: 926187070207172651 });
    // }

    const stock = new MessageEmbed()
        .setColor('#bbff00')
        .setTitle('Gestion des stocks')
        .addFields(
            {
                "name": `Kit de lavage`,
                "value": `0`
            }
        )
        .setTimestamp()

    const channel = client.channels.cache.get('925755087320678460');
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

    // let guild = await client.guilds.fetch(process.env.GUILD_ID);
    // let role = await guild.roles.fetch(process.env.ROLE);
    //
    // if (role.members.size >= 1) {
    //     const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946');
    //     const embed = embedMessage.embeds[0];
    //     if (embed.title === 'Le mécano est fermé !') {
    //         embed.setTimestamp()
    //         embed.setColor("#0aff00")
    //         embed.setTitle("Le mécano est ouvert !")
    //         embed.setImage("https://media.discordapp.net/attachments/876183553564606494/881841874145525811/Paleto_Repair_Ouvert1.jpg")
    //         client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946').then(message => message.edit({ embeds: [embed] }))
    //         // client.channels.cache.get('876127166490886245').send('<@&876103497643327498>').then(msg => {
    //         //     setTimeout(() => msg.delete(), 500)
    //         // });
    //     }
    // } else if (role.members.size === 0) {
    //     const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946');
    //     const embed = embedMessage.embeds[0];
    //     if (embed.title === 'Le mécano est ouvert !') {
    //         embed.setTimestamp()
    //         embed.setColor("#ff0000")
    //         embed.setTitle("Le mécano est fermé !")
    //         embed.setImage("https://cdn.discordapp.com/attachments/876183553564606494/881841865320726548/Paleto_Repair_Ouvert.jpg")
    //         client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946').then(message => message.edit({ embeds: [embed] }))
    //         // client.channels.cache.get('876127166490886245').send('<@&876103497643327498>').then(msg => {
    //         //     setTimeout(() => msg.delete(), 500)
    //         // });
    //     }
    // }

    console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('guildMemberUpdate', async (oldMember, newMember) => {
//     let guild = await client.guilds.fetch(process.env.GUILD_ID);
//     let role = await guild.roles.fetch(process.env.ROLE);
//     if (role.members.size >= 1) {
//         const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946');
//         const embed = embedMessage.embeds[0];
//         if (embed.title === 'Le mécano est fermé !') {
//             embed.setTimestamp()
//             embed.setColor("#0aff00")
//             embed.setTitle("Le mécano est ouvert !")
//             embed.setImage("https://media.discordapp.net/attachments/876183553564606494/881841874145525811/Paleto_Repair_Ouvert1.jpg")
//             client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946').then(message => message.edit({ embeds: [embed] }))
//             // client.channels.cache.get('876127166490886245').send('<@&876103497643327498>').then(msg => {
//             //     setTimeout(() => msg.delete(), 500)
//             // });
//         }
//     } else if (role.members.size === 0) {
//         const embedMessage = await client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946');
//         const embed = embedMessage.embeds[0];
//         if (embed.title === 'Le mécano est ouvert !') {
//             embed.setTimestamp()
//             embed.setColor("#ff0000")
//             embed.setTitle("Le mécano est fermé !")
//             embed.setImage("https://cdn.discordapp.com/attachments/876183553564606494/881841865320726548/Paleto_Repair_Ouvert.jpg")
//             client.channels.cache.get('876127166490886245').messages.fetch('891335724937379946').then(message => message.edit({ embeds: [embed] }))
//             // client.channels.cache.get('876127166490886245').send('<@&876103497643327498>').then(msg => {
//             //     setTimeout(() => msg.delete(), 500)
//             // });
//         }
//     }
//
// })

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
            client.channels.cache.get("930216477733322763").send(interaction.user.username + ' > add-stock type:' + interaction.options.getString('stockage') + " nb + :" + (parseInt(interaction.options.getInteger('stock'))) + ' - total : ' + (parseInt(embed.fields[pos].value) + parseInt(interaction.options.getInteger('stock'))));
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
