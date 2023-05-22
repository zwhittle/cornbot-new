import { Card, Title, Text, Tab, TabList, Grid } from '@tremor/react'
import useSWR from 'swr'
import { useState } from 'react'
import { AnalyticsApiData } from './api/analytics'
import { AnalyticsEvent } from './types'
import { fetcher } from './utils'

export default function Home() {
  const [selectedView, setSelectedView] = useState('1')
  const { data, error, isLoading } = useSWR('/api/analytics', fetcher)

  if (error) return <p>Error: {error}</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <main>
      <Title>Cornbot</Title>

      {data &&
        data.events.map((event: AnalyticsEvent) => (
          <div key={event.id}>
            <Text>{event.event}</Text>
            <Text>{event.type}</Text>
          </div>
        ))}

      <TabList defaultValue='1' onValueChange={value => setSelectedView(value)} className='mt-6'>
        <Tab value='1' text='Page 1' />
        <Tab value='2' text='Page 2' />
      </TabList>

      {selectedView === '1' ? (
        <>
          <Grid numColsMd={2} numColsLg={3} className='gap-6 mt-6'>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
          </Grid>

          <div className='mt-6'>
            <Card>
              <div className='h-80' />
            </Card>
          </div>
        </>
      ) : (
        <div className='mt-6'>
          <Card>
            <div className='h-96' />
          </Card>
        </div>
      )}
    </main>
  )
}
