import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "../../db"
import * as yup from "yup"

const requestSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
})

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "POST") {
    try {
      const record = req.body
      await requestSchema.validate(record)
      const { name, age } = record
      await db.blitzAssignment.create({
        data: {
          name,
          age,
        },
      })
      res.json({
        success: true,
      })
    } catch (error) {
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
