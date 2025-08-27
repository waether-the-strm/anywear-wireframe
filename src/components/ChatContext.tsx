/**
 * Kontekst biznesowy dla okna czatu Anywear
 * 
 * PODSUMOWANIE KONTEKSTU BIZNESOWEGO
 * ----------------------------------
 * 
 * O MARCE
 * Anywear to polska marka odzieżowa specjalizująca się w wysokiej jakości odzieży codziennej.
 * Firma stawia na zrównoważony rozwój, etyczną produkcję i unikalne wzornictwo.
 * Kolekcje Anywear charakteryzują się unikalnym podejściem do mody, łącząc nowoczesne kroje
 * z tradycyjnymi teksturami i wzorami.
 * 
 * KOLEKCJE
 * - Tribal Collection: Flagowa kolekcja inspirowana motywami etnicznymi
 * - Corduroy: Kolekcja z wysokiej jakości sztruksu, podkreślająca trwałość i styl retro
 * - Velvet: Ekskluzywna kolekcja z aksamitnych materiałów
 * - Pattern & Plaid: Kolekcja wzorzystych tkanin i kratki
 * 
 * GŁÓWNE CELE OBSŁUGI KLIENTA
 * 1. Szybka pomoc w wyborze odpowiedniego rozmiaru i dopasowaniu produktów
 * 2. Informacje o dostępności produktów i czasie dostawy
 * 3. Pomoc przy problemach z zamówieniami, zwrotami i reklamacjami
 * 4. Odpowiedzi na pytania dotyczące materiałów i pielęgnacji odzieży
 * 5. Wsparcie podczas procesu zakupowego
 * 
 * KLUCZOWE PROCESY DO WSPARCIA PRZEZ CHAT
 * - Pomoc w wyborze rozmiaru (tabele rozmiarów, porady dotyczące dopasowania)
 * - Status zamówienia i śledzenie przesyłki
 * - Procedura zwrotu i reklamacji
 * - Pomoc w zakładaniu konta i zarządzaniu zamówieniami
 * - Informacje o aktualnych promocjach i nowościach
 * - Porady stylistyczne i pomoc w kompletowaniu stylizacji
 * 
 * POLITYKA FIRMY
 * - 30-dniowe prawo zwrotu
 * - Darmowa dostawa dla zamówień powyżej 200 PLN
 * - Program lojalnościowy z trzema poziomami: Standard, Silver, Gold
 * - Zgodność z przepisami RODO/GDPR dotyczącymi ochrony danych osobowych
 * - Zrównoważony rozwój i odpowiedzialność społeczna (materiały ekologiczne, redukcja odpadów)
 * 
 * DANE KONTAKTOWE (DO PRZEKIEROWANIA POZA CHAT)
 * - Email: kontakt@anywear.pl
 * - Telefon: +48 22 123 45 67 (pon-pt, 9-17)
 * - Adres: ul. Modowa 42, 00-001 Warszawa
 * 
 * TYPOWE SCENARIUSZE ROZMOWY
 * 1. Zapytanie o dostępność produktu i czas dostawy
 * 2. Problemy z wyborem rozmiaru
 * 3. Status zamówienia/śledzenie
 * 4. Procedura zwrotu i reklamacji
 * 5. Pytania o skład materiałowy i pielęgnację
 * 6. Pomoc przy finalizacji zamówienia
 * 7. Pytania o program lojalnościowy
 * 
 * TONE OF VOICE
 * - Profesjonalny, ale przyjazny
 * - Pomocny i zorientowany na rozwiązanie
 * - Entuzjastyczny wobec produktów
 * - Zwięzły i konkretny
 * - Zachęcający do zakupu, ale bez nachalnego marketingu
 * - Używanie emojii w umiarkowanym stopniu jest dozwolone dla wyrażenia entuzjazmu
 * 
 * WAŻNE LINKI DO PRZEKIEROWANIA
 * - Tabela rozmiarów: /size-guide
 * - Regulamin sklepu: /terms
 * - Polityka prywatności: /privacy-policy
 * - FAQ: /faq
 * - Status zamówienia: /account/orders
 * - Formularz zwrotu: /returns
 * 
 * INTEGRACJA Z PROCESAMI E-COMMERCE
 * Chat powinien być w stanie:
 * - Przekierować klienta do odpowiedniej kategorii produktów
 * - Wyświetlić informacje o statusie zamówienia po podaniu jego numeru
 * - Pomóc w wypełnieniu formularza zwrotu
 * - Udzielić informacji o aktualnych promocjach
 * - Wyświetlić tabele rozmiarów dla różnych typów produktów
 */

// Komponent kontekstu czatu można rozbudować o właściwe funkcje i stan w przyszłości

import React, { createContext, useContext, useState } from 'react';

interface ChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>) => void;
  // Dodać więcej funkcji i stanu według potrzeb
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Witaj w Anywear! W czym mogę pomóc?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, {
      ...message,
      id: Date.now().toString()
    }]);
  };

  return (
    <ChatContext.Provider value={{
      isOpen,
      toggleChat,
      messages,
      addMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;
