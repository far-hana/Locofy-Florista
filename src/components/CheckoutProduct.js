import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider";


const CheckoutProduct = ({id,
  checkoutProductImage,
  checkoutRating,
  checkoutProductName,
  checkoutPrice,hideButton,
}) => {

  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "Remove-from-Basket",
      id: id,
    });
  };

  return (
    <div className="checkout-product-section-div1">
      <div className="checkout-product-background-div2" />
      <div className="checkout-product-background-div2" />
      <div className="checkout-product-content-div1">
        <img
          className="checkout-product-image-icon1"
          alt=""
          src={checkoutProductImage}
        />
        <div className="checkout-product-desc-div1">
          <div className="checkout-rating-div1">
            {Array(checkoutRating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}</div>
          <div className="checkout-product-name-div1">
            {checkoutProductName}
          </div>
          <div className="checkout-price-div1">₹ {checkoutPrice}</div>
          <button onClick={removeFromBasket} className="remove-button1">
            <div className="button-div14" />
            <div className="remove-div1">{`Remove `}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
