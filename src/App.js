import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import PaymentPage from "./pages/PaymentPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LnVB5SCtcEEddXh0oJInKfJDnlgNzzT6dXcT2WHiHUwxKUJNkU0eIu1VlVD653N1sPSNGPagbmfMIwYCqPCfwVF00nA3jNNU1"
);

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // its like dynamic if statement
    // will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is",authUser);

      if (authUser) {
        // user is logged in or user was logged in
        dispatch({
          type: "Set-User",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "Set-User",
          user: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/signin":
        title = "";
        metaDescription = "";
        break;
      case "/payment":
        title = "";
        metaDescription = "";
        break;
      case "/checkout":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/signin" element={<SignInPage />} />

      <Route path="/payment" element={
        <Elements stripe={promise}>
          <PaymentPage />
        </Elements>
      } />

      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
export default App;
