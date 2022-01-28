const graphql = require("graphql"); //use graphql package

const _ = require("lodash");

/*Getting GraphQLObjectType function from 'graphql' to define the (dataType) 
 structure of our queries and their model type.
*/
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const ShoesArray = [
    { id: "1", name: "Air Force 1", model: "2007", company: "Nike", ownerId: "1" },
    { id: "2", name: "Original Yellow Boot", model: "1973", company: "Timberland", ownerId: "2" },
    { id: "3", name: "Low-Top-Vans", model: "1966", company: "Vans", ownerId: "1" },
    { id: "4", name: "Plain Toe Boot", model: "1928", company: "Cole Haan", ownerId: "2" },
    { id: "5", name: "Mountain Light Boot", model: "1932", company: "Danner", ownerId: "3" },
    { id: "6", name: "Flu Games", model: "1997", company: "Jordan", ownerId: "3" }
  ];

  var OwnersArray = [
    { id: "1", name: "Quinton Prothro", age: 34, gender: "male" },
    { id: "2", name: "Larry ", age: 39, gender: "male" },
    { id: "3", name: "Leslie", age: 27, gender: "female" },
    { id: "4", name: "Mable", age: 41, gender: "female" },
    { id: "5", name: "Jeremy", age: 28, gender: "male" }
  ];
  

//Defining CarType with its fields.
const ShoeType = new GraphQLObjectType({
    name: "Shoe",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      model: { type: GraphQLInt },
      company: { type: GraphQLString },
      owner : { //Supporting pwner query in carType
          type: OwnerType,
          resolve(parent,args){
             return _.find(OwnersArray,{id:parent.ownerId});
          }
      }//owner 
    })
  });
  
  //Defining ShoeType with its fields.
  const OwnerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      gender: { type: GraphQLString },
      cars : {  // Supporting list of shoes query in Owner type
          type : new GraphQLList(ShoeType),
          resolve(parent,args){
              return _.filter(ShoesArray,{ownerId : parent.id});
          }
      }
    })
  });
  
  //Defining RootQuery
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      // Fields here will be the query for frontends
      //We are defining a 'shoe' query which can take (car ID ) to search in DB.
      shoe: {
        type: ShoeType, //Defining model for shoe Query
        args: { id: { type: GraphQLID } }, //args field to extract
        // argument came with car query, e.g : Id of the car object to extract its details.
        resolve(parent, args) {
          //code to get value  from DB
          /**
           * With the help of lodash library(_), we are trying to find car with id from 'CarsArray'
           * and returning its required data to calling tool.
           */
          return _.find(ShoesArray, { id: args.id });
        } //resolve function
      }, //car query ends here
      owner: {
        type: OwnerType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return _.find(OwnersArray, { id: args.id });
        }
      },//owners ends here
      shoes : {
          type : new GraphQLList(ShoeType),
          resolve(parent,args){
              return CarsArray;
          }
      },//cars query
      owners: {
        type: new GraphQLList(OwnerType),
        resolve(parent, args) {
          return owners.find({});
        }
      }
    } //fields end here
  });
  
  //exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  
  
