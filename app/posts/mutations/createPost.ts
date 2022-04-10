import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePost = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
})

export default resolver.pipe(resolver.zod(CreatePost), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.create({ data: input })

  return post
})
