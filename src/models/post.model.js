const { Schema, model } = require("mongoose")

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    title: String,
    name: String,
    image: String
});

const Post = model('posts', PostSchema);
module.exports = Post