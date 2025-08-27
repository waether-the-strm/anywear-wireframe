import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-16 py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-bold text-xl mb-4">ANYWEAR</div>
          <p className="text-gray-400">
            Odzież dla tancerzy hip-hop i miłośników streetwear
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">KOLEKCJE</div>
          <div className="space-y-2 text-gray-400">
            <div>Tribal</div>
            <div>Corduroy</div>
            <div>Velvet</div>
            <div>Pattern & Plaid</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">POMOC</div>
          <div className="space-y-2 text-gray-400">
            <div>Size Guide</div>
            <div>Dostawa</div>
            <div>Zwroty</div>
            <div>Kontakt</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">SOCIAL</div>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-600">[IG]</div>
            <div className="w-8 h-8 bg-gray-600">[FB]</div>
            <div className="w-8 h-8 bg-gray-600">[TT]</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
