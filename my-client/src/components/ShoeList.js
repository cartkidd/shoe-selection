import React from "react";
import { graphql } from "react-apollo";
import getShoesQuery from "./../queries/queries";

const ShoeList = props => {
  console.log(props);

  const displayShoes = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Shoes...</div>;
    } else {
      return data.shoes.map(shoe => {
        return <li key={shoe.id}>{shoe.name}</li>;
      });
    }
  };

  return (
    <>
      <ul id="ShoeList">{displayShoes()}</ul>
    </>
  );
};

export default graphql(getShoesQuery)(ShoeList);

