export interface MetalPrice {
  metal: string;
  purity: string;
  pricePerGram: number;
  change: number;
}

export const getLiveMarketRates = async (): Promise<MetalPrice[]> => {
  // In production, replace with: 
  // const res = await fetch(`https://www.goldapi.io/api/XAU/INR`, { headers: { 'x-access-token': 'YOUR_KEY' } });
  
  return [
    { metal: 'Gold', purity: '24K', pricePerGram: 7245.50, change: 12.5 },
    { metal: 'Gold', purity: '22K', pricePerGram: 6642.00, change: 11.2 },
    { metal: 'Silver', purity: '999', pricePerGram: 91.20, change: -0.45 },
    { metal: 'Platinum', purity: '950', pricePerGram: 2850.00, change: 5.2 },
  ];
};
