import { NextApiRequest, NextApiResponse } from 'next'
import { Guild } from '../types'

export interface GuildsApiData {
  guilds: Guild[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GuildsApiData>) {
  let guilds_res = await fetch('http://localhost:4000/guilds')
  if (guilds_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const guilds_data = await guilds_res.json()
    res.status(200).json({
      guilds: guilds_data,
    })
  }
}
