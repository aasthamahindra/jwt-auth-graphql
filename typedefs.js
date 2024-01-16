const gql = require('graphql-tag');

const typeDefs = gql`
    type Query {
        dummy: String
    }

    type Mutation {
        login(email: String!, password: String!): Tokens
    }

    type Tokens {
        accessToken: String
        refreshToken: String
    }
`;

module.exports = { typeDefs };
