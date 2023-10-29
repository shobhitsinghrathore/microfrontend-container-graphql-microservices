const express = require('express');
var cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

const app = express();
app.use(cors())
// Middleware setup
app.use(express.json()); // Assuming you want to parse JSON requests

const mongoConnectionString =
  'mongodb+srv://shobhitkr0309:Incedo%402023@cluster0.kzvvefh.mongodb.net/graphql?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });
  

  // GraphQL middleware setup
  const graphqlMiddleware = graphqlHTTP({
    schema,
    graphiql: true,
  });

  app.use('/graphql', graphqlMiddleware);

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`GraphQL Server running on port ${PORT}`);
  });
});
