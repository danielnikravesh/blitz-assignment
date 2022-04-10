import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePost = z.object({
  id: z.number(),
  title: z.string().min(1),
  body: z.string().min(1),
})

export default resolver.pipe(resolver.zod(UpdatePost), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.update({ where: { id }, data })

  return post
})
