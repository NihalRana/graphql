
var { v4: uuid } = require('uuid');
const { GraphQLUpload } = require('graphql-upload-minimal')
const { GraphQLError } = require('graphql');
const { createWriteStream } = require('fs')

const imageUpload = (filename, stream) => {
  if (filename == '') return;
  let file_name_string = filename;
  var file_name_array = file_name_string.split(".");
  var file_extension = file_name_array[file_name_array.length - 1];
  let result = uuid();
  let name = result + '.' + file_extension;

  const path = `./public/uploads/${name}`;
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', resolve)
      .on('error', reject)
  );
  return name;
}

module.exports = {

  Upload: require('graphql-upload-minimal').GraphQLUpload,
  Mutation: {
    async singleFileUpload(_, { file }, { req }) {
      try {

        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream();
        const fileName = imageUpload(filename, stream)
        const url = `${req.protocol}://${req.get('host')}/uploads/${fileName}`
        return { url, filename, mimetype, encoding };

      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    async multipleFileUploads(_, { files }, { req }) {
      try {
        const urls = []
        await Promise.all(files.map(async (file) => {
          const { createReadStream, filename } = await file;
          const stream = createReadStream();

          const fileName = await imageUpload(filename, stream)
          const url = `${req.protocol}://${req.get('host')}/uploads/${fileName}`
          urls.push(url)
        }))
        return { message: 'ok', urls };

      } catch (error) {
        throw new GraphQLError(error.message);
      }
    }
  }
}