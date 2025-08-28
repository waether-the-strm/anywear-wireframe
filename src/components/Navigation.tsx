import React from "react";
import { Link } from "react-router-dom";

type NavigationProps = {
  setCurrentPage: (page: string) => void;
  user?: any;
  setUser?: (user: any) => void;
  cart?: any[];
  toggleWireframeNav?: () => void;
};

const Navigation = ({
  setCurrentPage,
  user,
  setUser,
  cart,
  toggleWireframeNav,
}: NavigationProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold focus:outline-none"
              aria-label="Go to homepage"
            >
              ANYWEAR
            </Link>
          </div>

          {/* Główna nawigacja - uproszczona */}
          <nav className="hidden md:flex space-x-8">
            {/* Sklep (wszystkie produkty) */}
            <Link
              to="/all-products"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              SKLEP
            </Link>
            {/* Dropdown dla kolekcji */}
            <div className="relative group flex items-center">
              <span className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium cursor-default select-none">
                KOLEKCJE
              </span>
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30"
                style={{ minWidth: "200px" }}
              >
                <Link
                  to="/tribal"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tribal Collection
                </Link>
                <Link
                  to="/corduroy"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Corduroy
                </Link>
                <Link
                  to="/velvet"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Velvet
                </Link>
                <Link
                  to="/plaid"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pattern & Plaid
                </Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/all-products"
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                  >
                    Wszystkie produkty
                  </Link>
                </div>
              </div>
            </div>

            {/* Proste linki */}
            {/* HOME removed, logo is now home */}
            <Link
              to="/about"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              O MARCE
            </Link>
          </nav>

          {/* Akcje użytkownika - uproszczone */}
          <div className="flex items-center space-x-4">
            {/* Debug WireFrame Nav Toggle */}
            <button
              onClick={toggleWireframeNav}
              className="p-1 bg-black rounded-full hover:bg-gray-800 flex items-center justify-center"
              aria-label="Toggle wireframe navigation"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </button>
            {/* Search */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setCurrentPage("/search?q=bluza")}
              aria-label="Przejdź do wyszukiwania"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Account icon: login if not logged in, dropdown if logged in */}
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                  <button
                    onClick={() => setCurrentPage("account")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Moje konto
                  </button>
                  <button
                    onClick={() => setCurrentPage("account?tab=orders")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Historia zamówień
                  </button>
                  <button
                    onClick={() => setCurrentPage("account?tab=personal")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dane osobowe
                  </button>
                  <button
                    onClick={() => setCurrentPage("account?tab=addresses")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Adresy
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    onClick={() => {
                      if (setUser) setUser(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Wyloguj się
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setCurrentPage("login")}
                aria-label="Go to login"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}

            {/* Cart z licznikiem */}
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setCurrentPage("cart")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => setCurrentPage("tribal")}
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900"
          >
            Kolekcje
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900"
          >
            O marce
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
