const {
  selectExpenses,
  selectExpenseItems,
  createImage,
  addExpense,
  addExpenseItem,
  selectImage,
  deleteExpenseHandler
} = require("../../model/expenseModel");
const { token, check } = require("../../settings/jwt");
const { GraphQLUpload } = require("graphql-upload");
const moment = require('moment')
const resolvers = {
  Query: {
    expenses: async (_,{}, {token}) =>
    {
      const isUser = check(token)
      const row = await selectExpenses(isUser&&isUser.id)
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
    cost: ( item ) => item.cost,
    date: ( item ) =>{
      let date = moment(item.buyed_at).format("MMM Do YY")
   
      return date
    },
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
        const row = await addExpense( name, image, isUser && isUser.id )
        console.log(row)
        return {
          ...row,
          path: (await selectImage(row.image_id)).path
        }
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
    deleteExpense: async ( _, { expenseId } ) =>
    {
      const res = await deleteExpenseHandler( expenseId )
      console.log( res )
      return res
    },
  },
};

module.exports = {
  resolvers,
};
