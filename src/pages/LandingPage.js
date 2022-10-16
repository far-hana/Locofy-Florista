import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import "./LandingPage.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";


const LandingPage = () => {
  const navigate = useNavigate();
  const [{basket, user}, dispatch] = useStateValue();

  const onSignInLinkClick = () => {
    if (user) {
      auth.signOut();
    }
  };

  const onStoryButtonClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='feature1Container1']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onShopButtonClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='feature1Container']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onLogoLinkClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onCartLinkClick = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  return (
    <main className="landing-page-main">
      <div className="footer-div">
        <footer className="footer">
          <footer className="footer-section">
            <div className="footer-background-div" />
            <div className="footer-content-div">
              <div className="copyright-content-div">
                <div className="designed-div">{`Designed By Farhana `}</div>
                <div className="copyright-div">
                  <span>{` `}</span>
                  <span className="florista-span">FLORISTA</span>
                </div>
              </div>
              <div className="connect-section-div">
                <div className="followus-section-div">
                  <div className="followus-background-div" />
                  <div className="followus-content-div">
                    <div className="follow-us-div">FOLLOW US</div>
                    <a className="a" href="#">
                          
                    </a>
                  </div>
                </div>
                <div className="connect-content-div">
                  <div className="connect-background-div" />
                  <div className="connect-content-div1">
                    <div className="frame-div">
                      <a className="about-us" href="#">
                        ABOUT US
                      </a>
                      <a className="contact-us" href="#">
                        CONTACT US
                      </a>
                      <a
                        className="privacy-policy"
                        href="#"
                      >{`PRIVACY & POLICY`}</a>
                      <a className="terms-and-conditions" href="#">
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
      <section className="all-products-section">
        <div className="all-products-background-div" />
        <div className="all-products-div">
          <div className="all-products-2-div">
            <Product
              id="1"
              rating={4}
              image="../image@2x.png"
              name="Mixed Rose Bouquet"
              price={699}
            />
            <Product
              id="2"
              rating={4}
              image="../image1@2x.png"
              name="Mixed Rose Bouquet"
              price={599}
            />
            <Product
              id="3"
              rating={5}
              image="../image2@2x.png"
              name="Elegant Bouquet"
              price={799}
            />
          </div>
          <div className="all-products-1-div">
            <div
              className="feature-1-div"
              data-scroll-to="feature1Container1"
            ></div>
            <Product
              id="4"
              rating={4}
              image="../image3@2x.png"
              name="Bridal Bouquet"
              price={699}
            />
            <Product
              id="5"
              rating={3}
              image="../image4@2x.png"
              name="Mixed Rose Bouquet"
              price={999}
            />
            <Product
              id="6"
              rating={3}
              image="../image5@2x.png"
              name="Mixed Rose Bouquet"
              price={599}
            />
          </div>
          <h2 className="product-txt-h2">{`All Products `}</h2>
        </div>
      </section>
      <section className="story-section">
        <img className="story-image-icon" alt="" src="../storyimage@2x.png" />
        <div className="story-content-div">
          <div className="story-caption-div">
            <h2 className="product-name-h2">BRIDAL BOUQUET</h2>
            <p className="product-description">
              The wait is over. A beautiful rose bouquet for your wedding day.
            </p>
            <div className="price-rating-div">
              <p className="rating-p6">⭐⭐⭐⭐⭐</p>
              <p className="price6">₹ 699</p>
            </div>
          </div>
          <button className="story-button" onClick={onStoryButtonClick}>
            <div className="button-div6" />
            <div className="buy-now-div">Buy Now</div>
          </button>
        </div>
      </section>
      <section className="feature-section">
        <div className="feature-div">
          <div className="feature-products-div">
            <Product
              id="7"
              rating={3}
              image="../image6@2x.png"
              name="Mixed Rose Bouquet"
              price={599}
            />
            <div
              className="feature-1-div2"
              data-scroll-to="feature1Container"
            ></div>
            <Product
              id="8"
              rating={4}
              image="../image7@2x.png"
              name="White Rose Bouquet"
              price={899}
            />
            <Product
              id="9"
              rating={3}
              image="../image8@2x.png"
              name="Sunflower Bouquet"
              price={599}
            />
          </div>
          <h2 className="feature-txt-h2">{`TRENDING `}</h2>
        </div>
      </section>
      <section className="hero-section">
        <div className="background-div" />
        <div className="hero-content-div">
          <div className="product-info-div">
            <img
              className="product-image-icon"
              alt=""
              src="../productimage@2x.png"
            />
            <div className="product-caption-div">
              <h2 className="product-name-h21">WHITE ROSE BOUQUET</h2>
              <p className="product-description1">
                The wait is over. A beautiful white rose bouquet to decorate
                your interior or to present your loved ones.
              </p>
            </div>
          </div>
          <div className="product-specs-shop-div">
            <div className="specification-bar-div" />
            <div className="product-specification-div">
              <p className="rating-p9">
                <span>
                  <b>RATING</b>
                  <span className="span">{` `}</span>
                </span>
                <span className="span">
                  <span>⭐⭐⭐⭐</span>
                </span>
              </p>
              <p className="price9">
                <b>{`PRICE `}</b>
                <span>₹ 899</span>
              </p>
              <p className="brand-p">
                <b>BRAND</b>
                <span> FLORISTA</span>
              </p>
            </div>
            <button className="shop-button" onClick={onShopButtonClick}>
              <div className="button-div9" />
              <span className="shop-now-span">SHOP NOW</span>
            </button>
          </div>
        </div>
      </section>
      <div className="header-div">
        <nav className="footer">
          <header className="header">
            <div className="header-bar-div" />
            <div className="header-content-div">
              <Link className="logo-a" to="/" onClick={onLogoLinkClick}>
                <span className="span2">{` `}</span>
                <span className="florista-span">Florista</span>
              </Link>
              <Link
                className="sign-in-a"
                
                to={!user && "/signin"}
                onClick={onSignInLinkClick}
              >
                {user? `${user.email} - Sign-out` : `Sign-in`}
              </Link>
              <Link className="cart" to="/checkout" onClick={onCartLinkClick}>
                <span className="span3">{` `}</span>
                <span className="span4">{basket?.length}</span>
              </Link>
            </div>
          </header>
        </nav>
      </div>
    </main>
  ); 
};

export default LandingPage;
