const { Schema, model } = require("mongoose")

const PostLikeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    postId: { type: Schema.Types.ObjectId, ref: "posts" },
});

const PostLike = model('postlikes', PostLikeSchema);
module.exports = PostLike