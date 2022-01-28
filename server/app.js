const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose")


const schema = require("./schema/schema");


const app = express();

mongoose.connect(
    "mongodb://test:test123@ds145434.mlab.com:45434/gql-practice",
    { useNewUrlParser: true },
    () => {
      console.log("Connect with DB successfully.");
    }
  );

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  );


//When our application starts, it will listen on port 4000
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
  });
  