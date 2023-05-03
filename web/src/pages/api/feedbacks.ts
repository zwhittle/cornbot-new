import { NextApiRequest, NextApiResponse } from "next/types";
import { FeedbackSubmission, UserReport } from "../types";

export interface FeedbackApiData {
    feedback: FeedbackSubmission[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<FeedbackApiData>) {
    let feedback_res = await fetch('http://localhost:4000/feedbacks')
    if (feedback_res.status != (200 || 201)) {
        console.log('Internal Server Error')
      } else {
        const feedback_data = await feedback_res.json()
        res.status(200).json({
          feedback: feedback_data,
        })
      }
}