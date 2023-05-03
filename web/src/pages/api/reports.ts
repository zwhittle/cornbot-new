import { NextApiRequest, NextApiResponse } from "next/types";
import { UserReport } from "../types";

export interface ReportsApiData {
    reports: UserReport[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReportsApiData>) {
    let reports_res = await fetch('http://localhost:4000/reports')
    if (reports_res.status != (200 || 201)) {
        console.log('Internal Server Error')
      } else {
        const reports_data = await reports_res.json()
        res.status(200).json({
          reports: reports_data,
        })
      }
}