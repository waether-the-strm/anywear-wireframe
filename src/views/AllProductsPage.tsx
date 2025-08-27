import React from "react";

const AllProductsPage = ({ products, setCurrentPage }) => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">WSZYSTKIE PRODUKTY</h1>
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64">
        <div className="bg-gray-100 p-4 mb-4">
          <h3 className="font-bold mb-3">FILTRY</h3>
          <div className="mb-4">
            <div className="font-semibold mb-2">Kolekcja</div>
            {["tribal", "corduroy", "velvet", "plaid"].map((col) => (
              <label key={col} className="block mb-1">
                <input type="checkbox" className="mr-2" />
                {col.toUpperCase()}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Kategoria</div>
            {["pants", "hoodie", "tshirt", "cap"].map((cat) => (
              <label key={cat} className="block mb-1">
                <input type="checkbox" className="mr-2" />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Rozmiar</div>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="block mb-1">
                <input type="checkbox" className="mr-2" />
                {size}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Cena</div>
            <select className="w-full p-2 border">
              <option>Wszystkie</option>
              <option>0 - 200 PLN</option>
              <option>200 - 400 PLN</option>
              <option>400+ PLN</option>
            </select>
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>Znaleziono: 32 produkty</div>
          <select className="p-2 border">
            <option>Sortuj: Najnowsze</option>
            <option>Cena: rosnąco</option>
            <option>Cena: malejąco</option>
            <option>Nazwa A-Z</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer hover:opacity-80"
              onClick={() => setCurrentPage("product")}
            >
              <div className="bg-gray-200 h-64 mb-2 flex items-center justify-center">
                [PRODUCT IMAGE]
              </div>
              <div className="font-bold">{product.name}</div>
              <div className="text-sm text-gray-600">
                {product.collection.toUpperCase()}
              </div>
              <div className="text-gray-600">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AllProductsPage;
