import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Globe,
  User,
  Star,
  TrendingUp,
  TrendingDown,
  X,
  SlidersHorizontal,
  BarChart2,
  LineChart as LineChartIcon,
  Sun,
  Moon,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface IndexItem {
  id: string;
  name: string;
  symbol: string;
  badge: string;
  badgeBg: string;
  price: number;
  change: number;
  changePercent: number;
  region: 'US' | 'World' | 'Americas' | 'Europe' | 'Asia';
  path: string;
}

interface StockItem {
  symbol: string;
  name: string;
  logo: string;
  logoBg: string;
  price: number;
  changePercent: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  rating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  category: 'Stocks' | 'Crypto' | 'Forex' | 'Futures';
  marketCap: string;
  peRatio: number | null;
  history: number[];
}

const INDICES_DATA: IndexItem[] = [
  {
    id: 'spx',
    name: 'S&P 500',
    symbol: 'SPX',
    badge: '500',
    badgeBg: '#EA3943',
    price: 5088.80,
    change: 23.40,
    changePercent: 0.46,
    region: 'US',
    path: 'M0 18 Q 15 14, 25 16 T 50 8 T 70 6 L 80 4'
  },
  {
    id: 'ndx',
    name: 'Nasdaq 100',
    symbol: 'NDX',
    badge: '100',
    badgeBg: '#0094D3',
    price: 18230.15,
    change: 142.90,
    changePercent: 0.79,
    region: 'US',
    path: 'M0 19 Q 20 16, 35 12 T 60 7 L 80 3'
  },
  {
    id: 'dji',
    name: 'Dow 30',
    symbol: 'DJI',
    badge: '30',
    badgeBg: '#0052FF',
    price: 38989.84,
    change: -68.66,
    changePercent: -0.18,
    region: 'US',
    path: 'M0 6 Q 20 8, 40 14 T 65 16 L 80 20'
  },
  {
    id: 'rut',
    name: 'Russell 2000',
    symbol: 'RUT',
    badge: '2K',
    badgeBg: '#7B1FA2',
    price: 2056.32,
    change: 11.80,
    changePercent: 0.58,
    region: 'US',
    path: 'M0 16 Q 25 12, 45 15 T 65 8 L 80 6'
  },
  {
    id: 'ftse',
    name: 'FTSE 100',
    symbol: 'UKX',
    badge: '100',
    badgeBg: '#FF6D00',
    price: 7911.16,
    change: 32.40,
    changePercent: 0.41,
    region: 'Europe',
    path: 'M0 14 Q 25 13, 45 10 T 65 8 L 80 5'
  },
  {
    id: 'dax',
    name: 'DAX 40',
    symbol: 'DAX',
    badge: '40',
    badgeBg: '#00897B',
    price: 17735.07,
    change: 120.25,
    changePercent: 0.68,
    region: 'Europe',
    path: 'M0 18 Q 20 15, 45 11 T 65 7 L 80 3'
  },
  {
    id: 'nikkei',
    name: 'Nikkei 225',
    symbol: 'NI225',
    badge: '225',
    badgeBg: '#D32F2F',
    price: 39910.82,
    change: 744.63,
    changePercent: 1.90,
    region: 'Asia',
    path: 'M0 19 Q 20 14, 40 10 T 60 5 L 80 2'
  },
  {
    id: 'hangseng',
    name: 'Hang Seng',
    symbol: 'HSI',
    badge: 'HSI',
    badgeBg: '#1A237E',
    price: 16589.44,
    change: -124.50,
    changePercent: -0.75,
    region: 'Asia',
    path: 'M0 5 Q 25 8, 45 12 T 65 16 L 80 19'
  }
];

