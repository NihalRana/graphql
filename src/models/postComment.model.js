const { Schema, model } = require("mongoose")

const PostCommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    postId: { type: Schema.Types.ObjectId, ref: "posts" },
    comment: String
});

const PostComment = model('postcomments', PostCommentSchema);
module.exports = PostComment