/**
 * ping command of the rejoice bot
 */

import Components from "@structures/components"

const PingHandler = {
    name: 'ping',
    exec: async (interaction) => {
        const { client } = interaction
        await interaction.deferReply()

        const embed = Components.successEmbed(`Ping Pong Pung :${client.ws.ping}ms `)
        await interaction.editReply(embed)
    },
}

export = PingHandler

