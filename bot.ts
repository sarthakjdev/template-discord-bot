/* eslint-disable global-require,import/no-dynamic-require */
const { Client, Collection } = require('discord.js')
import { readdirSync } from "fs"
import path from "path"
import commandsDefinition from "commandsDefinition"
import Factory from '@factory/factory'
import Util from "src/utils/util"
import configs from '@configs/config'
import logger from "src/utils/logger"

export default class extends Client {
    constructor(opts) {
        super(opts)
        this.commands = new Collection()
        this.slashCommands = new Collection()
        this.factory = new Factory(this)
        this.config = process.env
        this.util = Util
    }

    async build() {
        this.loadSlashCommands()
        this.loadEventListeners()
        await this.login(configs.TOKEN)
        if (process.env.HOME_GUILD_ID) {
        await (await this.guilds.fetch(process.env.HOME_GUILD_ID)).commands.set(commandsDefinition)
        } else {
        await this.application.fetch()
        await this.application.commands.set(commandsDefinition)
        }
    }

    loadSlashCommands() {
        const commands = readdirSync(path.join(__dirname, 'src/commands'))
        // eslint-disable-next-line no-restricted-syntax
        for (const commandFolder of commands) {
            const command = require(`./src/commands/${commandFolder}/index`)
            this.slashCommands.set(command.name, command)
        }
    }

     loadEventListeners() {
        let eventHandler;
        const eventFiles = readdirSync(`${__dirname}/dist/src/events/`)
            eventFiles.map((file) => {
                 eventHandler = require(`${__dirname}/dist/src/events/${file}`)
                this.on(file.split('.js')[0], eventHandler.default)
                // event.bind(null, this)
            })
    }
}
