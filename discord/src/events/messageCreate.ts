import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { Message } from 'discord.js'
import { submitReport } from '../utils/commands'
import { UserReport } from '../interfaces/UserReport'
import { badBotResponse, goodBotResponse } from '../utils/utils'

export async function messageCreate(message: Message<boolean>) {
  const content = message.content
  const botId = message.client.user.id
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  if (message.member && message.guild) {
    const guild = await guildsApi.one(message.guild.id)
    const member = await membersApi.one(message.member.user.id)

    if (member.id != botId) {
      if (content.includes('🌽')) {
        message
          .react('🌽')
          .then(value => membersApi.incrementCorns(member.id))
          .catch(console.error)
      }

      if (content.toLowerCase() === 'good bot') {
        message
          .reply(goodBotResponse())
          .then(value => guildsApi.incrementGoodBotCount(guild.id))
          .catch(console.error)
      } else if (content.toLowerCase() === 'bad bot') {
        message
          .reply(badBotResponse())
          .then(value => guildsApi.incrementBadBotCount(guild.id))
          .catch(console.error)
      }

      if (content.includes('@everyone')) {
        const report: UserReport = {
          reportedUserId: member.id,
          reason: '@everyone tagged in a message',
          reportedById: botId,
          guildId: guild.id,
          channelId: message.channel.id,
          userSubmitted: false,
        }

        await submitReport(report, message.client)
      }
    }
  }
}
