import { Client } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { AnalyticsAPI } from 'src/api/AnalyticsAPI'

export const ready = async (BOT: Client) => {
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  const connectedGuilds = BOT.guilds.cache

  new AnalyticsAPI()
      .create({
        type: 'event',
        event: 'ready',
      })
      .then(() => console.log(`Event logged`))

  console.log('Syncing Guilds...')
  guildsApi.sync(connectedGuilds)

  connectedGuilds.map(async connGuild => {
    await connGuild.members.fetch().then(members => {
      console.log(`Syncing ${connGuild.name} Members...`)
      membersApi.sync(members)
    })
  })
}
