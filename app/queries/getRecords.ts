import { Ctx } from "blitz"
import db from "db"

export default async function getRecords(_: any, _ctx: Ctx) {
  const records = await db.blitzAssignment.findMany()
  return records
}
