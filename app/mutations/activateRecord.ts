import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const ActivateRecord = z.object({
  id: z.number().min(1),
})

export default async function activateRecord(input: z.infer<typeof ActivateRecord>, _ctx: Ctx) {
  const { id } = ActivateRecord.parse(input)
  const record = await db.blitzAssignment.update({
    where: {
      id,
    },
    data: {
      isActive: true,
    },
  })
  return record
}
