import './Search.scss'
import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const API_URL = import.meta.env.VITE_API_URL;

interface Filters {
  name: string;
  discipline: string;
  club: string;
  weightMin: string;
  weightMax: string;
  victoryMin: string;
  defeatMax: string;
}

const initialFilters: Filters = {
  name: "",
  discipline: "",
  club: "",
  weightMin: "",
  weightMax: "",
  victoryMin: "",
  defeatMax: "",
};

interface SportProfilResult {
  id: number;
  discipline: string;
  club: string;
  weight: number;
  victory: number;
  defeat: number;
  User: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string | null;
  };
}

const SearchFilter = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [results, setResults] = useState<SportProfilResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const buildQueryParams = (filters: Filters) => {
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.discipline) params.append("discipline", filters.discipline);
    if (filters.club) params.append("club", filters.club);
    if (filters.weightMin) params.append("weightMin", filters.weightMin);
    if (filters.weightMax) params.append("weightMax", filters.weightMax);
    if (filters.victoryMin) params.append("victoryMin", filters.victoryMin);
    if (filters.defeatMax) params.append("defeatMax", filters.defeatMax);

    return params.toString();
  };

  const fetchProfiles = useCallback(async (currentFilters: Filters) => {
    setLoading(true);
    setError(null);

    try {
      const query = buildQueryParams(currentFilters);
      const response = await fetch(`${API_URL}/sportprofil/search?${query}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la recherche.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Charge tous les profils au montage de la page (filtres vides)
  useEffect(() => {
    fetchProfiles(initialFilters);
  }, [fetchProfiles]);

  const handleReset = () => {
    setFilters(initialFilters);
    fetchProfiles(initialFilters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfiles(filters);
  };

  return (
    <div>
      <Header /> 
        
        <div className="filterContainer">
        <h1>Rechercher un profil</h1>
        <p>Filtrez votre recherche ici</p>

        <form className="filterForm" onSubmit={handleSubmit}>
            <div className="filterField">
            <label htmlFor="name">Nom du combattant</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Rechercher par nom"
                value={filters.name}
                onChange={handleChange}
            />
            </div>

            <div className="filterField">
            <label htmlFor="discipline">Discipline</label>
            <select
                id="discipline"
                name="discipline"
                value={filters.discipline}
                onChange={handleChange}
            >
                <option value="">Toutes les disciplines</option>
                <option value="jjb">JJB</option>
                <option value="boxe">Boxe</option>
                <option value="mma">MMA</option>
                <option value="judo">Judo</option>
                <option value="karate">Karaté</option>
            </select>
            </div>

            <div className="filterField">
            <label htmlFor="club">Club</label>
            <input
                type="text"
                id="club"
                name="club"
                placeholder="Rechercher par club"
                value={filters.club}
                onChange={handleChange}
            />
            </div>

            <div className="filterField filterFieldRange">
            <label htmlFor="weightMin">Poids (kg)</label>
            <div className="filterRangeInputs">
                <input
                type="number"
                id="weightMin"
                name="weightMin"
                placeholder="Min"
                min="0"
                step="0.1"
                value={filters.weightMin}
                onChange={handleChange}
                />
                <span>-</span>
                <input
                type="number"
                id="weightMax"
                name="weightMax"
                placeholder="Max"
                min="0"
                step="0.1"
                value={filters.weightMax}
                onChange={handleChange}
                />
            </div>
            </div>

            <div className="filterField">
            <label htmlFor="victoryMin">Victoires minimum</label>
            <input
                type="number"
                id="victoryMin"
                name="victoryMin"
                placeholder="0"
                min="0"
                value={filters.victoryMin}
                onChange={handleChange}
            />
            </div>

            <div className="filterField">
            <label htmlFor="defeatMax">Défaites maximum</label>
            <input
                type="number"
                id="defeatMax"
                name="defeatMax"
                placeholder="0"
                min="0"
                value={filters.defeatMax}
                onChange={handleChange}
            />
            </div>

            <div className="filterActions">
            <button type="submit" className="filterSubmit" disabled={loading}>
                {loading ? "Recherche..." : "Rechercher"}
            </button>
            <button type="button" className="filterReset" onClick={handleReset}>
                Réinitialiser
            </button>
            </div>
        </form>

        {error && <p className="filterError">{error}</p>}

        <div className="filterResults">
            {results.length === 0 && !loading && !error && (
            <p>Aucun résultat pour le moment.</p>
            )}

            {results.map((profil) => (
            <div key={profil.id} className="profilCard">
                {profil.User.avatar && (
                <img src={profil.User.avatar} alt={`${profil.User.firstname} ${profil.User.lastname}`} />
                )}
                <h3>
                <span id="firstnameCapitalized">{profil.User.firstname}</span> <span id="nameUppercase">{profil.User.lastname}</span>
                </h3>
                <p><span id="strongDesc">Discipline :</span> {profil.discipline}</p>
                <p><span id="strongDesc">Club :</span> {profil.club}</p>
                <p><span id="strongDesc">Poids :</span> {profil.weight} kg</p>
                <p>
                <span id="strongDesc">Victoires :</span> {profil.victory} / <span id="strongDesc">Défaites :</span> {profil.defeat}
                </p>
            </div>
            ))}
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default SearchFilter;