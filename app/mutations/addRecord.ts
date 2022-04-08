import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRecord = z.object({
  name: z.string().min(1),
  age: z.number().min(1),
})

export default async function createRecord(input: z.infer<typeof CreateRecord>, _ctx: Ctx) {
  const data = CreateRecord.parse(input)
  const record = await db.blitzAssignment.create({ data })
  return record
}
