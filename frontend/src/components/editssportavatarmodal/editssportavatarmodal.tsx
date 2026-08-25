import { useState } from "react";
import './editssportavatarmodal.scss';

const API_URL = import.meta.env.VITE_API_URL;


interface Props {
    onClose: () => void;
    onSuccess: (avatar: string) => void;
}

export default function EditSportAvatarModal({ onClose, onSuccess }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        if (!file) {
            setError('Sélectionne une image.');
            return;
        }

        setIsSaving(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${API_URL}/users/me/avatar`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Échec de l'envoi de l'image.");
            }

            const data = await response.json();
            onSuccess(data.avatar);
            onClose();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Changer ma photo de profil</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && <img src={preview} alt="Aperçu" style={{ width: 150, marginTop: 10 }} />}
                    <div className="modal-actions">
                        <button type="submit" disabled={isSaving}>
                            {isSaving ? 'Envoi...' : 'Enregistrer'}
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