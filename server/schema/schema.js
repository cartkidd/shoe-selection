const graphql = require("graphql"); //use graphql package

/*Getting GraphQLObjectType function from 'graphql' to define the (dataType) 
 structure of our queries and their model type.
*/
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const CarsArray = [
    { id: "1", name: "Air Force 1", model: "2007", company: "Nike" },
    { id: "2", name: "Original Yellow Boot", model: "1973", company: "Timberland" },
    { id: "3", name: "Low-Top-Vans", model: "1966", company: "Vans" },
    { id: "4", name: "Plain Toe Boot", model: "1928", company: "Cole Haan" },
    { id: "5", name: "Mountain Light Boot", model: "1932", company: "Danner" },
    { id: "6", name: "Flu Games", model: "1997", company: "Jordan" }
  ];
  

//Defining ShoeType with its fields.
const ShoeType = new GraphQLObjectType({
  name: "Shoe",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    model: { type: GraphQLInt },
    company: { type: GraphQLString }
  })
});

//Defining RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Fields here will be the query for frontends
    //We are defining a 'car' query which can take (car ID ) to search in DB.
    shoe: {
      type: ShoeType, //Defining model for car Query
      args: { id: { type: GraphQLID } },  //args field to extract argument came with car query, e.g : Id of the car object to extract its details.
      resolve(parent, args) {


        return _.find(ShoesArray, { id: args.id });
        


    } //resolve function
  } //car query ends here
} //fields end here
});

//exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
query: RootQuery
});


