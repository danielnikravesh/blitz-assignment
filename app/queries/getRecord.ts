import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetRecord = z.object({
  id: z.number().min(1),
})

export default async function getRecord(input: z.infer<typeof GetRecord>, _ctx: Ctx) {
  const { id } = GetRecord.parse(input)
  const record = await db.blitzAssignment.findUnique({
    where: {
      id,
    },
  })
  return record
}
