const { model } = require('./models/user.model');
const { setToken } = require('./setToken');

const resolvers = {
    Mutation: {
        login: async (parent, args) => {
            let user = await model.findOne({ email: args.email });
            if (!user) {
                user = new model({
                    email: args.email,
                });
                user.save();
            } 
            return setToken(user._id.toString(), user.email);
        },
    },
};

module.exports = {
    resolvers,
};
