import React from 'react';
import gql from 'graphql-tag';
import { useQuery as useApolloQuery, useMutation } from '@apollo/react-hooks';
// import { useStore } from '/store/store';


const GET_PRODUCTS = gql`
  {
    productList {
      _id
      name
      description
      brand
      category
      price
      countInStock
    }
  }
`;


const Product = () => {
  const { loading, error, data } = useApolloQuery(GET_PRODUCTS);
//   const { count, increment, clear } = useStore();

//   const handleAddToCart = () => {
//     increment(); 
// };

  return (
    <div>
      <h2>Product List</h2>
      <div className="product-cards">
        {data && data.productList.map(product => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {/* <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Count in Stock: {product.countInStock}</p> */}
            
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
