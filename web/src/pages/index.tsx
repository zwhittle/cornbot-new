import useSWR from 'swr'
import { fetcher } from './utils'
import { Guild, Member } from './types'

export default function Home() {
  const {
    data: guildsData,
    error: guildsError,
    isLoading: guildsLoading,
  } = useSWR('/api/guilds', fetcher)
  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
  } = useSWR('/api/members', fetcher)

  if (guildsLoading || membersLoading) return <p>Loading...</p>
  if (guildsError || membersError) return <p>Error</p>

  return (
    <main>
      {guildsData.guilds.map((guild: Guild) => (
        <p key={guild.name}>{guild.name}</p>
      ))}

      {membersData.members.map((member: Member) => (
        <p key={member.name}>{member.name}</p>
      ))}
    </main>
  )
}
