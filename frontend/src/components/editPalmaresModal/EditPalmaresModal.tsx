import { useState } from 'react';
import './EditPalmaresModal.scss';

const API_URL = import.meta.env.VITE_API_URL;

interface PalmaresData {
    id?: number;
    title: string;
    discipline: string;
    city: string;
    country: string;
    date: string;
    result: string;
}

interface Props {
    currentData: PalmaresData | null;
    onClose: () => void;
    onSuccess: (palmares: Required<PalmaresData>) => void;
}

export default function EditPalmaresModal({ currentData, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState<PalmaresData>({
        title: currentData?.title || '',
        discipline: currentData?.discipline || '',
        city: currentData?.city || '',
        country: currentData?.country || '',
        date: currentData?.date || '',
        result: currentData?.result || '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const token = localStorage.getItem('token');
            const isEditing = Boolean(currentData?.id);

            const response = await fetch(
                isEditing ? `${API_URL}/palmares/${currentData!.id}` : `${API_URL}/palmares`,
                {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{currentData?.id ? 'Modifier le palmarès' : 'Ajouter un palmarès'}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input name="title" value={formData.title} onChange={handleChange} required />

                    <label>Discipline</label>
                    <input name="discipline" value={formData.discipline} onChange={handleChange} required />

                    <label>Ville</label>
                    <input name="city" value={formData.city} onChange={handleChange} required />

                    <label>Pays</label>
                    <input name="country" value={formData.country} onChange={handleChange} />

                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                    <label>Résultat</label>
                    <input name="result" value={formData.result} onChange={handleChange} required />

                    {error && <p className="error">{error}</p>}

                    <div className="modal-actions">
                        <button type="submit" disabled={isSaving}>
                            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <button type="button" onClick={onClose} disabled={isSaving}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}