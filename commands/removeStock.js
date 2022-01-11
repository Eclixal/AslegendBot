const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-stock')
        .setDescription('Supprimer des éléments dans le stock')
        .setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('stockage')
                .setDescription('Le type de stockage a modifier')
                .setRequired(true)
                .addChoice('Moteur', 'Moteur')
                .addChoice('Roue de secours', 'Roue de secours')
                .addChoice('Trousse à outils', 'Trousse à outils')
                .addChoice('Liqueur', 'Liqueur'))
        .addIntegerOption(option => option.setName('stock').setRequired(true).setDescription('Entrer un nombre a enlever')),
    async execute(interaction) {
        console.log(interaction.options)
        let reply = await interaction.reply({ content: 'Reduction du stock avec succès !', ephemeral: false });
        await wait(5000);
        await interaction.deleteReply();
        return reply;
    },
};
