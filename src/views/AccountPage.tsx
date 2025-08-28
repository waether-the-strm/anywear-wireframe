import React, { useState } from "react";

const TABS = [
  { key: "dashboard", label: "Podsumowanie" },
  { key: "personal", label: "Dane osobowe" },
  { key: "addresses", label: "Adresy" },
  { key: "orders", label: "Historia zamówień" },
  { key: "returns", label: "Zwroty i reklamacje" },
  { key: "payments", label: "Metody płatności" },
  { key: "privacy", label: "Prywatność i zgody" },
];

const AccountPage = ({
  user,
  setUser,
  setCurrentPage,
  tab: propTab,
  setTab: propSetTab,
}) => {
  const [localTab, localSetTab] = useState(propTab || "dashboard");
  const tab = propTab !== undefined ? propTab : localTab;
  const setTab = propSetTab !== undefined ? propSetTab : localSetTab;
  const today = "2025-08-28"; // Obecna data

  return (
    <div className="max-w-7xl w-full mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Moje konto</h1>
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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Pionowa nawigacja po lewej */}
        <div className="md:w-64 shrink-0">
          <div className="bg-white rounded shadow p-4 sticky top-4">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                className={`block w-full text-left px-4 py-3 mb-1 rounded transition ${
                  tab === key
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setTab(key)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Zawartość zakładek */}
        <div className="bg-white rounded shadow p-6 min-h-[500px] flex-grow">
          {tab === "dashboard" && (
            <div>
              <h2 className="font-semibold text-xl mb-4">Podsumowanie konta</h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Witaj, Jan! Ostatnia aktualizacja danych: 2025-08-20
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">Statystyki</h3>
                    <ul className="text-sm text-gray-700">
                      <li className="mb-1">• Liczba wszystkich zamówień: 5</li>
                      <li className="mb-1">• Wydane w tym roku: 1 240,00 zł</li>
                      <li className="mb-1">• Status klubu: Silver</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">Dane kontaktowe</h3>
                    <p className="text-sm text-gray-700 mb-1">Jan Kowalski</p>
                    <p className="text-sm text-gray-700 mb-1">
                      jan.kowalski@email.com
                    </p>
                    <p className="text-sm text-gray-700">+48 123 456 789</p>
                    <button
                      className="text-blue-600 text-sm mt-2"
                      onClick={() => setTab("personal")}
                    >
                      Edytuj dane
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold mb-4 border-b pb-2">
                Bieżące zamówienia
              </h3>
              <div className="space-y-4 mb-6">
                <div className="border p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">#ANW-2025-0001</div>
                      <div className="text-sm text-gray-600">
                        27 sierpnia 2025 (wczoraj)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">318 PLN</div>
                      <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Nowe
                      </div>
                    </div>
                  </div>
                  <div className="text-sm space-y-1 mb-3">
                    <div>Tribal Joggers Premium (M) × 1</div>
                    <div>Dostawa: Kurier DPD</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                      Zobacz szczegóły
                    </button>
                    <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                      Śledź przesyłkę
                    </button>
                  </div>
                </div>
                <div className="border p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">#ANW-2025-0002</div>
                      <div className="text-sm text-gray-600">
                        20 sierpnia 2025 (8 dni temu)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">213 PLN</div>
                      <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        W drodze
                      </div>
                    </div>
                  </div>
                  <div className="text-sm space-y-1 mb-3">
                    <div>Corduroy Pants (L) × 1</div>
                    <div>Dostawa: Paczkomaty InPost</div>
                  </div>
                  <div>
                    <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                      Śledź przesyłkę
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-black text-white px-4 py-2 rounded"
                  onClick={() => setTab("orders")}
                >
                  Zobacz wszystkie zamówienia
                </button>
                <button className="bg-gray-100 text-black px-4 py-2 rounded">
                  Wsparcie
                </button>
              </div>
            </div>
          )}

          {tab === "personal" && (
            <form className="space-y-4">
              <h2 className="font-semibold mb-4">Dane osobowe</h2>
              <div>
                <label className="block text-sm mb-1">Imię</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="text"
                  defaultValue="Jan"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nazwisko</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="text"
                  defaultValue="Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="email"
                  defaultValue="jan.kowalski@email.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Telefon</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="tel"
                  defaultValue="+48 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Zmień hasło</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="password"
                  placeholder="Nowe hasło"
                />
              </div>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                type="submit"
              >
                Zapisz zmiany
              </button>
            </form>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="font-semibold mb-4">Adresy</h2>
              <div className="mb-4">
                <div className="font-medium">Adres dostawy</div>
                <div className="text-sm text-gray-700">
                  ul. Przykładowa 1, 00-000 Warszawa
                </div>
                <button className="text-blue-600 text-sm mt-1">Edytuj</button>
              </div>
              <div>
                <div className="font-medium">Adres rozliczeniowy</div>
                <div className="text-sm text-gray-700">
                  ul. Przykładowa 1, 00-000 Warszawa
                </div>
                <button className="text-blue-600 text-sm mt-1">Edytuj</button>
              </div>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded">
                Dodaj nowy adres
              </button>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="font-semibold mb-4">Historia zamówień</h2>
              <div className="flex mb-4 text-sm">
                <input
                  type="text"
                  placeholder="Wyszukaj po numerze..."
                  className="border rounded px-3 py-2"
                />
                <select className="border rounded px-3 py-2 ml-2">
                  <option value="">Wszystkie okresy</option>
                  <option value="30days">Ostatnie 30 dni</option>
                  <option value="6months">Ostatnie 6 miesięcy</option>
                  <option value="12months">Ostatni rok</option>
                </select>
              </div>
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Numer</th>
                    <th className="py-2 text-left">Data</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Kwota</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2">#ANW-2025-0001</td>
                    <td>27.08.2025</td>
                    <td>Nowe</td>
                    <td>318,00 zł</td>
                    <td>
                      <button className="text-blue-600 text-xs">
                        Szczegóły
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2">#ANW-2025-0002</td>
                    <td>20.08.2025</td>
                    <td>W drodze</td>
                    <td>213,00 zł</td>
                    <td>
                      <button className="text-blue-600 text-xs">
                        Szczegóły
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2">#ANW-2025-0003</td>
                    <td>10.07.2025</td>
                    <td>Zrealizowane</td>
                    <td>199,00 zł</td>
                    <td>
                      <button className="text-blue-600 text-xs">
                        Szczegóły
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-2">#ANW-2025-0004</td>
                    <td>15.06.2025</td>
                    <td>Zrealizowane</td>
                    <td>299,00 zł</td>
                    <td>
                      <button className="text-blue-600 text-xs">
                        Szczegóły
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between">
                <button className="bg-gray-100 text-black px-4 py-2 rounded">
                  Pobierz faktury
                </button>
                <div className="text-sm text-gray-500">
                  Łącznie: 4 zamówienia
                </div>
              </div>
            </div>
          )}

          {tab === "returns" && (
            <div>
              <h2 className="font-semibold mb-4">Zwroty i reklamacje</h2>
              <div className="space-y-4 mb-6">
                <div className="border p-4 rounded">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Zwrot #RMA123</div>
                      <div className="text-sm text-gray-600">
                        Do zamówienia: #ANW-2025-0003
                      </div>
                    </div>
                    <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded h-fit">
                      W trakcie
                    </div>
                  </div>
                  <div className="text-sm mt-2 text-gray-700">
                    <p className="mb-1">Produkt: Tribal Joggers Premium (M)</p>
                    <p className="mb-1">Powód: Zły rozmiar</p>
                    <p>Zgłoszono: 15.07.2025</p>
                  </div>
                </div>

                <div className="border p-4 rounded">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Reklamacja #RMA122</div>
                      <div className="text-sm text-gray-600">
                        Do zamówienia: #ANW-2025-0004
                      </div>
                    </div>
                    <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded h-fit">
                      Zakończona
                    </div>
                  </div>
                  <div className="text-sm mt-2 text-gray-700">
                    <p className="mb-1">Produkt: Classic T-Shirt (S)</p>
                    <p className="mb-1">Powód: Uszkodzony produkt</p>
                    <p>Zgłoszono: 20.06.2025</p>
                  </div>
                </div>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded">
                Zgłoś nowy zwrot/reklamację
              </button>
            </div>
          )}

          {tab === "payments" && (
            <div>
              <h2 className="font-semibold mb-4">Metody płatności</h2>
              <div className="space-y-4 mb-6">
                <div className="border p-4 rounded">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-100 rounded mr-3 flex items-center justify-center">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium">Visa **** 1234</div>
                        <div className="text-sm text-gray-600">
                          Wygasa: 09/27
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <button className="text-sm border px-3 py-1 hover:bg-gray-100">
                        Ustaw jako domyślną
                      </button>
                      <button className="text-sm border border-red-200 text-red-600 px-3 py-1 hover:bg-red-50">
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border p-4 rounded">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-gray-100 rounded mr-3 flex items-center justify-center">
                        BLIK
                      </div>
                      <div>
                        <div className="font-medium">
                          BLIK - Płatność mobilna
                        </div>
                        <div className="text-sm text-gray-600">
                          Powiązany z +48 123 *** 789
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        Domyślna
                      </div>
                      <button className="text-sm border border-red-200 text-red-600 px-3 py-1 hover:bg-red-50">
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded">
                Dodaj nową metodę płatności
              </button>
            </div>
          )}

          {tab === "privacy" && (
            <div>
              <h2 className="font-semibold mb-4">Prywatność i zgody (RODO)</h2>
              <div className="mb-6">
                <div className="font-medium mb-2">Twoje zgody marketingowe</div>
                <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">
                      Zgadzam się na otrzymywanie newslettera
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">
                      Zgadzam się na przetwarzanie danych w celach
                      marketingowych
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">
                      Zgadzam się na otrzymywanie powiadomień o promocjach
                    </span>
                  </label>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded">
                  Zapisz zgody
                </button>
              </div>
              <div className="mb-6">
                <div className="font-medium mb-2">Twoje prawa (RODO)</div>
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Prawo dostępu do danych</li>
                    <li>• Prawo do sprostowania danych</li>
                    <li>
                      • Prawo do usunięcia danych ("prawo do bycia zapomnianym")
                    </li>
                    <li>• Prawo do ograniczenia przetwarzania</li>
                    <li>• Prawo do przenoszenia danych</li>
                    <li>• Prawo do sprzeciwu wobec przetwarzania</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-100 text-black px-4 py-2 rounded">
                    Pobierz moje dane
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Usuń konto
                  </button>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Dokumenty</div>
                <div className="space-y-2 text-sm">
                  <div>
                    <a
                      href="/privacy-policy"
                      className="text-blue-600 hover:underline"
                    >
                      Polityka prywatności
                    </a>
                  </div>
                  <div>
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Regulamin sklepu
                    </a>
                  </div>
                  <div>
                    <a
                      href="/cookies"
                      className="text-blue-600 hover:underline"
                    >
                      Polityka cookies
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
