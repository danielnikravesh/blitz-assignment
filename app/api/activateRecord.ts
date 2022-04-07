import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "../../db"
import * as yup from "yup"

const requestSchema = yup.object({
  id: yup.number().required(),
})

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "PATCH") {
    try {
      await requestSchema.validate(req.body)
      const { id } = req.body
      await db.blitzAssignment.update({
        where: {
          id,
        },
        data: {
          isActive: true,
        },
      })
      res.json({
        success: true,
      })
    } catch (error) {
      console.error(error)
      res.statusCode = 400
      res.json({ error })
    }
  } else {
    res.json({
      status: `Cannot ${req.method}`,
    })
  }
}

export default handler
