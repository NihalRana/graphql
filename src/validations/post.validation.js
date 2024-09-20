
const Joi = require("joi");
const { GraphQLError } = require('graphql');

const createPostValidation = async(data)=>{
    const schema = Joi.object({
        image: Joi.string().required(),
        title: Joi.string().required(),
      });
      
      const result = schema.validate(data);
      
      if (result.error) {
        // Validation failed
        throw new GraphQLError(result.error);
      }
}

const commentOnPostValidation = async(data)=>{
    const schema = Joi.object({
        id: Joi.string().required(),
        comment: Joi.string().required(),
      });
      
      const result = schema.validate(data);
      
      if (result.error) throw new GraphQLError(result.error);
      
}
const likeUnlikePostValidation = async(data)=>{
    const schema = Joi.object({
        id: Joi.string().required(),
      });
      
      const result = schema.validate(data);
      
      if (result.error) throw new GraphQLError(result.error);
      
}
module.exports = {
    createPostValidation, commentOnPostValidation, likeUnlikePostValidation
}