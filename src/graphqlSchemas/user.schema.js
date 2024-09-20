
module.exports  = `
type User {
  name: String
  email: String
  password: String
  token: String
}

input UserInput {
  name: String
  email: String
  password: String
}

type Query {
  getUser(ID: ID): User!
}

type Mutation {
  signup(userInput: UserInput!): User!
}
`