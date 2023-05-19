import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.path}`)
  const events = await prisma.analyticsEvent.findMany()
  res.json(events)
})

router.get('/:guildId', async (req, res) => {
  console.log(`${req.method}: ${req.path}`)
  const { guildId } = req.params
  const events = await prisma.analyticsEvent.findMany({ where: { guildId: guildId } })
  res.json(events)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { type, eventName, guildId, channelId, memberId } = req.body

  try {
    const newEvent = await prisma.analyticsEvent.create({
      data: {
        type: type,
        event: eventName,
        guildId: guildId,
        channelId: channelId,
        memberId: memberId,
      },
    })

    res.json(newEvent)
  } catch (error) {
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const { type, guildId, channelId, memberId } = req.body

  try {
    const updatedEvent = await prisma.analyticsEvent.update({
      where: { id: Number(id) },
      data: {
        type: type,
        guildId: guildId,
        channelId: channelId,
        memberId: memberId,
      },
    })

    res.json(updatedEvent)
  } catch (error) {
    res.json({ error: `Event Does Not Exist: ${id}` })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const deletedEvent = await prisma.analyticsEvent.delete({
    where: { id: Number(id) },
  })

  res.json(deletedEvent)
})

export default router
