import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "../components/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { auth, db } from "../firebase";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";


const PaymentPage = () => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const res = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(res.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const onCHECKOUTItemsLinkClick = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  const onLogoLinkClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignInLinkClick = () => {
    if (user) {
      auth.signOut();
    }
  };

  const onCartLinkClick = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  const handleSubmit = async (event) => {
    // stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payLoad = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        console.log("user is", user);

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "Empty-Basket",
        });

        navigate("/", { replace: true });
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the cardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <main className="paymentpage-main">
      <div className="footer-div1">
        <footer className="footer1">
          <footer className="footer-section1">
            <div className="footer-background-div1" />
            <div className="footer-content-div1">
              <div className="copyright-content-div1">
                <div className="designed-div1">{`Designed By Farhana `}</div>
                <div className="copyright-div1">
                  <span>{` `}</span>
                  <span className="florista-span2">FLORISTA</span>
                </div>
              </div>
              <div className="connect-section-div1">
                <div className="followus-section-div1">
                  <div className="followus-background-div1" />
                  <div className="followus-content-div1">
                    <div className="follow-us-div1">FOLLOW US</div>
                    <a className="a1" href="#">
                          
                    </a>
                  </div>
                </div>
                <div className="connect-content-div2">
                  <div className="connect-background-div1" />
                  <div className="connect-content-div3">
                    <div className="frame-div1">
                      <a className="about-us1" href="#">
                        ABOUT US
                      </a>
                      <a className="contact-us1" href="#">
                        CONTACT US
                      </a>
                      <a
                        className="privacy-policy1"
                        href="#"
                      >{`PRIVACY & POLICY`}</a>
                      <a className="terms-and-conditions1" href="#">
                        TERMS AND CONDITIONS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </footer>
      </div>
      <div className="payment-container-div">
        <div className="payment-header-div">
          <div className="background-div2" />
          <Link
            className="checkout-items-a"
            to="/checkout"
            onClick={onCHECKOUTItemsLinkClick}
          >
            CHECKOUT ({basket?.length})
          </Link>
        </div>
        <div className="payment-background-div" />
        <div className="payment-section-div">
          <div className="payment-section-1-div" />
          <div className="border-div" />
          <div className="payment-section-content-div">
            <b className="payment-section-title-b">Delivery Address</b>
            <div className="payment-section-address-div">
              <p className="xyz-layout-p">{user ? `${user.email}` : `Guest`}</p>
              <p className="xyz-layout-p">#123, XYZ Layout,</p>
              <p className="bangalore-karnataka-">
                Bangalore, Karnataka - 121212
              </p>
            </div>
          </div>
        </div>
        <div className="payment-section-div1">
          <div className="payment-section-3-div" />
          <div className="border-div1" />
          <div className="payment-section-content-div1">
            <form onSubmit={handleSubmit}>
              <div className="payment-details-div">
                <div className="card-details-div">
                  <CardElement onChange={handleChange} />
                </div>
                <button disabled={processing || disabled || succeeded} className="buy-now-button">
                  <div className="button-div10" />
                  <div className="buy-now-div1">{processing ? "Processing" : "Buy Now"}</div>
                </button>
                <CurrencyFormat
                  renderText={(value) => (
                    <b className="order-total-b">Order Total: {value}</b>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹ "}
                />
              </div>
               {/* Errors */}
               {error && <div>{error}</div>}
            </form>

            <b className="payment-section-title-b1">Payment Methods</b>
          </div>
        </div>
        <div className="payment-section-div2">
          <div className="payment-section-2-div" />
          <div className="border-div2" />
          <div className="payment-section-content-div2">
            <div className="checout-items-div">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  checkoutProductName={item.name}
                  checkoutProductImage={item.image}
                  checkoutPrice={item.price}
                  checkoutRating={item.rating}
                />
              ))}
            </div>
            <b className="payment-section-title-b2">Review Items</b>
          </div>
        </div>
      </div>
      <div className="header-div1">
        <nav className="footer1">
          <header className="header-div1">
            <div className="header-bar-div1" />
            <div className="header-content-div1">
              <Link className="logo-a1" to="/" onClick={onLogoLinkClick}>
                <span className="span5">{` `}</span>
                <span className="florista-span2">Florista</span>
              </Link>
              <Link
                className="sign-in-a1"
                to={!user && "/signin"}
                onClick={onSignInLinkClick}
              >
                {user ? `${user.email} - Sign-out` : `Sign-in`}
              </Link>
              <Link className="cart1" to="/checkout" onClick={onCartLinkClick}>
                <span className="span6">{` `}</span>
                <span className="span7">{basket?.length}</span>
              </Link>
            </div>
          </header>
        </nav>
      </div>
    </main>
  );
};

export default PaymentPage;
