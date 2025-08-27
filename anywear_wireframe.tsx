import React, { useState } from "react";
import Navigation from "./src/components/Navigation";
import Footer from "./src/components/Footer";
import SiteMap from "./src/components/SiteMap";
import ChatSupport from "./src/components/ChatSupport";
import HomePage from "./src/views/HomePage";
import CollectionPage from "./src/views/CollectionPage";
import AllProductsPage from "./src/views/AllProductsPage";
import ProductPage from "./src/views/ProductPage";
import CartPage from "./src/views/CartPage";
import LoginPage from "./src/views/LoginPage";
import CheckoutPage from "./src/views/CheckoutPage";
import OrderConfirmationPage from "./src/views/OrderConfirmationPage";
import AccountPage from "./src/views/AccountPage";
import AboutPage from "./src/views/AboutPage";

const products = [
  {
    id: 1,
    name: "Product Name 1",
    collection: "tribal",
    category: "pants",
    price: "299 PLN",
    image: "/api/placeholder/200/250",
  },
  {
    id: 2,
    name: "Product Name 2",
    collection: "tribal",
    category: "hoodie",
    price: "399 PLN",
    image: "/api/placeholder/200/250",
  },
  {
    id: 3,
    name: "Product Name 3",
    collection: "corduroy",
    category: "pants",
    price: "329 PLN",
    image: "/api/placeholder/200/250",
  },
  {
    id: 4,
    name: "Product Name 4",
    collection: "velvet",
    category: "tshirt",
    price: "199 PLN",
    image: "/api/placeholder/200/250",
  },
];

const Wireframe = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [checkoutAsGuest, setCheckoutAsGuest] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        cart={cart}
      />

      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "tribal" && (
        <CollectionPage
          collection="tribal"
          products={products}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "corduroy" && (
        <CollectionPage
          collection="corduroy"
          products={products}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "velvet" && (
        <CollectionPage
          collection="velvet"
          products={products}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "plaid" && (
        <CollectionPage
          collection="plaid"
          products={products}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "all-products" && (
        <AllProductsPage products={products} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "product" && (
        <ProductPage cart={cart} setCart={setCart} />
      )}
      {currentPage === "cart" && (
        <CartPage
          cart={cart}
          setCurrentPage={setCurrentPage}
          setCart={setCart}
        />
      )}
      {currentPage === "login" && (
        <LoginPage
          setUser={setUser}
          setCurrentPage={setCurrentPage}
          cart={cart}
        />
      )}
      {currentPage === "checkout" && (
        <CheckoutPage
          user={user}
          cart={cart}
          setCurrentPage={setCurrentPage}
          checkoutAsGuest={checkoutAsGuest}
          setCheckoutAsGuest={setCheckoutAsGuest}
        />
      )}
      {currentPage === "order-confirmation" && (
        <OrderConfirmationPage
          cart={cart}
          user={user}
          setCurrentPage={setCurrentPage}
          setCart={setCart}
        />
      )}
      {currentPage === "account" && (
        <AccountPage
          user={user}
          setUser={setUser}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === "about" && <AboutPage />}
      {currentPage === "sitemap" && <SiteMap setCurrentPage={setCurrentPage} />}

      <Footer />

      {/* Chat Support Component - dostępny tylko dla zalogowanych użytkowników */}
      {user && <ChatSupport user={user} />}

      {/* Dev Navigation Helper */}
      <div className="fixed top-12 z-50 right-4 bg-black text-white p-2 rounded text-xs">
        <div className="mb-2 font-bold">WIREFRAME NAV:</div>
        <button
          onClick={() => setCurrentPage("home")}
          className="block hover:underline"
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage("tribal")}
          className="block hover:underline"
        >
          Collection
        </button>
        <button
          onClick={() => setCurrentPage("all-products")}
          className="block hover:underline"
        >
          All Products
        </button>
        <button
          onClick={() => setCurrentPage("product")}
          className="block hover:underline"
        >
          Product Page
        </button>
        <button
          onClick={() => setCurrentPage("cart")}
          className="block hover:underline"
        >
          Cart
        </button>
        <button
          onClick={() => setCurrentPage("login")}
          className="block hover:underline"
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage("checkout")}
          className="block hover:underline"
        >
          Checkout
        </button>
        <button
          onClick={() => setCurrentPage("account")}
          className="block hover:underline"
        >
          Account
        </button>
        <button
          onClick={() => setCurrentPage("about")}
          className="block hover:underline"
        >
          About
        </button>
        <button
          onClick={() => setCurrentPage("sitemap")}
          className="block hover:underline"
        >
          Site Map
        </button>
        <hr className="my-2" />
        <div className="text-xs">Cart: {cart.length} items</div>
        <div className="text-xs">User: {user ? user.name : "Guest"}</div>
      </div>
    </div>
  );
};

export default Wireframe;
