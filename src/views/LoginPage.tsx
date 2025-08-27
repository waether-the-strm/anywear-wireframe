import React from "react";

const LoginPage = ({ setUser, setCurrentPage, cart }) => (
  <div className="max-w-md mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold mb-8 text-center">LOGOWANIE</h1>
    <div className="bg-white border p-8">
      <div className="mb-6">
        <label className="block font-semibold mb-2">Email:</label>
        <input
          type="email"
          className="w-full border p-3"
          placeholder="twój@email.com"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Hasło:</label>
        <input
          type="password"
          className="w-full border p-3"
          placeholder="********"
        />
      </div>
      <button
        onClick={() => {
          setUser({ name: "Jan Kowalski", email: "jan@example.com" });
          setCurrentPage(cart.length > 0 ? "checkout" : "home");
        }}
        className="w-full bg-gray-800 text-white p-3 hover:bg-gray-700 mb-4"
      >
        ZALOGUJ SIĘ
      </button>
      <div className="text-center">
        <button className="text-sm hover:underline">Zapomniałeś hasła?</button>
      </div>
    </div>
    <div className="mt-8 bg-gray-50 border p-8">
      <h2 className="text-xl font-bold mb-4">NOWY KLIENT?</h2>
      <p className="text-gray-600 mb-4">
        Stwórz konto, aby śledzić swoje zamówienia i przyspieszać przyszłe
        zakupy.
      </p>
      <button className="w-full border border-gray-800 p-3 hover:bg-gray-100">
        ZAŁÓŻ KONTO
      </button>
    </div>
  </div>
);

export default LoginPage;
