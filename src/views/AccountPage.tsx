import React from "react";

const AccountPage = ({ user, setUser, setCurrentPage }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">MOJE KONTO</h1>
      <button
        onClick={() => {
          setUser(null);
          setCurrentPage("home");
        }}
        className="text-sm hover:underline"
      >
        Wyloguj się
      </button>
    </div>
    <div className="grid md:grid-cols-4 gap-8">
      {/* Account Menu */}
      <div className="bg-gray-50 p-4">
        <div className="space-y-2">
          <button className="block w-full text-left p-2 bg-gray-800 text-white">
            Moje zamówienia
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-100">
            Dane osobowe
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-100">
            Adresy
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-100">
            Ustawienia
          </button>
        </div>
      </div>
      {/* Account Content */}
      <div className="md:col-span-3">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">MOJE ZAMÓWIENIA</h2>
          {/* Sample Orders */}
          <div className="space-y-4">
            <div className="border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold">#ANW-2025-0001</div>
                  <div className="text-sm text-gray-600">27 sierpnia 2025</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">318 PLN</div>
                  <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Dostarczone
                  </div>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <div>Tribal Joggers Premium (M) × 1</div>
                <div>Dostawa: Kurier DPD</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                  Zobacz szczegóły
                </button>
                <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                  Kup ponownie
                </button>
              </div>
            </div>
            <div className="border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold">#ANW-2025-0002</div>
                  <div className="text-sm text-gray-600">20 sierpnia 2025</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">213 PLN</div>
                  <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    W realizacji
                  </div>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <div>Corduroy Pants (L) × 1</div>
                <div>Dostawa: Paczkomaty InPost</div>
              </div>
              <div className="mt-4">
                <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                  Śledź przesyłkę
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AccountPage;