const INITIAL_STOCKS: StockItem[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    logo: 'N',
    logoBg: '#76B900',
    price: 791.12,
    changePercent: 3.18,
    change: 24.38,
    high: 794.80,
    low: 772.05,
    volume: '42.8M',
    rating: 'Strong Buy',
    category: 'Stocks',
    marketCap: '$1.97T',
    peRatio: 64.8,
    history: [768, 772, 770, 775, 781, 779, 785, 788, 792, 791.12]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: 'A',
    logoBg: '#131722',
    price: 181.16,
    changePercent: -0.42,
    change: -0.76,
    high: 182.75,
    low: 180.65,
    volume: '51.2M',
    rating: 'Neutral',
    category: 'Stocks',
    marketCap: '$2.80T',
    peRatio: 28.2,
    history: [182.5, 182.8, 182.1, 181.8, 181.2, 181.5, 181.0, 181.3, 181.16]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    logo: 'T',
    logoBg: '#E82127',
    price: 197.41,
    changePercent: 1.52,
    change: 2.96,
    high: 199.95,
    low: 193.67,
    volume: '78.4M',
    rating: 'Buy',
    category: 'Stocks',
    marketCap: '$628.1B',
    peRatio: 42.5,
    history: [193.8, 194.2, 195.1, 194.8, 196.2, 195.9, 197.8, 199.2, 197.41]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    logo: 'M',
    logoBg: '#00A4EF',
    price: 407.72,
    changePercent: 0.68,
    change: 2.75,
    high: 409.98,
    low: 404.52,
    volume: '19.3M',
    rating: 'Strong Buy',
    category: 'Stocks',
    marketCap: '$3.03T',
    peRatio: 36.4,
    history: [405, 404.8, 406.2, 405.9, 407.1, 408.5, 409.2, 408.0, 407.72]
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    logo: 'A',
    logoBg: '#FF9900',
    price: 174.99,
    changePercent: 0.87,
    change: 1.51,
    high: 176.12,
    low: 173.40,
    volume: '31.6M',
    rating: 'Buy',
    category: 'Stocks',
    marketCap: '$1.81T',
    peRatio: 58.1,
    history: [173.5, 174.1, 173.9, 174.5, 175.2, 175.8, 174.6, 175.1, 174.99]
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    logo: '₿',
    logoBg: '#F7931A',
    price: 61420.00,
    changePercent: 4.85,
    change: 2840.50,
    high: 62100.00,
    low: 58350.00,
    volume: '38.9B',
    rating: 'Strong Buy',
    category: 'Crypto',
    marketCap: '$1.21T',
    peRatio: null,
    history: [58600, 58900, 59400, 59200, 60100, 60800, 61500, 61200, 61420]
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    logo: 'Ξ',
    logoBg: '#627EEA',
    price: 3452.80,
    changePercent: 2.57,
    change: 86.40,
    high: 3512.00,
    low: 3360.00,
    volume: '18.4B',
    rating: 'Buy',
    category: 'Crypto',
    marketCap: '$415.2B',
    peRatio: null,
    history: [3370, 3390, 3410, 3400, 3430, 3470, 3490, 3452.8]
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    logo: '€',
    logoBg: '#003399',
    price: 1.0842,
    changePercent: 0.17,
    change: 0.0018,
    high: 1.0865,
    low: 1.0820,
    volume: '112.5B',
    rating: 'Buy',
    category: 'Forex',
    marketCap: 'FX Market',
    peRatio: null,
    history: [1.0825, 1.0832, 1.0845, 1.0840, 1.0842]
  }
];

