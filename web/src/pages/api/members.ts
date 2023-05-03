import { NextApiRequest, NextApiResponse } from 'next'
import { Guild, Member } from '../types'

export interface MembersApiData {
  members: Member[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MembersApiData>) {
  let members_res = await fetch('http://localhost:4000/members')
  if (members_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const members_data = await members_res.json()
    res.status(200).json({
      members: members_data,
    })
  }
}
