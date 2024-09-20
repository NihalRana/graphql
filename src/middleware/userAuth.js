const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");

const { AuthenticationError } = require('apollo-server');
const { GraphQLError } = require('graphql');

const implementAuthChecks = (user, accessToken) => {
    if (!user) {
        throw new Error("No user found");
    }
    // if (user.token !== accessToken) {
    //     throw new Error("Unauthenticated acces token");
    // }
};


const userAuth = async (token) => {
    try {
        if(!token) throw new AuthenticationError('invalid token')
       let decode = jwt.verify(token,'Ditstek1234');
        const user = await Users.findOne(
            {
                _id: decode?.user._id,
            },
        );
        await implementAuthChecks(user, token);

        return { user }
    } catch (error) {
        console.log(error.message);
        return new GraphQLError(error.message);
    }
};

module.exports = { userAuth };