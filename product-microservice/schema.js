const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const Product = require('./model');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    brand: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLInt },
    countInStock: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    productList: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        countInStock: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const newProduct = new Product({
          name: args.name,
          description: args.description,
          brand: args.brand,
          category: args.category,
          price: args.price,
          countInStock: args.countInStock,
        });
        return newProduct.save();
      },
    },
    updateProduct: {
        type: ProductType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          brand: { type: GraphQLString },
          category: { type: GraphQLString },
          price: { type: GraphQLInt },
          countInStock: { type: GraphQLInt },
        },
        resolve(parent, args) {
          const { id, ...updateData } = args;
      
          
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid Product ID');
          }
      
          
          return Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        },
      },      
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Product.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
