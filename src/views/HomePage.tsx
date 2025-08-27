import React from "react";

const HomePage = ({ setCurrentPage }) => (
  <div>
    {/* Hero Section */}
    <div className="bg-gray-200 h-96 flex items-center justify-center mb-8">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">[HERO VIDEO/IMAGE]</div>
        <div className="text-xl mb-4">Najnowsza kolekcja TRIBAL</div>
        <div className="w-32 h-10 bg-gray-400 mx-auto">[CTA BUTTON]</div>
      </div>
    </div>
    {/* Featured Collections */}
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">KOLEKCJE</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {["TRIBAL", "CORDUROY", "VELVET", "PLAID & PATTERN"].map(
          (collection) => (
            <div
              key={collection}
              className="bg-gray-200 h-64 flex flex-col justify-between p-4 cursor-pointer hover:bg-gray-300"
              onClick={() =>
                setCurrentPage(collection.toLowerCase().replace(" & ", ""))
              }
            >
              <div className="bg-gray-300 h-40 mb-2">[COLLECTION IMAGE]</div>
              <div className="text-center font-bold">{collection}</div>
            </div>
          )
        )}
      </div>
    </div>
    {/* Instagram Feed */}
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        @ANYWEAR na INSTAGRAM
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-200 aspect-square">
            [IG POST {i}]
          </div>
        ))}
      </div>
    </div>
    {/* Testimonials */}
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">CO MÓWIĄ TANCERZE</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6">
              <div className="bg-gray-200 w-16 h-16 rounded-full mx-auto mb-4">
                [AVATAR]
              </div>
              <div className="mb-2">"Lorem ipsum testimonial..."</div>
              <div className="font-bold">Imię Nazwisko</div>
              <div className="text-sm text-gray-600">Tancerz Hip-Hop</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
