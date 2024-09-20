
module.exports = `
type Comment{
    postId: String
    comment: String
}

type Post {
  _id: String
  name: String
  title: String
  image: String
  likesCount: Int
  commentsCount: Int
  comments:[Comment]
}

input PostInput {
  id: String
  name: String
  title: String
  image: String
  comment: String
}

type Query{
    getPost(ID: ID!): Post!
    getPosts: [Post]!
}

type Mutation {
  createPost(postInput: PostInput!): Post!
  likeUnlikePost(postInput: PostInput!): Post!
  commentOnPost(postInput: PostInput!): Post!
}
`