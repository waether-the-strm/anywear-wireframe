import React from "react";

const OrderConfirmationPage = ({ cart, user, setCurrentPage, setCart }) => (
  <div className="max-w-2xl mx-auto px-4 py-16 text-center">
    <div className="bg-green-100 border border-green-400 p-8 mb-8">
      <div className="text-4xl mb-4">✓</div>
      <h1 className="text-3xl font-bold mb-4">DZIĘKUJEMY ZA ZAMÓWIENIE!</h1>
      <div className="text-lg mb-2">
        Numer zamówienia: <strong>#ANW-2025-0001</strong>
      </div>
      <div className="text-gray-600">
        Potwierdzenie zostało wysłane na adres email
      </div>
    </div>
    <div className="bg-white border p-6 mb-8">
      <h2 className="font-bold text-xl mb-4">SZCZEGÓŁY ZAMÓWIENIA</h2>
      <div className="text-left space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} (rozmiar: {item.size})
            </span>
            <span>{item.price} PLN</span>
          </div>
        ))}
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>RAZEM:</span>
          <span>
            {cart.reduce((sum, item) => sum + item.price, 0) + 19} PLN
          </span>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="text-gray-600">
        Zamówienie zostanie zrealizowane w ciągu 1-2 dni roboczych. Status
        zamówienia możesz sprawdzić w sekcji "Moje konto".
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setCurrentPage("home");
            setCart([]);
          }}
          className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-700"
        >
          WRÓĆ DO SKLEPU
        </button>
        {user && (
          <button
            onClick={() => setCurrentPage("account")}
            className="border border-gray-400 px-6 py-3 hover:bg-gray-100"
          >
            MOJE KONTO
          </button>
        )}
      </div>
    </div>
  </div>
);

export default OrderConfirmationPage;
