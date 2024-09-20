
const Post = require('../models/post.model');
const PostLike = require('../models/postLike.model');
const PostComment = require('../models/postComment.model')
const { userAuth } = require('../middleware/userAuth')

const { AuthenticationError } = require('apollo-server');
const { createPostValidation, commentOnPostValidation, likeUnlikePostValidation } = require('../validations/post.validation')
module.exports = {

    Query: {
        async getPost(_, { ID }, { token }) {
            try {
                const { user } = await userAuth(token)
                let post = await Post.findOne({ _id: ID })
                if (!post) throw new AuthenticationError('post not found')
                return post

            } catch (error) {
                throw new AuthenticationError(error.message);
            }
        },

        async getPosts(_, { }, { token }) {
            try {
                const { user } = await userAuth(token)
                let aggregation = [
                    {
                        $lookup: {
                            from: "postcomments",
                            let: { postId: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$postId", "$$postId"] } } },
                                {
                                    $lookup: {
                                        from: "postcommentlikes",
                                        let: { postCommentId: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$postCommentId", "$$postCommentId"] } } },
                                        ],
                                        as: "commentLikes"
                                    }
                                },
                                {
                                    $project: {
                                        postId: 1,
                                        comment: 1,
                                        likeCounts: { $size: "$commentLikes" }
                                    }
                                }
                            ],
                            as: "comments"
                        },

                    },
                    {
                        $lookup: {
                            from: "postlikes",
                            let: { postId: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$postId", "$$postId"] } } }
                            ],
                            as: "totalLikes"
                        }
                    },
                    {
                        $project: {
                            image: 1,
                            name: 1,
                            comments: 1,
                            likesCount: { $size: "$totalLikes" },
                            commentsCount: { $size: "$comments" },
                        }
                    }
                ]

                const posts = await Post.aggregate(aggregation)
                return posts

            } catch (error) {
                throw new AuthenticationError(error.message);
            }
        }
    },

    Mutation: {
        async createPost(_, { postInput: { title, name, image } }, { token }) {
            try {
                await createPostValidation({ title, name, image })
                const { user } = await userAuth(token)

                let obj = {
                    name, image, title,
                    userId: user._id
                }
                let post = await Post.create(obj)
                return post

            } catch (error) {
                throw new AuthenticationError(error.message);
            }
        },

        async likeUnlikePost(_, { postInput: { id } }, { token }) {
            try {
                await likeUnlikePostValidation({ id})
                const { user } = await userAuth(token)
                let like = await PostLike.findOne({ postId: id, userId: user._id })
                if (like) {
                    await PostLike.deleteOne({ postId: id, userId: user._id })
                    message = 'unlike post successful'
                    return { message }
                } else {
                    let obj = { postId: id, userId: user._id }
                    let post = await PostLike.create(obj)
                    message = 'like post successful'
                    return post
                }

            } catch (error) {
                console.log('Error creating user:', error.message);
                throw new AuthenticationError('Failed to create user');
            }
        },

        async commentOnPost(_, { postInput: { id, comment } }, { token }) {
            try {
                await commentOnPostValidation({id, comment})
                const { user } = await userAuth(token)
                let obj = { postId: id, comment, userId: user._id }
                let result = await PostComment.create(obj)
                return result

            } catch (error) {
                throw new AuthenticationError(error.message);
            }
        },

    }

}
