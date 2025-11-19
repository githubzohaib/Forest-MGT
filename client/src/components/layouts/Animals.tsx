import React, { useState, useEffect } from 'react';
import { Search, Leaf, AlertCircle, Loader, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const amazonPopulation = {
  'jaguar': 'Approximately 64,000 individuals in the Amazon',
  'anaconda': 'Estimated at 40,000+ individuals',
  'sloth': 'Estimated 4 million individuals',
  'pink river dolphin': 'Estimated 53,000 individuals',
  'harpy eagle': 'Estimated 10,000 pairs in the Amazon',
  'poison dart frog': 'Over 100,000+ individuals',
  'capybara': 'Estimated 3-4 million in South America',
  'toucan': 'Estimated 500,000+ in the Amazon',
  'macaw': 'Estimated 100,000+ pairs',
  'boa constrictor': 'Estimated 1+ million individuals'
};


export default function AmazonWildlifeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [animalInfo, setAnimalInfo] = useState<any>(null);
  const [population, setPopulation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState('');

  const [dbAnimals, setDbAnimals] = useState([]);

  useEffect(() => {
  const fetchDBAnimals = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/animals");
      const data = await res.json();
      setDbAnimals(data);
    } catch (err) {
      console.error("Error fetching animal database", err);
    }
  };

  fetchDBAnimals();
 }, []);



  const API_NINJAS_KEY = '44EVcRXva+7WaoKyHQObog==DXYzTXZmmDKKwW4H';
  const UNSPLASH_KEY = 'I3OXnoZ_e4Di06zuuCmZjnbAQNO6wRUMivIwJqAg81U';

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      setError('Please enter an animal name');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');
    setAnimalInfo(null);
    setPopulation('');
    setImageUrl('');

    try {
      // Wikipedia summary
      const wikiResp = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      const wikiData = await wikiResp.json();
      setSummary(wikiData?.extract || 'No Wikipedia page found for this species.');

      // API Ninjas info
      const ninjasResp = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(query)}`,
        { headers: { 'X-Api-Key': API_NINJAS_KEY } }
      );
      const ninjasData = await ninjasResp.json();
      if (ninjasData?.length > 0) setAnimalInfo(ninjasData[0]);

      // Amazon population
      // const popKey = Object.keys(amazonPopulation).find(
      //   key => key.toLowerCase() === query.toLowerCase()
      // );
      // setPopulation(popKey ? amazonPopulation[popKey as keyof typeof amazonPopulation] : "This species does not live in the Amazon");

      
      const match = dbAnimals.find(
        (a) => a.name.toLowerCase() === query.toLowerCase()
      );

      if (match) {
        setPopulation(match.population);
      } else {
        setPopulation("Population data not found in database");
      }

      // Unsplash image
      const unsplashResp = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=1`
      );
      const unsplashData = await unsplashResp.json();
      if (unsplashData?.results?.length > 0) {
        setImageUrl(unsplashData.results[0].urls.full);
      }

      // Add to history
      setSearchHistory(prev => {
        const updated = [query, ...prev.filter(i => i !== query)];
        return updated.slice(0, 10);
      });

    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Glassmorphic card classes
  const glassCard =
    'bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 md:p-6 mb-4';

  return (
    <div className="fixed inset-0 flex flex-col text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background2.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div> {/* Optional dark overlay */}
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setFullscreenImage('')}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="w-[90vw] max-w-[600px] aspect-square flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={fullscreenImage}
              alt="Full size"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative flex-1 overflow-y-auto p-2 md:p-3">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full mb-2 shadow-2xl">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">EcoGuard</h1>
          <p className="text-emerald-300 text-xs md:text-sm">Amazon Wildlife Search</p>
        </div>

        {/* Search Card */}
        <div className={glassCard}>
          <label className="block text-white/90 text-sm font-semibold mb-2">Search Amazon Wildlife</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter animal name (e.g., Jaguar, Anaconda)"
                className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold text-white ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800'
              }`}
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-100/30 text-red-700 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}
        </div>

        {/* Result Image */}
        {imageUrl && (
          <div className={`${glassCard} overflow-hidden aspect-square`}>
            <button
              onClick={() => setFullscreenImage(imageUrl)}
              className="w-full h-full hover:opacity-90 transition cursor-pointer"
            >
              <img
                src={imageUrl}
                alt={searchQuery}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className={glassCard}>
            <h2 className="text-lg font-bold text-white mb-2">Description</h2>
            <p className="text-white/90">{summary}</p>
          </div>
        )}

        {/* Animal Info */}
        {animalInfo && (
          <div className={glassCard}>
            <h2 className="text-lg font-bold text-white mb-2">Animal Info</h2>
            <p className="text-white/90"><span className="font-semibold">Habitat:</span> {animalInfo.characteristics?.habitat}</p>
            <p className="text-white/90"><span className="font-semibold">Diet:</span> {animalInfo.characteristics?.diet}</p>
          </div>
        )}

        {/* Population */}
        {population && (
          <div className={glassCard}>
            <h2 className="text-lg font-bold text-white mb-2">Amazon Population</h2>
            <p className="text-white/90">{population}</p>
          </div>
        )}

     


        {/* 🗺️ Amazon Jungle Map */}
        <div className={glassCard}>
          <h2 className="text-lg font-bold text-white mb-2">Amazon Jungle Map</h2>
          <div className="w-full h-[300px] rounded-xl overflow-hidden">
            <MapContainer
              center={[-3.4653, -62.2159]}
              zoom={5}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <Marker position={[-3.4653, -62.2159]}>
                <Popup>Amazon Rainforest Region 🌳</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className={glassCard}>
            <h3 className="text-base font-semibold text-white mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { setSearchQuery(item); handleSearch(item); }}
                  className="px-3 py-1 bg-emerald-100/30 text-emerald-700 rounded-full text-sm hover:bg-emerald-200/40"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-emerald-200 text-xs mt-6 mb-2">© 2025 EcoGuard System</p>
      </div>
    </div>
  );
}
