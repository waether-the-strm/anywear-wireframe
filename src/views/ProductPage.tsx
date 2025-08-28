import React from "react";

const ProductPage = ({ cart, setCart }) => (
  <div className="max-w-7xl mx-auto px-4 py-8 w-full">
    <div className="grid md:grid-cols-2 gap-12">
      {/* Product Images */}
      <div>
        <div className="bg-gray-200 h-96 mb-4 flex items-center justify-center text-xl">
          [MAIN PRODUCT IMAGE]
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-200 h-20 flex items-center justify-center text-xs"
            >
              [IMG {i}]
            </div>
          ))}
        </div>
      </div>
      {/* Product Info */}
      <div>
        <div className="text-sm text-gray-600 mb-2">TRIBAL COLLECTION</div>
        <h1 className="text-3xl font-bold mb-4">Tribal Joggers Premium</h1>
        <div className="text-2xl font-bold mb-6">299 PLN</div>
        <div className="mb-6">
          <div className="font-semibold mb-2">Rozmiar:</div>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className="border border-gray-400 px-3 py-1 hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="font-semibold mb-2">Ilość:</div>
          <select className="border p-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
        </div>
        <div
          className="bg-gray-800 text-white p-3 text-center mb-4 cursor-pointer hover:bg-gray-700"
          onClick={() => {
            setCart([
              ...cart,
              {
                id: Date.now(),
                name: "Tribal Joggers Premium",
                price: 299,
                size: "M",
                quantity: 1,
              },
            ]);
            alert("Produkt dodany do koszyka!");
          }}
        >
          DODAJ DO KOSZYKA
        </div>
        <div className="mb-6">
          <div className="font-semibold mb-2">Size Guide</div>
          <div className="bg-gray-100 p-3 text-sm">
            [INTERACTIVE SIZE CHART]
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Opis produktu:</div>
          <p className="text-gray-600">
            Spodnie dresowe z kolekcji Tribal. Krój spodni dopracowywaliśmy
            przez długie miesiące, testując każdy szczegół w ruchu. Brak
            bocznych szwów zapewnia niesamowity komfort...
          </p>
        </div>
      </div>
    </div>
    {/* Related Products */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">COMPLETE THE LOOK</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="cursor-pointer hover:opacity-80">
            <div className="bg-gray-200 h-48 mb-2 flex items-center justify-center">
              [RELATED {i}]
            </div>
            <div className="font-bold">Related Product {i}</div>
            <div className="text-gray-600">199 PLN</div>
          </div>
        ))}
      </div>
    </div>
    {/* Reviews */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">OPINIE (4.8★)</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b pb-4">
            <div className="flex justify-between mb-2">
              <div className="font-semibold">Użytkownik {i}</div>
              <div>★★★★★</div>
            </div>
            <p className="text-gray-600">
              Super jakość, wygodne, polecam! Lorem ipsum dolor sit amet...
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductPage;
