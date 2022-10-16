import "./Product.css";
import React from "react";
import { useStateValue } from "../StateProvider";


const Product = ({ id, rating, image, name, price }) => {
  const [{basket}, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the items to the data layer
    dispatch({
      type: "Add-to-Basket",
      item: {
        id: id,
        name: name,
        price: price,
        rating: rating,
        image: image,
      },
    });
  };
  return (
    <div className="feature-1-div16">
      <div className="feature-1-div17" />
      <div className="f1-content-button-div8">
        <div className="f1-content-div8">
        {/* {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))} */}
          <p className="rating">{Array(rating)
            .fill()
            .map((_, i) => (
              <p className="rating-p10">⭐</p>
            ))} </p>
          <img className="image-icon8" alt="" src={image} />
          <p className="name-p8">{name}</p>
          <p className="price10">₹ {price}</p>
        </div>
        <button onClick={addToBasket} className="add-to-cart-button8">
          <div className="button-div13" />
          <div className="add-to-cart8">Add to Cart</div>
        </button>
      </div>
    </div>
  );
};

export default Product;