export default function App() {
  const [stocks, setStocks] = useState<StockItem[]>(INITIAL_STOCKS);
  const [activeCategory, setActiveCategory] = useState<string>('Overview');
  const [activeRegion, setActiveRegion] = useState<string>('United States');
  const [activeTab, setActiveTab] = useState<string>('Trending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['NVDA', 'BTCUSD'];
    } catch {
      return ['NVDA', 'BTCUSD'];
    }
  });
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1D');
  const [tradeSuccess, setTradeSuccess] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState<boolean>(false);

  // Sync watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Live price tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => {
        const randIndex = Math.floor(Math.random() * prev.length);
        return prev.map((item, idx) => {
          if (idx !== randIndex) return item;
          const deltaPct = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
          const newPrice = +(item.price * (1 + deltaPct / 100)).toFixed(item.price < 5 ? 4 : 2);
          const newChange = +(newPrice - (item.price - item.change)).toFixed(item.price < 5 ? 4 : 2);
          const newPct = +((newChange / (newPrice - newChange)) * 100).toFixed(2);
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newPct,
            high: Math.max(item.high, newPrice),
            low: Math.min(item.low, newPrice),
            history: [...item.history.slice(1), newPrice]
          };
        });
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const toggleWatchlist = (symbol: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchlist(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  // Filtered indices by region
  const filteredIndices = useMemo(() => {
    if (activeRegion === 'United States') return INDICES_DATA.filter(i => i.region === 'US');
    if (activeRegion === 'Europe') return INDICES_DATA.filter(i => i.region === 'Europe');
    if (activeRegion === 'Asia') return INDICES_DATA.filter(i => i.region === 'Asia');
    if (activeRegion === 'Americas') return INDICES_DATA.filter(i => i.region === 'US' || i.region === 'Americas');
    return INDICES_DATA;
  }, [activeRegion]);

  // Filtered screener stocks
  const filteredStocks = useMemo(() => {
    let result = stocks;
    if (showWatchlistOnly) {
      result = result.filter(s => watchlist.includes(s.symbol));
    }
    if (activeCategory === 'Stocks') result = result.filter(s => s.category === 'Stocks');
    if (activeCategory === 'Crypto') result = result.filter(s => s.category === 'Crypto');
    if (activeCategory === 'Forex') result = result.filter(s => s.category === 'Forex');

    if (activeTab === 'Gainers') {
      result = [...result].sort((a, b) => b.changePercent - a.changePercent);
    } else if (activeTab === 'Losers') {
      result = [...result].sort((a, b) => a.changePercent - b.changePercent);
    } else if (activeTab === 'Most Active') {
      result = [...result].sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
    } else if (activeTab === 'Cryptocurrencies') {
      result = result.filter(s => s.category === 'Crypto');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }
    return result;
  }, [stocks, activeCategory, activeTab, searchQuery, showWatchlistOnly, watchlist]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-white text-[#131722]'}`}>
      {/* BEGIN: MainHeader */}
      <header className={`w-full border-b sticky top-0 z-40 ${isDarkMode ? 'border-[#2A2E39] bg-[#131722]' : 'border-[#E0E3EB] bg-white'}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-7 h-16 flex items-center justify-between gap-4">
          {/* Logo & Left Navigation */}
          <div className="flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => { setActiveCategory('Overview'); setShowWatchlistOnly(false); }}
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="TradingView Home"
            >
              <svg className={`w-8 h-8 fill-current transition-transform group-hover:scale-105 ${isDarkMode ? 'text-white' : 'text-black'}`} viewBox="0 0 36 28">
                <path d="M4 22H0V6h4v16zm8-16H8v22h4V6zm14 0h-4v22h4V6zm10 0h-4v10h4V6z" />
                <path d="M12 0H0v4h12V0zm14 0H14v4h12V0zm10 0H28v4h8V0z" />
              </svg>
            </button>

            {/* Global Search Bar */}
            <div className="relative w-48 md:w-64 lg:w-72">
              <div
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border ${isDarkMode ? 'bg-[#1E222D] border-transparent text-[#787B86] hover:bg-[#2A2E39] hover:text-white' : 'bg-[#F0F3FA] border-transparent text-[#787B86] hover:bg-[#E5E9F0] hover:text-[#131722]'}`}
              >
                <Search className="w-4 h-4 mr-2.5 text-[#787B86]" />
                <span className="text-sm font-normal text-gray-500 flex-1 truncate">Search (Ctrl+K)</span>
              </div>
            </div>

            {/* Primary Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-[15px] font-semibold">
              <a href="#" className={`transition-colors hover:text-[#2962FF] ${isDarkMode ? 'text-[#d1d4dc]' : 'text-[#131722]'}`}>Products</a>
              <a href="#" className={`transition-colors hover:text-[#2962FF] ${isDarkMode ? 'text-[#d1d4dc]' : 'text-[#131722]'}`}>Community</a>
              <a href="#" className="text-[#2962FF] font-bold relative py-5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#2962FF]">
                Markets
              </a>
              <a href="#" className={`transition-colors hover:text-[#2962FF] ${isDarkMode ? 'text-[#d1d4dc]' : 'text-[#131722]'}`}>Brokers</a>
              <a href="#" className={`transition-colors hover:text-[#2962FF] ${isDarkMode ? 'text-[#d1d4dc]' : 'text-[#131722]'}`}>More</a>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Watchlist toggle badge */}
            <button
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${showWatchlistOnly ? 'bg-amber-100 text-amber-900 border border-amber-300' : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}
              title="Filter by Watchlist"
            >
              <Star className={`w-4 h-4 ${showWatchlistOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">Watchlist</span>
              <span className="bg-[#2962FF] text-white text-[10px] px-1.5 py-0.2 rounded-full">{watchlist.length}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-700'}`}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language */}
            <button className={`flex items-center gap-1.5 text-sm font-semibold p-1.5 rounded-md transition-colors ${isDarkMode ? 'text-gray-300 hover:text-[#2962FF]' : 'text-[#131722] hover:text-[#2962FF]'}`}>
              <Globe className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-bold">EN</span>
            </button>

            {/* Profile */}
            <button className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-[#131722] hover:bg-gray-100'}`}>
              <User className="w-6 h-6" />
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="btn-gradient text-white text-[14px] font-semibold px-5 py-2 rounded-full inline-flex items-center justify-center shadow-sm cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* BEGIN: SubHeaderNav */}
      <nav className={`border-b ${isDarkMode ? 'border-[#2A2E39] bg-[#131722]' : 'border-[#E0E3EB] bg-white'}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-7 flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 custom-scrollbar text-sm font-semibold whitespace-nowrap">
          {['Overview', 'Indices', 'Stocks', 'Crypto', 'Forex', 'Futures', 'Bonds', 'World Economy'].map(cat => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowWatchlistOnly(false); }}
                className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isSelected
                    ? isDarkMode ? 'bg-white text-black font-semibold' : 'bg-[#131722] text-white font-medium'
                    : isDarkMode ? 'text-gray-400 hover:bg-[#1E222D]' : 'text-[#131722] hover:bg-[#F0F3FA]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </nav>

      {/* BEGIN: MainContent */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-7 pt-10 pb-20">
        {/* BEGIN: HeroSection */}
        <section className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 cursor-pointer group select-none">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Markets, everywhere
            </h1>
            <span className={`inline-flex items-center justify-center p-1 rounded-full transition-colors ${isDarkMode ? 'group-hover:bg-gray-800' : 'group-hover:bg-gray-100'}`}>
              <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </span>
          </div>

          {/* Quick Region Selector Filters */}
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm font-medium">
            {['United States', 'World', 'Americas', 'Europe', 'Asia'].map(region => {
              const isSelected = activeRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF3FF] text-[#2962FF] font-semibold'
                      : 'text-[#787B86] hover:text-[#131722] hover:bg-gray-100'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </section>

        {/* BEGIN: Indices Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <button className={`inline-flex items-center gap-1.5 group text-2xl font-bold transition-colors ${isDarkMode ? 'text-white hover:text-[#2962FF]' : 'text-[#131722] hover:text-[#2962FF]'}`}>
              <span>Indices</span>
              <ChevronRight className="w-5 h-5 mt-0.5 group-hover:translate-x-0.5 transition-all text-[#2962FF]" />
            </button>
            <div className="flex items-center gap-1">
              <button aria-label="Previous indices" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isDarkMode ? 'border-[#2A2E39] text-gray-400 hover:text-white' : 'border-[#E0E3EB] text-[#787B86] hover:text-[#131722]'}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button aria-label="Next indices" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isDarkMode ? 'border-[#2A2E39] text-gray-400 hover:text-white' : 'border-[#E0E3EB] text-[#787B86] hover:text-[#131722]'}`}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Indices Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredIndices.slice(0, 4).map(idx => {
              const isPositive = idx.change >= 0;
              return (
                <div
                  key={idx.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isDarkMode
                      ? 'border-[#2A2E39] bg-[#1E222D] hover:border-gray-500'
                      : 'border-[#E0E3EB] bg-white hover:border-gray-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-sm"
                        style={{ backgroundColor: idx.badgeBg }}
                      >
                        {idx.badge}
                      </span>
                      <div>
                        <h2 className={`text-sm font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                          {idx.name}
                        </h2>
                        <span className="text-xs text-[#787B86] font-mono uppercase">{idx.symbol}</span>
                      </div>
                    </div>
                    {/* Sparkline */}
                    <svg className="w-20 h-7 overflow-visible" fill="none" viewBox="0 0 80 24">
                      <path
                        d={idx.path}
                        fill="none"
                        stroke={isPositive ? '#089981' : '#F23645'}
                        strokeLinecap="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className={`text-lg font-bold num-mono ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {idx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded ${
                      isPositive ? 'text-[#089981] bg-emerald-50' : 'text-[#F23645] bg-rose-50'
                    }`}>
                      <span>{isPositive ? `+${idx.change.toFixed(2)}` : idx.change.toFixed(2)}</span>
                      <span>({isPositive ? `+${idx.changePercent.toFixed(2)}` : idx.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BEGIN: MarketDataTableSection */}
        <section className={`border rounded-xl overflow-hidden shadow-sm ${isDarkMode ? 'border-[#2A2E39] bg-[#1E222D]' : 'border-[#E0E3EB] bg-white'}`}>
          {/* Table Header Navigation Tabs */}
          <div className={`px-5 pt-4 pb-0 border-b flex items-center justify-between flex-wrap gap-4 ${isDarkMode ? 'border-[#2A2E39]' : 'border-[#E0E3EB]'}`}>
            <div className="flex items-center space-x-6 text-sm font-semibold">
              {['Trending', 'Most Active', 'Gainers', 'Losers', 'Cryptocurrencies'].map(tab => {
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 focus:outline-none transition-colors ${
                      isSelected
                        ? 'text-[#2962FF] border-b-2 border-[#2962FF] font-bold'
                        : 'text-[#787B86] hover:text-[#131722] border-b-2 border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            <div className="pb-3 flex items-center gap-2">
              <span className="text-xs text-[#787B86] font-medium">Real-time Data</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

          {/* Financial Data Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`text-[12px] font-semibold border-b uppercase tracking-wider ${
                  isDarkMode ? 'border-[#2A2E39] bg-[#131722] text-[#787B86]' : 'border-[#E0E3EB] bg-[#FAFBFC] text-[#787B86]'
                }`}>
                  <th className="py-3 px-5" scope="col">Symbol</th>
                  <th className="py-3 px-4 text-right" scope="col">Price (USD)</th>
                  <th className="py-3 px-4 text-right" scope="col">Change %</th>
                  <th className="py-3 px-4 text-right" scope="col">Change</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell" scope="col">High</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell" scope="col">Low</th>
                  <th className="py-3 px-4 text-right hidden md:table-cell" scope="col">Volume</th>
                  <th className="py-3 px-5 text-center" scope="col">Technical Rating</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-medium ${isDarkMode ? 'divide-[#2A2E39]' : 'divide-[#E0E3EB]'}`}>
                {filteredStocks.map(stock => {
                  const isPositive = stock.change >= 0;
                  const isFav = watchlist.includes(stock.symbol);
                  return (
                    <tr
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`transition-colors cursor-pointer group ${
                        isDarkMode ? 'hover:bg-[#2A2E39]/60' : 'hover:bg-[#F0F3FA]/70'
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => toggleWatchlist(stock.symbol, e)}
                            className="text-gray-400 hover:text-amber-400"
                          >
                            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                          <span
                            className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm"
                            style={{ backgroundColor: stock.logoBg }}
                          >
                            {stock.logo}
                          </span>
                          <div>
                            <span className={`font-bold transition-colors group-hover:text-[#2962FF] ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                              {stock.symbol}
                            </span>
                            <span className="text-xs text-[#787B86] block">{stock.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className={`py-3.5 px-4 text-right num-mono font-bold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                        {stock.price.toLocaleString(undefined, { minimumFractionDigits: stock.price < 5 ? 4 : 2 })}
                      </td>
                      <td className={`py-3.5 px-4 text-right num-mono font-bold ${isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                      </td>
                      <td className={`py-3.5 px-4 text-right num-mono font-medium ${isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {isPositive ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right num-mono text-[#787B86] hidden sm:table-cell">
                        {stock.high.toLocaleString(undefined, { minimumFractionDigits: stock.price < 5 ? 4 : 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-right num-mono text-[#787B86] hidden sm:table-cell">
                        {stock.low.toLocaleString(undefined, { minimumFractionDigits: stock.price < 5 ? 4 : 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-right num-mono text-[#787B86] hidden md:table-cell">
                        {stock.volume}
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          stock.rating === 'Strong Buy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : stock.rating === 'Buy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : stock.rating === 'Neutral'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {stock.rating}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer */}
          <div className={`p-3 text-center border-t ${isDarkMode ? 'bg-[#131722] border-[#2A2E39]' : 'bg-[#FAFBFC] border-[#E0E3EB]'}`}>
            <button
              onClick={() => setActiveCategory('Stocks')}
              className="text-sm font-semibold text-[#2962FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View entire market screener</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Asset Detail Modal */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className={`w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#1E222D] text-white' : 'bg-white text-[#131722]'}`}>
            <button
              onClick={() => setSelectedStock(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-base shadow-sm"
                style={{ backgroundColor: selectedStock.logoBg }}
              >
                {selectedStock.logo}
              </span>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {selectedStock.symbol}
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">{selectedStock.category}</span>
                </h3>
                <p className="text-sm text-gray-500">{selectedStock.name}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-extrabold num-mono">${selectedStock.price.toLocaleString()}</span>
              <span className={`text-base font-bold num-mono ${selectedStock.change >= 0 ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                {selectedStock.change >= 0 ? `+${selectedStock.change.toFixed(2)}` : selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
              </span>
            </div>

            {/* Timeframe & Chart Type buttons */}
            <div className="flex items-center justify-between border-b pb-3 mb-4 border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                {['1D', '5D', '1M', '6M', '1Y', 'ALL'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${selectedTimeframe === tf ? 'bg-[#2962FF] text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setChartType('area')}
                  className={`p-1.5 rounded ${chartType === 'area' ? 'bg-white dark:bg-gray-700 shadow-xs' : 'text-gray-500'}`}
                >
                  <LineChartIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('candles')}
                  className={`p-1.5 rounded ${chartType === 'candles' ? 'bg-white dark:bg-gray-700 shadow-xs' : 'text-gray-500'}`}
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Chart */}
            <div className="h-44 w-full mb-6 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2962FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2962FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,90 Q50,70 100,75 T200,45 T300,50 T400,20 L400,120 L0,120 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,90 Q50,70 100,75 T200,45 T300,50 T400,20"
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 mb-6 text-sm">
              <div>
                <span className="text-gray-500 block text-xs">High (Day)</span>
                <span className="font-semibold num-mono">${selectedStock.high}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Low (Day)</span>
                <span className="font-semibold num-mono">${selectedStock.low}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Market Cap</span>
                <span className="font-semibold num-mono">{selectedStock.marketCap}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Volume</span>
                <span className="font-semibold num-mono">{selectedStock.volume}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTradeSuccess(`Simulated Buy order placed for 10 shares of ${selectedStock.symbol} at $${selectedStock.price}!`);
                  setTimeout(() => setTradeSuccess(null), 3000);
                }}
                className="flex-1 py-3 bg-[#089981] hover:bg-[#07856F] text-white font-bold rounded-xl shadow-sm transition-colors text-sm cursor-pointer"
              >
                Buy {selectedStock.symbol}
              </button>
              <button
                onClick={() => {
                  setTradeSuccess(`Simulated Sell order placed for 10 shares of ${selectedStock.symbol} at $${selectedStock.price}!`);
                  setTimeout(() => setTradeSuccess(null), 3000);
                }}
                className="flex-1 py-3 bg-[#F23645] hover:bg-[#D92A38] text-white font-bold rounded-xl shadow-sm transition-colors text-sm cursor-pointer"
              >
                Sell {selectedStock.symbol}
              </button>
            </div>

            {tradeSuccess && (
              <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{tradeSuccess}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-xl rounded-2xl shadow-2xl p-4 border ${isDarkMode ? 'bg-[#1E222D] border-[#2A2E39]' : 'bg-white border-[#E0E3EB]'}`}>
            <div className="flex items-center gap-3 border-b pb-3 border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search stocks, crypto, forex, indices..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-base"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStocks.map(stock => (
                <div
                  key={stock.symbol}
                  onClick={() => {
                    setSelectedStock(stock);
                    setIsSearchOpen(false);
                  }}
                  className="py-2.5 px-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: stock.logoBg }}
                    >
                      {stock.logo}
                    </span>
                    <div>
                      <span className="font-bold text-sm block">{stock.symbol}</span>
                      <span className="text-xs text-gray-400">{stock.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold">${stock.price}</span>
                    <span className={`text-xs block ${stock.change >= 0 ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                      {stock.change >= 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BEGIN: MinimalFooter */}
      <footer className={`border-t py-8 text-xs text-[#787B86] ${isDarkMode ? 'border-[#2A2E39] bg-[#131722]' : 'border-[#E0E3EB] bg-white'}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <span>© 2026 TradingView</span>
            <a href="#" className="hover:text-[#131722] dark:hover:text-white transition-colors">Terms of use</a>
            <a href="#" className="hover:text-[#131722] dark:hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-[#131722] dark:hover:text-white transition-colors">Cookies</a>
          </div>
          <div>
            <span>Quotes and data provided by leading financial exchanges.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
