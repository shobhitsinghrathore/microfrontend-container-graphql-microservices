import React,{Suspense} from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { StoreProvider, useStore ,ReduxButton} from "store/store";
import "./index.css";

const Header=React.lazy(()=>import("header/Header"))

const Product=React.lazy(()=>import("mfe1/Product"))

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace this with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

const App = () => {

const { count, increment, clear}=useStore()
  
return(
  <div className="container" style={{border:"3px solid red"}}>
    <h1>Container</h1>
    <Suspense fallback={"...loading"}>
    <Header/>
    </Suspense>
    <Suspense fallback={"...loading"}>
    <Product/>
    </Suspense>
<div style={{border:"5px solid black"}}>
  <h1>Footer</h1>
{/* <h6>  { count}</h6> */}
{/* <button onClick={increment}>Add to cart</button> */}

</div>
    </div>
)
};
ReactDOM.render(
  <StoreProvider>

  <ApolloProvider client={client}>
      <Suspense fallback={"...loading"}>
        <App />
      </Suspense>
  </ApolloProvider>
  </StoreProvider>
  ,
  document.getElementById("app")
);
