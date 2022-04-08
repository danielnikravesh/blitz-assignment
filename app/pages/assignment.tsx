import { useMutation } from "blitz"
import activateRecord from "app/mutations/activateRecord"
import addRecord from "app/mutations/addRecord"
import { Formik, Field, Form, ErrorMessage } from "formik"

export default function Assignment() {
  const [activateRecordMutation] = useMutation(activateRecord)
  const [addRecordMutation] = useMutation(addRecord)

  return (
    <>
      <div>
        Add Record
        <Formik
          initialValues={{
            name: "",
            age: 0,
          }}
          validate={(values) => {
            const errors: any = {}
            if (!values.name) {
              errors.name = "Required"
            }
            if (!values.age) {
              errors.age = "Required"
            }
            return errors
          }}
          onSubmit={async (values) => {
            try {
              const record = await addRecordMutation(values)
              if (record) {
                alert("Record Created!")
              }
            } catch (error) {
              alert("Error saving record")
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Field type="text" name="name" />
                <ErrorMessage name="text" component="div" />
                <Field type="number" name="age" />
                <ErrorMessage name="age" component="div" />
                <button disabled={isSubmitting} type="submit">
                  Create Record
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
      <div>
        Update Record
        <Formik
          initialValues={{
            id: 0,
          }}
          onSubmit={async (values) => {
            try {
              const project = await activateRecordMutation(values)
            } catch (error) {
              alert("Error saving project")
            }
          }}
        >
          <Field />
        </Formik>
      </div>
    </>
  )
}
