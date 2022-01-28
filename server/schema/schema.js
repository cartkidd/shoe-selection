const graphql = require("graphql"); //use graphql package

const _ = require("lodash");

const shoes = require("../models/shoe");
const owners = require("../models/owner");

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



//Defining CarType with its fields.
const ShoeType = new GraphQLObjectType({
    name: "Shoe",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      model: { type: GraphQLInt },
      company: { type: GraphQLString },
      owner : { 
          type: OwnerType,
          resolve(parent,args){
             return _.find(OwnersArray,{id:parent.ownerId});
          }
      } 
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
      shoes : {  
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
  
  
