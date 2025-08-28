import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import Navigation from "./src/components/Navigation";
import Footer from "./src/components/Footer";
import SiteMap from "./src/components/SiteMap";
import ChatSupport from "./src/components/ChatSupport";
import SearchSpotlight from "./src/components/SearchSpotlight";
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
import SearchResultsPage from "./src/views/SearchResultsPage";

// Główny komponent aplikacji
const WireframeApp = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutAsGuest, setCheckoutAsGuest] = useState(false);
  const [showWireframeNav, setShowWireframeNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Dodajemy nasłuchiwanie skrótów klawiszowych dla wyszukiwarki
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Pomijamy, jeśli użytkownik pisze w jakimś polu tekstowym
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Otwórz wyszukiwarkę za pomocą "/" lub Ctrl+K / Cmd+K
      if (
        (e.key === "/" && !e.ctrlKey && !e.metaKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === "k")
      ) {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Przykładowe produkty (mock)
  const products = [
    {
      id: 1,
      name: "Tribal T-shirt Black",
      price: "149,00 zł",
      collection: "tribal",
      description: "Czarny t-shirt z kolekcji Tribal.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/tribal-t-shirt-black.jpg",
    },
    {
      id: 2,
      name: "Tribal hoodie black",
      price: "249,00 zł",
      collection: "tribal",
      description: "Czarna bluza z kapturem z kolekcji Tribal.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/tribal-hoodie-black.jpg",
    },
    {
      id: 3,
      name: "Velvet pants beige",
      price: "149,00 zł",
      collection: "velvet",
      description: "Beżowe spodnie z aksamitu.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/velvet-pant-beige.jpg",
    },
    {
      id: 4,
      name: "Corduroy pants navy",
      price: "249,00 zł",
      collection: "corduroy",
      description: "Granatowe spodnie sztruksowe.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/corduroy-pants-navy.jpg",
    },
    {
      id: 5,
      name: "Plaid pants grey",
      price: "149,00 zł",
      collection: "plaid",
      description: "Szare spodnie w kratę.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/plaid-pants-grey.jpg",
    },
    {
      id: 6,
      name: "Anywear cap black",
      price: "69,00 zł",
      collection: "accessories",
      description: "Czarna czapka z daszkiem.",
      image:
        "https://anywear.pl/wp-content/uploads/2023/07/anywear-cap-black.jpg",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const pathToLabel = {
    "/": "Home",
    "/tribal": "Collection",
    "/all-products": "All Products",
    "/product": "Product Page",
    "/cart": "Cart",
    "/login": "Login",
    "/checkout": "Checkout",
    "/account": "Account",
    "/about": "About",
    "/sitemap": "Site Map",
  };

  // Obsługa tabów na stronie konta przez query param
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "dashboard";
  const setTab = (newTab) => {
    searchParams.set("tab", newTab);
    navigate({ pathname: "/account", search: `?${searchParams.toString()}` });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col">
        <Navigation
          setCurrentPage={(path) => navigate(path)}
          user={user}
          setUser={setUser}
          cart={cart}
          toggleWireframeNav={() => setShowWireframeNav(!showWireframeNav)}
          toggleSearch={() => setShowSearch(true)}
        />

        {/* Komponent wyszukiwania w stylu spotlight */}
        <SearchSpotlight
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setShowSearch(false);
          }}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage setCurrentPage={(path) => navigate(path)} />}
          />
          <Route
            path="/tribal"
            element={
              <CollectionPage
                collection="tribal"
                products={products}
                setCurrentPage={(path) => navigate(path)}
              />
            }
          />
          <Route
            path="/corduroy"
            element={
              <CollectionPage
                collection="corduroy"
                products={products}
                setCurrentPage={(path) => navigate(path)}
              />
            }
          />
          <Route
            path="/velvet"
            element={
              <CollectionPage
                collection="velvet"
                products={products}
                setCurrentPage={(path) => navigate(path)}
              />
            }
          />
          <Route
            path="/plaid"
            element={
              <CollectionPage
                collection="plaid"
                products={products}
                setCurrentPage={(path) => navigate(path)}
              />
            }
          />
          <Route
            path="/all-products"
            element={
              <AllProductsPage
                products={products}
                setCurrentPage={(path) => navigate(path)}
              />
            }
          />
          <Route
            path="/product"
            element={<ProductPage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                setCurrentPage={(path) => navigate(path)}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                setUser={setUser}
                setCurrentPage={(path) => navigate(path)}
                cart={cart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                user={user}
                cart={cart}
                setCurrentPage={(path) => navigate(path)}
                checkoutAsGuest={checkoutAsGuest}
                setCheckoutAsGuest={setCheckoutAsGuest}
              />
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <OrderConfirmationPage
                cart={cart}
                user={user}
                setCurrentPage={(path) => navigate(path)}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/account"
            element={
              <AccountPage
                user={user}
                setUser={setUser}
                setCurrentPage={(path) => navigate(path)}
                tab={tab}
                setTab={setTab}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route
            path="/sitemap"
            element={<SiteMap setCurrentPage={(path) => navigate(path)} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

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
            <div className="font-medium mb-2">
              Current:{" "}
              <span className="text-yellow-300">
                {pathToLabel[location.pathname] ||
                  location.pathname.replace("/", "")}
              </span>
            </div>
            <Link
              to="/"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/tribal"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/tribal" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              Collection
            </Link>
            <Link
              to="/all-products"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/all-products"
                  ? "bg-gray-700 font-medium"
                  : ""
              }`}
            >
              All Products
            </Link>
            <Link
              to="/product"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/product"
                  ? "bg-gray-700 font-medium"
                  : ""
              }`}
            >
              Product Page
            </Link>
            <Link
              to="/cart"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/cart" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              Cart
            </Link>
            <Link
              to="/login"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/login" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/checkout"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/checkout"
                  ? "bg-gray-700 font-medium"
                  : ""
              }`}
            >
              Checkout
            </Link>
            <Link
              to="/account"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/account"
                  ? "bg-gray-700 font-medium"
                  : ""
              }`}
            >
              Account
            </Link>
            <Link
              to="/about"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/about" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/search?q=masło"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/search" ? "bg-gray-700 font-medium" : ""
              }`}
            >
              Search Results
            </Link>
            <Link
              to="/sitemap"
              className={`block w-full text-left py-1.5 px-2 my-0.5 rounded hover:bg-gray-700 ${
                location.pathname === "/sitemap"
                  ? "bg-gray-700 font-medium"
                  : ""
              }`}
            >
              Site Map
            </Link>
            <hr className="my-3" />
            <div className="text-xs py-1">
              Cart: <span className="font-medium">{cart.length} items</span>
            </div>
            <div className="text-xs py-1">
              User:{" "}
              <span className="font-medium">{user ? user.name : "Guest"}</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const Wireframe = () => (
  <Router>
    <WireframeApp />
  </Router>
);

export default Wireframe;
