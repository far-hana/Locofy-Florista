import { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../components/CheckoutProduct";
import "./CheckoutPage.css";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { auth } from "../firebase";


const CheckoutPage = () => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const onProceedToCheckoutButtonClick = useCallback(() => {
    navigate("/payment");
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

  return (
    <main className="checkoutpage-main">
      <div className="footer-div2">
        <footer className="footer2">
          <footer className="footer-section2">
            <div className="footer-background-div2" />
            <div className="footer-content-div2">
              <div className="copyright-content-div2">
                <div className="designed-div2">{`Designed By Farhana `}</div>
                <div className="copyright-div2">
                  <span>{` `}</span>
                  <span className="florista-span4">FLORISTA</span>
                </div>
              </div>
              <div className="connect-section-div2">
                <div className="followus-section-div2">
                  <div className="followus-background-div2" />
                  <div className="followus-content-div2">
                    <div className="follow-us-div2">FOLLOW US</div>
                    <a className="a2" href="#">
                          
                    </a>
                  </div>
                </div>
                <div className="connect-content-div4">
                  <div className="connect-background-div2" />
                  <div className="connect-content-div5">
                    <div className="frame-div2">
                      <a className="about-us2" href="#">
                        ABOUT US
                      </a>
                      <a className="contact-us2" href="#">
                        CONTACT US
                      </a>
                      <a
                        className="privacy-policy2"
                        href="#"
                      >{`PRIVACY & POLICY`}</a>
                      <a className="terms-and-conditions2" href="#">
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
      <div className="checkout-section-div">
        <div className="checkout-background-div" />
        <div className="checkout-right-div">
          <div className="subtotal-section-div">
            <div className="subtotal-background-div" />
            <div className="sub-total-content-div">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <div className="total-amount-div">{value}</div>
                    <div className="sub-total-1-items">
                      Sub-Total ({basket?.length} items)
                    </div>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹ "}
              />
              <button
                className="proceed-to-checkout-button"
                onClick={onProceedToCheckoutButtonClick}
              >
                <div className="button-div12" />
                <div className="proceed-to-checkout">Proceed to Checkout</div>
              </button>
            </div>
          </div>
        </div>
        <div className="checkout-left-div">
          <img className="ad-image-icon" alt="" src="../adimage@2x.png" />
          <div className="checkout-user-div">
            Hello {user ? `${user.email}` : `Guest`}
          </div>
          <div className="checkout-title-div">
            <div className="title-div">Your Shopping Cart</div>
            <div className="border-bottom-div" />
          </div>
          <div className="checkout-items">
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
        </div>
      </div>
      <div className="header-div2">
        <nav className="footer2">
          <header className="header-div2">
            <div className="header-bar-div2" />
            <div className="header-content-div2">
              <Link className="logo-a2" to="/" onClick={onLogoLinkClick}>
                <span className="span8">{` `}</span>
                <span className="florista-span4">Florista</span>
              </Link>
              <Link
                className="sign-in-a2"
                to={!user && "/signin"}
                onClick={onSignInLinkClick}
              >
                {user ? `${user.email} - Sign-out` : `Sign-in`}
              </Link>
              <Link className="cart2" to="/checkout" onClick={onCartLinkClick}>
                <span className="span9">{` `}</span>
                <span className="span10">{basket?.length}</span>
              </Link>
            </div>
          </header>
        </nav>
      </div>
    </main>
  );
};

export default CheckoutPage;
