import { useState } from "react";
import './EditSportAvatarModal.scss';

const API_URL = import.meta.env.VITE_API_URL;

interface userData {
    avatar?: string;
}

interface Props {
    currentData: userData | null;
    onClose: () => void;
    onSuccess: (updatedSport: userData) => void;
}

export default function EditSportAvatarModal({ currentData, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState<userData>({
        avatar: currentData?.avatar || '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/sportprofil/me/avatar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update sport avatar');
            }

            const updatedSport = await response.json();
            onSuccess(updatedSport);
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
                <h2>Edit Sport Avatar</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Avatar URL:
                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" onClick={onClose} disabled={isSaving}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}  