
module.exports = `
scalar Upload

type File {
  url: String!
  mimetype: String!
  encoding: String!
}

type Files {
  urls: [String]!
  message: String!
}

type Mutation {
  singleFileUpload(file: Upload!): File!
  multipleFileUploads(files: [Upload]!): Files!
}
`