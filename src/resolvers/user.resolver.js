
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql');
const { AuthenticationError } = require('apollo-server');

const { signupValidation, getUserValidation } = require('../validations/user.validation')

module.exports = {

  Query: {
    async getUser(_, { ID }) {
      console.log(ID);
      await getUserValidation({ID})
      const data = await User.findById(ID)
      if (!data) throw new Error('user not found')
      return data
    }
  },

  Mutation: {
    async signup(_, { userInput: { name, email, password } }) {
      try {
        await signupValidation({name, email, password})
        let user = User.findOne({ email: email })
        if (user) throw new Error('email already exist')

        user = await User.create({ name, email, password })
        const token = jwt.sign({ user }, 'Ditstek1234');
        user.token = token
        return user

      } catch (error) {
        throw new GraphQLError(error.message);
      }
    }
  }
}