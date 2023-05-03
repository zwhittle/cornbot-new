import { Command } from '../interfaces/Command'
import { corn } from './corn'
import { feedback } from './feedback'
import { report } from './report'
import { info } from './info'
import { birthday } from './birthday'
import { pronouns } from './pronouns'
import { viewShow } from './viewshow'
import { attendShow } from './attendshow'
import { ctxUserInfo } from './ctxUserInfo'

export const CommandList: Command[] = [
  corn,
  feedback,
  report,
  info,
  birthday,
  pronouns,
  viewShow,
  attendShow,
  ctxUserInfo,
]
