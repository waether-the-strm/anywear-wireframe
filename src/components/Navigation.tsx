import React from "react";

const Navigation = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-xl font-bold">ANYWEAR</div>
          </div>

          {/* Główna nawigacja - uproszczona */}
          <nav className="hidden md:flex space-x-8">
            {/* Dropdown dla kolekcji */}
            <div className="relative group">
              <button className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium">
                KOLEKCJE
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tribal Collection
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Corduroy
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Velvet
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pattern & Plaid
                </a>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                  >
                    Wszystkie produkty
                  </a>
                </div>
              </div>
            </div>

            {/* Proste linki */}
            <a
              href="#"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              LOOKBOOK
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              O MARCE
            </a>
          </nav>

          {/* Akcje użytkownika - uproszczone */}
          <div className="flex items-center space-x-4">
            {/* Search */}
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Account - jeden przycisk z dropdown */}
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
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Moje konto
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Zamówienia
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logowanie
                </a>
              </div>
            </div>

            {/* Cart z licznikiem */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
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
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-900"
          >
            Kolekcje
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-900"
          >
            Lookbook
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-900"
          >
            O marce
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
