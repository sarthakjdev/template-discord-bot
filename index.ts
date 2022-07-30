
import { IntentsBitField, Options } from "discord.js"
import Bot from "bot"
import Util from "@utils/util"

const bot = new Bot({
    shards: 'auto',
    restGlobalRateLimit: 50,
    makeCache: Options.cacheWithLimits({
        MessageManager: 1,
    }),
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.GuildMembers],
})

process.on('unhandledRejection', (error) => {
    Util.errorPrint(error, { description: 'Unhandled error' })
})

bot.build().then()
