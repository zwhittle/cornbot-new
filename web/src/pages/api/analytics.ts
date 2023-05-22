import { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../utils'

export interface AnalyticsApiData {
  events: Event[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AnalyticsApiData>) {
  console.log('analytics api request')
  const api_domain = process.env.API_DOMAIN
  const events_res = await fetch(api_domain + '/analytics')
  if (events_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const events_data = await events_res.json()
    res.status(200).json({
      events: events_data,
    })
  }
}
