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
                .addChoice('Kit de lavage', 'Kit de lavage'))
        .addIntegerOption(option => option.setName('stock').setRequired(true).setDescription('Entrer un nombre a ajouter')),
    async execute(interaction) {
        let reply = await interaction.reply({ content: 'Ajout dans le stock avec succès !', ephemeral: false });
        await wait(5000);
        await interaction.deleteReply();
        return reply;
    },
};
