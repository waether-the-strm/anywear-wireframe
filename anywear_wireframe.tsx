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
  const [showWireframeNav, setShowWireframeNav] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        cart={cart}
        toggleWireframeNav={() => setShowWireframeNav(!showWireframeNav)}
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
      {showWireframeNav && (
        <div className="fixed top-12 z-50 right-4 bg-black text-white p-4 rounded text-xs">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold text-sm">WIREFRAME NAV:</div>
            <button 
              onClick={() => setShowWireframeNav(false)} 
              className="text-white hover:text-red-400"
              aria-label="Close wireframe navigation"
            >
              ✕
            </button>
          </div>
          <div className="font-medium mb-2">Current: <span className="text-yellow-300">{currentPage}</span></div>
          <button
            onClick={() => setCurrentPage("home")}
            className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "home" ? "bg-gray-700 font-medium" : ""}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("tribal")}
            className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "tribal" ? "bg-gray-700 font-medium" : ""}`}
          >
            Collection
          </button>
          <button
            onClick={() => setCurrentPage("all-products")}
            className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "all-products" ? "bg-gray-700 font-medium" : ""}`}
          >
            All Products
          </button>
        <button
          onClick={() => setCurrentPage("product")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "product" ? "bg-gray-700 font-medium" : ""}`}
        >
          Product Page
        </button>
        <button
          onClick={() => setCurrentPage("cart")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "cart" ? "bg-gray-700 font-medium" : ""}`}
        >
          Cart
        </button>
        <button
          onClick={() => setCurrentPage("login")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "login" ? "bg-gray-700 font-medium" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage("checkout")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "checkout" ? "bg-gray-700 font-medium" : ""}`}
        >
          Checkout
        </button>
        <button
          onClick={() => setCurrentPage("account")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "account" ? "bg-gray-700 font-medium" : ""}`}
        >
          Account
        </button>
        <button
          onClick={() => setCurrentPage("about")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "about" ? "bg-gray-700 font-medium" : ""}`}
        >
          About
        </button>
        <button
          onClick={() => setCurrentPage("sitemap")}
          className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${currentPage === "sitemap" ? "bg-gray-700 font-medium" : ""}`}
        >
          Site Map
        </button>
        <hr className="my-3" />
        <div className="text-xs py-1">Cart: <span className="font-medium">{cart.length} items</span></div>
        <div className="text-xs py-1">User: <span className="font-medium">{user ? user.name : "Guest"}</span></div>
      </div>
      )}
    </div>
  );
};

export default Wireframe;
