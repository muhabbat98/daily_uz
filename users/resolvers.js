const {books } = require("./module")

const resolvers = {
  Query: {
    books: () => books,
  },
};

module.exports = {
    resolvers
}