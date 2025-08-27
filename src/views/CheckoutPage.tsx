import React from "react";

const CheckoutPage = ({
  user,
  cart,
  setCurrentPage,
  checkoutAsGuest,
  setCheckoutAsGuest,
}) => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">FINALIZACJA ZAMÓWIENIA</h1>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="md:col-span-2 space-y-8">
        {/* Login/Guest Options */}
        {!user && (
          <div className="bg-gray-50 p-6">
            <h3 className="font-bold mb-4">OPCJE LOGOWANIA</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage("login")}
                className="w-full bg-gray-800 text-white p-3 hover:bg-gray-700"
              >
                MASZ KONTO? ZALOGUJ SIĘ
              </button>
              <button
                onClick={() => setCheckoutAsGuest(true)}
                className="w-full border border-gray-400 p-3 hover:bg-gray-100"
              >
                ZAMÓW JAKO GOŚĆ
              </button>
            </div>
          </div>
        )}
        {/* Shipping Address */}
        {(user || checkoutAsGuest) && (
          <>
            <div className="bg-white border p-6">
              <h3 className="font-bold text-xl mb-4">ADRES DOSTAWY</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Imię *</label>
                  <input type="text" className="w-full border p-3" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Nazwisko *</label>
                  <input type="text" className="w-full border p-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2">Email *</label>
                  <input type="email" className="w-full border p-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2">Telefon *</label>
                  <input type="tel" className="w-full border p-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2">Adres *</label>
                  <input type="text" className="w-full border p-3" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    Kod pocztowy *
                  </label>
                  <input type="text" className="w-full border p-3" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Miasto *</label>
                  <input type="text" className="w-full border p-3" />
                </div>
              </div>
            </div>
            {/* Shipping Method */}
            <div className="bg-white border p-6">
              <h3 className="font-bold text-xl mb-4">SPOSÓB DOSTAWY</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="shipping" defaultChecked />
                  <div className="flex-1 flex justify-between">
                    <span>Kurier DPD (1-2 dni robocze)</span>
                    <span className="font-bold">19 PLN</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="shipping" />
                  <div className="flex-1 flex justify-between">
                    <span>Paczkomaty InPost (1-3 dni)</span>
                    <span className="font-bold">14 PLN</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="shipping" />
                  <div className="flex-1 flex justify-between">
                    <span>Odbiór osobisty</span>
                    <span className="font-bold">0 PLN</span>
                  </div>
                </label>
              </div>
            </div>
            {/* Payment Method */}
            <div className="bg-white border p-6">
              <h3 className="font-bold text-xl mb-4">SPOSÓB PŁATNOŚCI</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="payment" defaultChecked />
                  <div className="flex items-center gap-3">
                    <span>Karta płatnicza (Stripe)</span>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-blue-600 text-white text-xs flex items-center justify-center">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 text-white text-xs flex items-center justify-center">
                        MC
                      </div>
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <span>BLIK</span>
                </label>
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <span>Przelewy24</span>
                </label>
                <label className="flex items-center gap-3 p-3 border hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <span>Za pobraniem (+5 PLN)</span>
                </label>
              </div>
            </div>
            {/* Terms */}
            <div className="bg-white border p-6">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm">
                  Akceptuję <button className="underline">regulamin</button>{" "}
                  oraz
                  <button className="underline"> politykę prywatności</button>.
                  Wyrażam zgodę na przetwarzanie danych osobowych.*
                </span>
              </label>
            </div>
          </>
        )}
      </div>
      {/* Order Summary Sidebar */}
      <div className="bg-gray-50 p-6 h-fit">
        <h3 className="font-bold text-xl mb-4">TWOJE ZAMÓWIENIE</h3>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b"
          >
            <div>
              <div className="font-semibold text-sm">{item.name}</div>
              <div className="text-xs text-gray-600">
                Rozmiar: {item.size} | Ilość: {item.quantity}
              </div>
            </div>
            <div className="font-bold">{item.price} PLN</div>
          </div>
        ))}
        <div className="space-y-2 mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <span>Produkty:</span>
            <span>{cart.reduce((sum, item) => sum + item.price, 0)} PLN</span>
          </div>
          <div className="flex justify-between">
            <span>Dostawa:</span>
            <span>19 PLN</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>RAZEM:</span>
            <span>
              {cart.reduce((sum, item) => sum + item.price, 0) + 19} PLN
            </span>
          </div>
        </div>
        {(user || checkoutAsGuest) && (
          <button
            onClick={() => setCurrentPage("order-confirmation")}
            className="w-full bg-gray-800 text-white p-4 mt-6 hover:bg-gray-700 font-bold"
          >
            ZŁÓŻ ZAMÓWIENIE
          </button>
        )}
      </div>
    </div>
  </div>
);

export default CheckoutPage;
