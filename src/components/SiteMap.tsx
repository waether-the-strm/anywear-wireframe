

type SiteMapProps = {
  setCurrentPage?: (page: string) => void;
};

// Hierarchiczna struktura drzewa z mapowaniem na currentPage
const tree = [
  {
    label: 'Strona główna', page: 'home', children: [
      {
        label: 'Kolekcje', children: [
          { label: 'Tribal Collection', page: 'tribal' },
          { label: 'Corduroy Collection', page: 'corduroy' },
          { label: 'Velvet Collection', page: 'velvet' },
          { label: 'Pattern & Plaid', page: 'plaid' },
        ]
      },
      { label: 'Wszystkie produkty', page: 'all-products' },
      { label: 'Lookbook', children: [] },
      { label: 'O marce', page: 'about' },
    ]
  },
  {
    label: 'Karta produktu', page: 'product', children: []
  },
  {
    label: 'Koszyk', page: 'cart', children: [
      { label: 'Login', page: 'login' },
      { label: 'Checkout', page: 'checkout', children: [
        { label: 'Potwierdzenie zamówienia', page: 'order-confirmation' }
      ]}
    ]
  },
  {
    label: 'Konto użytkownika', page: 'account', children: []
  },
  {
    label: 'Mapa strony', page: 'sitemap', children: []
  }
];

const SiteMap = ({ setCurrentPage }: SiteMapProps) => {




  // Rekurencyjny renderer drzewa
  const renderTree = (nodes: any[], level = 0) => (
    <ul className={level === 0 ? "mb-8" : "ml-6 border-l-2 border-gray-200 pl-4"}>
      {nodes.map((node) => {
        const isClickable = !!node.page;
        return (
          <li key={node.label} className="mb-2">
            {isClickable ? (
              <button
                onClick={() => setCurrentPage && setCurrentPage(node.page)}
                className={`inline-block px-3 py-1 rounded font-medium transition text-left ${level === 0 ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-900'} border border-gray-200 hover:bg-blue-200`}
              >
                {node.label}
              </button>
            ) : (
              <span className="inline-block px-3 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200 font-medium">{node.label}</span>
            )}
            {node.children && node.children.length > 0 && renderTree(node.children, level + 1)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Mapa Strony ANYWEAR</h1>
          <p className="text-gray-600 mb-8">Klikalne węzły prowadzą do podstron wireframe. Struktura pokazuje relacje i ścieżki użytkownika.</p>
          {renderTree(tree)}

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Statystyki projektu</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">14</div>
                <div className="text-sm text-gray-600">Podstron wireframe</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-green-600">10+</div>
                <div className="text-sm text-gray-600">Głównych funkcji</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-sm text-gray-600">Kolekcje</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-orange-600">3-4</div>
                <div className="text-sm text-gray-600">Miesiące realizacji</div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Kluczowe funkcjonalności</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">E-commerce</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pełna ścieżka zakupowa</li>
                  <li>• Płatności online (Stripe, BLIK, P24)</li>
                  <li>• Zarządzanie kontami użytkowników</li>
                  <li>• System zamówień i śledzenia</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Funkcje dodatkowe</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lookbooki dla każdej kolekcji</li>
                  <li>• Zaawansowane filtry produktów</li>
                  <li>• Integracja z social media</li>
                  <li>• Wielojęzyczność i wielowalutowość</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
