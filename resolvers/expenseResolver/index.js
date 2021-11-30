const {
  selectExpenses,
  selectExpenseItems,
  createImage,
  addExpense
} = require("../../model/expenseModel");
const { token, check } = require("../../settings/jwt");
const { promises } = require("stream");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Query: {
    expenses: () => selectExpenses(),
    expenseItems: () => selectExpenseItems(),
  },
  Upload: GraphQLUpload,
  Expense: {
    id: (expense) => expense.expense_id,
    name: (expense) => expense.expense_name,
    image: (expense) => expense.image_id,
    items: (expense) => selectExpenseItems(expense.expense_id),
  },
  ExpenseItem: {
    id: (item) => item.expense_item_id,
    item: (item) => item.item_name,
    cost: (item) => item.cost,
    date: (item) => item.buyed_at,
  },

  Mutation: {
    imageUpload: async (_, { file }) => {
      require("fs").mkdir("images", { recursive: true }, (err) => {
        // if (err) throw new ApolloError(err.message);
      });
      const { createReadStream, filename } = await file;
      const stream = createReadStream();

      const id = Date.now();
      const path = `images/${id}-${filename}`;
      const out = require("fs").createWriteStream(path);
      stream.pipe( out );

      const row = await createImage( path )
      
      console.log(row)
      return { id: row.image_id,filename:path};
    },
    addExpense: async (_, { name, image }, token) => {
      try
      {
        console.log(token)
        const isUser = check( token )
        console.log(isUser)
        // if ( isUser )
        // {
          const row = await addExpense( name, image )
          console.log(row)
          return row
        // }
        
      }
      catch ( err )
      {
        console.log(err)
      }
    },
    deleteUser: async (id) => {},
  },
};

module.exports = {
  resolvers,
};
