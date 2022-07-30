import { EmbedBuilder } from "discord.js"
import Util from "src/utils/util"

export default class Components {
    // success component:
    static successEmbed(message) {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:R_verify:915678098782052363> **${message}**`)

        return {
            embeds: [embed],
        }
    }

    // error component:
    static errorEmbed(message) {
        return Util.embed().setDescription(`<:R_cross:915678807367757824> **${message}**`)
    }

}

