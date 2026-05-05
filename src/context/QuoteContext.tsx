import { createContext, useContext, useState, type ReactNode } from 'react';

interface QuoteData {
  rego: string;
  make: string;
  model: string;
  year: string;
  usage: string;
  kmsPerYear: string;
  parking: string;
  security: string;
  driverAge: string;
  licenceType: string;
  ncdYears: string;
  claimsHistory: string;
  postcode: string;
  suburb: string;
  coverType: string;
  policyTier: string;
  excess: number;
  extras: string[];
  abVariant: string;
  premium: number;
  paymentFrequency: string;
  quoteId: string;
}

const defaultQuote: QuoteData = {
  rego: '',
  make: 'Toyota',
  model: 'Camry',
  year: '2022',
  usage: 'Private',
  kmsPerYear: '10,000 - 15,000',
  parking: 'Garage',
  security: 'Factory immobiliser',
  driverAge: '35',
  licenceType: 'Full',
  ncdYears: '5+',
  claimsHistory: 'No claims',
  postcode: '2000',
  suburb: 'Sydney',
  coverType: 'Comprehensive',
  policyTier: 'Gold',
  excess: 850,
  extras: [],
  abVariant: '',
  premium: 1847,
  paymentFrequency: 'Annual',
  quoteId: 'QT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
};

interface QuoteContextValue {
  quote: QuoteData;
  updateQuote: (partial: Partial<QuoteData>) => void;
  resetQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<QuoteData>(defaultQuote);

  const updateQuote = (partial: Partial<QuoteData>) => {
    setQuote((prev) => ({ ...prev, ...partial }));
  };

  const resetQuote = () => setQuote(defaultQuote);

  return (
    <QuoteContext.Provider value={{ quote, updateQuote, resetQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');
  return ctx;
}
