export interface RootObject {
  data: Datum[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface Datum {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level?: string;
  hp: string;
  types: string[];
  evolvesFrom?: string;
  abilities?: Ability[];
  attacks: Attack[];
  weaknesses: Weakness[];
  resistances?: Weakness[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images2;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
  evolvesTo?: string[];
  rules?: string[];
  regulationMark?: string;
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: Prices2;
}

export interface Prices2 {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Prices {
  holofoil?: Holofoil;
  reverseHolofoil?: Holofoil;
  normal?: Holofoil;
}

export interface Holofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export interface Images2 {
  small: string;
  large: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

export interface Images {
  symbol: string;
  logo: string;
}

export interface Legalities {
  unlimited: string;
  expanded?: string;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}
