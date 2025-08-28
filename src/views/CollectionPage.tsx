import React from "react";

const CollectionPage = ({ collection, products, setCurrentPage }) => (
  <div className="max-w-7xl mx-auto px-4 py-8 w-full">
    {/* Collection Header */}
    <div className="mb-12">
      <div className="bg-gray-200 h-64 mb-6 flex items-center justify-center">
        <div className="text-2xl font-bold">
          [{collection.toUpperCase()} LOOKBOOK IMAGE]
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">
        {collection.toUpperCase()} COLLECTION
      </h1>
      <p className="text-lg text-gray-600 max-w-4xl">
        {collection === "tribal"
          ? "Przedstawiamy naszą długo wyczekiwaną kolekcję dresową, która powstała z myślą o tych, którzy cenią sobie komfort, jakość i wyjątkowy design..."
          : "Opis kolekcji " +
            collection +
            " - Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
      </p>
    </div>
    {/* Collection Lookbook Gallery */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">LOOKBOOK</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-gray-200 aspect-square flex items-center justify-center"
          >
            [LOOK {i}]
          </div>
        ))}
      </div>
    </div>
    {/* Products from Collection */}
    <div>
      <h2 className="text-2xl font-bold mb-6">PRODUKTY</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products
          .filter((p) => p.collection === collection)
          .map((product) => (
            <div
              key={product.id}
              className="cursor-pointer hover:opacity-80"
              onClick={() => setCurrentPage("product")}
            >
              <div className="bg-gray-200 h-64 mb-2 flex items-center justify-center">
                [PRODUCT IMAGE]
              </div>
              <div className="font-bold">{product.name}</div>
              <div className="text-gray-600">{product.price}</div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default CollectionPage;
