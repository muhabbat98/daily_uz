const {
  selectExpenses,
  selectExpenseItems,
  createImage,
  addExpense,
  addExpenseItem
} = require("../../model/expenseModel");
const { token, check } = require("../../settings/jwt");
const { promises } = require("stream");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Query: {
    expenses: async () =>
    {
      const row = await selectExpenses()
      console.log( row )
      return row
    } ,
    expenseItems: ( _,{id} ) => selectExpenseItems( id ),
  },
  Upload: GraphQLUpload,
  Expense: {
    id: (expense) => expense.expense_id,
    name: (expense) => expense.expense_name,
    image: (expense) => expense.path,
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
      
      // console.log(row)
      return { id: row.image_id,filename:path};
    },
    addExpense: async (_, { name, image }, {token}) => {
      try
      {
        const isUser = check( token )
        const row = await addExpense( name, image, isUser&&isUser.id )
        return row
      }
      catch ( err )
      {
        console.log(err)
      }
    },
    addExpenseItem: async (_, {expenseId, item, cost, date},{token}) =>{
      try
      {
        const isUser = check( token )
        const row = await addExpenseItem(expenseId, item, cost, date )
        return row
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
