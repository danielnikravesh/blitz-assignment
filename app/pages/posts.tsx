import Form from "app/core/components/Form"
import { useMutation, useQuery } from "blitz"
import LabeledTextField, { LabeledTextFieldProps } from "app/core/components/LabeledTextField"
import createPost from "app/posts/mutations/createPost"
import React, { Suspense, useEffect, useState } from "react"
import getPosts from "app/posts/queries/getPosts"
import updatePost from "app/posts/mutations/updatePost"
import deletePost from "app/posts/mutations/deletePost"

const FIELDS: LabeledTextFieldProps[] = [
  {
    label: "title",
    name: "title",
    type: "text",
    required: true,
  },
  {
    label: "body",
    name: "body",
    type: "text",
    required: true,
  },
]

const UpdatePost = ({ id, update }) => {
  return (
    <Form
      onSubmit={(values) => {
        return update(values)
      }}
    >
      {FIELDS.map((node, idx) => (
        <LabeledTextField key={node.label + idx + id} {...node} />
      ))}
      <button type="submit">submit</button>
    </Form>
  )
}

const PostList = ({ newAdded, setNewAdded }) => {
  const [posts, { setQueryData, refetch }] = useQuery(getPosts, {})
  const [updatePostMutation] = useMutation(updatePost)
  const [deletePostMutation] = useMutation(deletePost)
  const [id, setId] = useState<number | undefined>()

  useEffect(() => {
    if (newAdded) {
      setNewAdded(false)
      refetch()
    }
  }, [newAdded])
  const update = async (values) => {
    try {
      const post = await updatePostMutation({
        id,
        ...values,
      })
      setQueryData({
        ...posts,
        posts: [post],
      })
      return setId(undefined)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <ol>
        {posts.posts.map(({ body, title, id: postId }) => {
          return (
            <li key={postId}>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
                {!id && (
                  <>
                    <button onClick={() => setId(postId)}>Update</button>
                    <button
                      onClick={async () => {
                        await deletePostMutation({ id: postId })
                        refetch()
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              {id === postId && <UpdatePost update={update} id={postId} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const Posts = () => {
  const [createPostMutation] = useMutation(createPost)
  const [newAdded, setNewAdded] = useState(false)
  return (
    <div>
      <div>
        <h1>CRUD POSTS</h1>
        <div>
          <h2>Create Post</h2>
          <Form
            onSubmit={async (values) => {
              await createPostMutation({ ...values })
              return setNewAdded(true)
            }}
          >
            {FIELDS.map((node, idx) => (
              <LabeledTextField key={node.label + idx} {...node} />
            ))}
            <button type="submit">submit</button>
          </Form>
        </div>
        <div>
          <h2>Get Post</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <PostList setNewAdded={setNewAdded} newAdded={newAdded} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
export default Posts
