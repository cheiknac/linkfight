import { useState } from 'react';
import './EditSportProfilModal.scss';

const API_URL = import.meta.env.VITE_API_URL;

interface SportprofilData {
    biography?: string;
    categorie?: string;
    discipline?: string;
    club?: string;
    zipcode_club?: string;
    victory?: number;
    defeat?: number;
    weight?: number;
    instagram?: string;
    tiktok?: string;
    snapchat?: string;
}

interface Props {
    currentData: SportprofilData | null;
    onClose: () => void;
    onSuccess: (updatedSport: SportprofilData) => void;
}

export default function EditSportProfilModal({ currentData, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState<SportprofilData>({
        biography: currentData?.biography || '',
        categorie: currentData?.categorie || '',
        discipline: currentData?.discipline || '',
        club: currentData?.club || '',
        zipcode_club: currentData?.zipcode_club || '',
        victory: currentData?.victory ?? 0,
        defeat: currentData?.defeat ?? 0,
        weight: currentData?.weight ?? undefined,
        instagram: currentData?.instagram || '',
        tiktok: currentData?.tiktok || '',
        snapchat: currentData?.snapchat || '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/sportprofil/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement.");
            }

            const result = await response.json();
            onSuccess(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="modalClose" onClick={onClose}>×</button>
                <h3>Editer mon profil</h3>

                <form onSubmit={handleSubmit}>
                    <label>Catégorie</label>
                    <input name="categorie" value={formData.categorie} onChange={handleChange} />

                    <label>Discipline</label>
                    <input name="discipline" value={formData.discipline} onChange={handleChange} />

                    <label>Club</label>
                    <input name="club" value={formData.club} onChange={handleChange} />

                    <label>Code postal du club</label>
                    <input name="zipcode_club" value={formData.zipcode_club} onChange={handleChange} />

                    <label>Victoires</label>
                    <input type="number" name="victory" value={formData.victory} onChange={handleChange} />

                    <label>Défaites</label>
                    <input type="number" name="defeat" value={formData.defeat} onChange={handleChange} />

                    <label>Poids (kg)</label>
                    <input type="number" step="0.1" name="weight" value={formData.weight ?? ''} onChange={handleChange} />

                    <label>Biographie</label>
                    <textarea name="biography" value={formData.biography} onChange={handleChange} rows={4} />

                    <label>Instagram (URL)</label>
                    <input name="instagram" value={formData.instagram} onChange={handleChange} />

                    <label>TikTok (URL)</label>
                    <input name="tiktok" value={formData.tiktok} onChange={handleChange} />

                    <label>Snapchat (URL)</label>
                    <input name="snapchat" value={formData.snapchat} onChange={handleChange} />

                    {error && <p className="errorMessage">{error}</p>}

                    <button type="submit" className="btnValidate" disabled={isSaving}>
                        {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
    );
}