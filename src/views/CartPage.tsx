import React from "react";

const CartPage = ({ cart, setCurrentPage, setCart }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">KOSZYK ({cart.length})</h1>
    {cart.length === 0 ? (
      <div className="text-center py-16">
        <div className="text-xl mb-4">Twój koszyk jest pusty</div>
        <button
          onClick={() => setCurrentPage("all-products")}
          className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-700"
        >
          KONTYNUUJ ZAKUPY
        </button>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="border-b py-6 flex gap-4">
              <div className="bg-gray-200 w-24 h-24 flex items-center justify-center text-xs">
                [IMG]
              </div>
              <div className="flex-1">
                <div className="font-bold mb-1">{item.name}</div>
                <div className="text-sm text-gray-600 mb-2">
                  Rozmiar: {item.size}
                </div>
                <div className="flex items-center gap-4">
                  <select className="border p-1" defaultValue={item.quantity}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num}>{num}</option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      setCart(cart.filter((i) => i.id !== item.id))
                    }
                    className="text-red-500 hover:underline text-sm"
                  >
                    Usuń
                  </button>
                </div>
              </div>
              <div className="font-bold">{item.price} PLN</div>
            </div>
          ))}
        </div>
        {/* Order Summary */}
        <div className="bg-gray-50 p-6">
          <h3 className="font-bold text-xl mb-4">PODSUMOWANIE</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Produkty:</span>
              <span>{cart.reduce((sum, item) => sum + item.price, 0)} PLN</span>
            </div>
            <div className="flex justify-between">
              <span>Dostawa:</span>
              <span>19 PLN</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Razem:</span>
              <span>
                {cart.reduce((sum, item) => sum + item.price, 0) + 19} PLN
              </span>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("checkout")}
            className="w-full bg-gray-800 text-white p-3 hover:bg-gray-700 mb-3"
          >
            PRZEJDŹ DO KASY
          </button>
          <button
            onClick={() => setCurrentPage("all-products")}
            className="w-full border border-gray-400 p-3 hover:bg-gray-100"
          >
            KONTYNUUJ ZAKUPY
          </button>
        </div>
      </div>
    )}
  </div>
);

export default CartPage;
