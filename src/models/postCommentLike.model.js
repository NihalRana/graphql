const { Schema, model } = require("mongoose")

const PostCommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    postCommentId: { type: Schema.Types.ObjectId, ref: "postcomments" },
});

const PostCommentLike = model('postcommentlikes', PostCommentSchema);
module.exports = PostCommentLike