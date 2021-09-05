const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-stock')
        .setDescription('Ajouter des éléments dans le stock')
        .setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('stockage')
                .setDescription('Le type de stockage a modifier')
                .setRequired(true)
                .addChoice('Roue de secours', 'roue')
                .addChoice('Trousse à outils', 'trousse')
                .addChoice('Bidon d\'essence', 'bidon')
                .addChoice('Moteur', 'moteur')
                .addChoice('Bombe de peinture', 'bombe')
                .addChoice('Liqueur de Stricker', 'liqueur')
                .addChoice('Boisson', 'boisson')
                .addChoice('Nourriture', 'nourriture'))
        .addIntegerOption(option => option.setName('stock').setRequired(true).setDescription('Entrer un nombre a ajouter')),
    async execute(interaction) {
        console.log(interaction.options)
        let reply = await interaction.reply({ content: 'Coucou', ephemeral: false });
        await wait(5000);
        await interaction.deleteReply();
        return reply;
    },
};
