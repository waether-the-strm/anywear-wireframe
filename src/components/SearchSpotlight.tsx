import React, { useState, useEffect, useRef } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  collection: string;
  description: string;
  image: string;
};

type SearchSpotlightProps = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  products: Product[];
};

const SearchSpotlight = ({
  isOpen,
  onClose,
  onSearch,
  products,
}: SearchSpotlightProps) => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1 oznacza brak wyboru
  const SEARCH_BUTTON_INDEX = -2; // Specjalna wartość dla przycisku wyszukiwania
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null); // Ref do przycisku wyszukiwania
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null); // Ref do kontenera wyników

  // Resetuj pole przy otwarciu
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(-1); // Reset wybranego indeksu
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen]);

  // Obsługa klawiszy nawigacji (Escape, Arrow Up, Arrow Down, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault(); // Zapobiegaj przewijaniu strony
          setSelectedIndex((prevIndex) => {
            // Jeśli nie ma wyników, nic nie rób
            if (filteredProducts.length === 0) return -1;

            // Logika nawigacji z uwzględnieniem przycisku wyszukiwania
            let newIndex;

            if (prevIndex === -1) {
              // Nic nie jest wybrane - wybierz pierwszy element
              newIndex = 0;
            } else if (prevIndex === SEARCH_BUTTON_INDEX) {
              // Jesteśmy na przycisku wyszukiwania - idź do pierwszego elementu
              newIndex = 0;
            } else if (prevIndex === filteredProducts.length - 1) {
              // Jesteśmy na ostatnim produkcie - idź do przycisku wyszukiwania
              newIndex = SEARCH_BUTTON_INDEX;
              // Ustaw focus na przycisku wyszukiwania
              setTimeout(() => {
                searchButtonRef.current?.focus();
              }, 10);
              return newIndex;
            } else {
              // Normalnie przejdź do następnego elementu
              newIndex = prevIndex + 1;
            }

            // Przewiń do wybranego elementu (tylko dla produktów)
            if (newIndex >= 0) {
              setTimeout(() => {
                const selectedElement = document.getElementById(
                  `search-result-${newIndex}`
                );
                selectedElement?.scrollIntoView({
                  block: "nearest",
                  behavior: "smooth",
                });
              }, 10);
            }

            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault(); // Zapobiegaj przewijaniu strony
          setSelectedIndex((prevIndex) => {
            // Jeśli nie ma wyników, nic nie rób
            if (filteredProducts.length === 0) return -1;

            // Logika nawigacji w górę z uwzględnieniem przycisku wyszukiwania
            let newIndex;

            if (prevIndex === -1) {
              // Nic nie jest wybrane - wybierz ostatni element
              newIndex = filteredProducts.length - 1;
            } else if (prevIndex === 0) {
              // Jesteśmy na pierwszym produkcie - idź do przycisku wyszukiwania
              newIndex = SEARCH_BUTTON_INDEX;
              // Ustaw focus na przycisku wyszukiwania
              setTimeout(() => {
                searchButtonRef.current?.focus();
              }, 10);
              return newIndex;
            } else if (prevIndex === SEARCH_BUTTON_INDEX) {
              // Jesteśmy na przycisku wyszukiwania - idź do ostatniego elementu
              newIndex = filteredProducts.length - 1;
            } else {
              // Normalnie przejdź do poprzedniego elementu
              newIndex = prevIndex - 1;
            }

            // Przewiń do wybranego elementu (tylko dla produktów)
            if (newIndex >= 0) {
              setTimeout(() => {
                const selectedElement = document.getElementById(
                  `search-result-${newIndex}`
                );
                selectedElement?.scrollIntoView({
                  block: "nearest",
                  behavior: "smooth",
                });
              }, 10);
            }

            return newIndex;
          });
          break;
        case "Enter":
          // Sprawdź, czy przycisk wyszukiwania ma focus lub czy jesteśmy na indeksie przycisku wyszukiwania
          const searchButtonHasFocus =
            document.activeElement === searchButtonRef.current ||
            selectedIndex === SEARCH_BUTTON_INDEX;

          // Jeśli element jest wybrany i przycisk wyszukiwania NIE ma focusa, przejdź do produktu
          if (
            selectedIndex >= 0 &&
            selectedIndex < filteredProducts.length &&
            !searchButtonHasFocus
          ) {
            e.preventDefault();
            handleProductClick(filteredProducts[selectedIndex].id);
          } else if (searchButtonHasFocus) {
            // Jeśli przycisk wyszukiwania ma focus, wykonaj wyszukiwanie
            e.preventDefault();
            onSearch(query);
          }
          // W przeciwnym razie formularz obsłuży submit normalnie (idzie do wyników wyszukiwania)
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, filteredProducts, selectedIndex]);

  // Efekt obsługujący zmiany selectedIndex
  useEffect(() => {
    // Gdy indeks to SEARCH_BUTTON_INDEX, ustaw focus na przycisku wyszukiwania
    if (selectedIndex === SEARCH_BUTTON_INDEX && searchButtonRef.current) {
      searchButtonRef.current.focus();
    } else if (selectedIndex >= 0) {
      // Gdy indeks wskazuje na produkt, upewnij się że przycisk nie ma focusa
      if (document.activeElement === searchButtonRef.current) {
        inputRef.current?.focus();
      }
    }
  }, [selectedIndex]);

  // Filtrowanie produktów
  useEffect(() => {
    // Wyczyść poprzedni timeout, aby uniknąć zbyt częstych aktualizacji
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setFilteredProducts([]);
      setShowResults(false);
      setSelectedIndex(-1); // Reset zaznaczenia gdy nie ma wyników
      return;
    }

    setIsLoading(true);

    // Dodaj małe opóźnienie, aby uniknąć zbyt wielu operacji podczas szybkiego pisania
    searchTimeoutRef.current = setTimeout(() => {
      const searchTerms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term);

      const results = products.filter((product) => {
        // Szukaj w nazwie, opisie i kolekcji
        const searchContent =
          `${product.name} ${product.description} ${product.collection}`.toLowerCase();
        return searchTerms.every((term) => searchContent.includes(term));
      });

      setFilteredProducts(results);
      setShowResults(true);
      setIsLoading(false);
      setSelectedIndex(-1); // Domyślnie żaden produkt nie jest wybrany
    }, 150); // 150ms opóźnienia

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, products]);

  // Obsługa submitu formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Jeśli jest wybrany produkt, idź do niego zamiast do wyników wyszukiwania
      if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
        handleProductClick(filteredProducts[selectedIndex].id);
      } else {
        onSearch(query); // Standardowe wyszukiwanie
      }
    }
  };

  // Obsługa kliknięcia na produkt
  const handleProductClick = (productId: number) => {
    onSearch(`/product?id=${productId}`); // Używamy pełnej ścieżki z początkowym "/"
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-[20vh] z-50 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all animate-fade-in"
        style={{
          animationDuration: "200ms",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center p-4 border-b">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
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
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
              placeholder="Wyszukaj produkty..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-500">
                  Naciśnij Enter, aby wyszukać
                </span>
                <div className="mt-1 text-xs text-gray-400">
                  <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                    /
                  </span>
                  <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+K
                  </span>
                  aby otworzyć wyszukiwarkę
                </div>
                {/* Nawigacja strzałkami przeniesiona do prawej strony nad listą wyników */}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-black"
              >
                Anuluj (Esc)
              </button>
            </div>
            <button
              ref={searchButtonRef}
              type="submit"
              className={`mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition ${
                selectedIndex === SEARCH_BUTTON_INDEX
                  ? "ring-2 ring-gray-500"
                  : ""
              }`}
              onClick={() => setSelectedIndex(-1)} // Reset zaznaczenia przy kliknięciu przycisku
              onFocus={() => setSelectedIndex(SEARCH_BUTTON_INDEX)}
              onBlur={() => setSelectedIndex(-1)}
            >
              Wyszukaj
            </button>
          </div>
        </form>

        {/* Podpowiadane produkty */}
        {query && (
          <div className="max-h-[400px] overflow-y-auto border-t flex flex-col">
            <div className="flex-1 min-h-0">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                  Wyszukiwanie...
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <div>
                      <div className="p-3 bg-gray-50 text-sm text-gray-500 border-b flex items-center justify-between">
                        <span>
                          Znaleziono {filteredProducts.length}{" "}
                          {filteredProducts.length === 1
                            ? "produkt"
                            : filteredProducts.length < 5
                            ? "produkty"
                            : "produktów"}
                        </span>
                        <span className="hidden sm:flex items-center text-xs text-gray-400 ml-4 whitespace-nowrap">
                          <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                            ↑
                          </span>
                          <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                            ↓
                          </span>
                          do nawigacji,
                          <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mx-1">
                            Enter
                          </span>
                          aby wybrać
                        </span>
                      </div>
                      <ul>
                        {filteredProducts.map((product, index) => (
                          <li
                            key={product.id}
                            id={`search-result-${index}`}
                            className="border-b last:border-0 animate-fade-in search-result-focus"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationDuration: "300ms",
                            }}
                          >
                            <button
                              onClick={() => handleProductClick(product.id)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`flex items-center w-full p-3 transition text-left ${
                                selectedIndex === index
                                  ? "bg-gray-100 ring-2 ring-gray-300 ring-inset"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              {/* Miniaturka produktu */}
                              <div className="w-16 h-16 bg-gray-100 flex-shrink-0 rounded overflow-hidden mr-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://via.placeholder.com/80";
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.collection.toUpperCase()} ·{" "}
                                  {product.price}
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    showResults && (
                      <div className="p-4 text-center text-gray-500">
                        Nie znaleziono produktów pasujących do "{query}"
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {/* Popularne wyszukiwania - sticky bottom */}
        <div className="p-4 bg-gray-50 border-t sticky bottom-0 z-10">
          <div className="text-sm text-gray-500 mb-2">
            Popularne wyszukiwania:
          </div>
          <div className="flex flex-wrap gap-2">
            {["tribal", "spodnie", "bluzy", "czapki", "kurtki"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSpotlight;
