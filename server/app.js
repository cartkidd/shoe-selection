const express = require("express");
const { graphqlHTTP } = require('express-graphql');


const schema = require("./schema/schema");


const app = express();

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));


//When our application starts, it will listen on port 4000
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
  });
  