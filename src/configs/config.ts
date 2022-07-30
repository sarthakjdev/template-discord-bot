
import path from 'path'
import dotenv from 'dotenv'

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
// interface for env file
interface ENV {
    HOME_GUILD_ID: string | undefined
    TOKEN: string | undefined
}

// interface for config object generation
interface Config {
    HOME_GUILD_ID: string
    TOKEN: string
}

// Loading process.env as ENV interface
const getConfig = (): ENV => ({
    HOME_GUILD_ID: process.env.HOME_GUILD_ID,
    TOKEN: process.env.TOKEN,
})

// checking if all the nev are defined if not throw ann error
const getVerifiedConfig = (config: ENV): Config => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }

    return config as Config
}

const config = getConfig()

const verifiedConfig = getVerifiedConfig(config)

export default verifiedConfig

