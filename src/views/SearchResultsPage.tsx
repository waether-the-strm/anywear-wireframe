import React from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  // Tu można podpiąć logikę wyszukiwania produktów po query
  // Na razie przykładowe wyniki
  const results = [
    {
      id: 1,
      name: "Tribal Joggers Premium",
      price: 319,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Corduroy Pants",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Velvet Hoodie",
      price: 259,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Pattern Shirt",
      price: 189,
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Wyniki wyszukiwania</h1>
      <div className="mb-4 text-gray-600">
        Szukane hasło: <span className="font-medium">{query}</span>
      </div>
      {results.length === 0 ? (
        <div className="text-gray-500">Brak wyników.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover rounded mb-4"
              />
              <div className="font-medium text-lg mb-1 text-center">
                {item.name}
              </div>
              <div className="text-gray-700 mb-3">{item.price} PLN</div>
              <Link
                to={`/product?id=${item.id}`}
                className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition"
              >
                Zobacz produkt
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
