
const Joi = require("joi");
const { GraphQLError } = require('graphql');

const signupValidation = async(data)=>{
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      
      const result = schema.validate(data);
      
      if (result.error) {
        // Validation failed
        throw new GraphQLError(result.error);
      }
}

const getUserValidation = async(data)=>{
    console.log(data);
    const schema = Joi.object({
        ID: Joi.string().required(),
      });
      
      const result = schema.validate(data);
      
      if (result.error) {
        console.log(result.error);
        // Validation failed
        throw new GraphQLError(result.error);
      }
}

module.exports = {
    signupValidation, getUserValidation
}