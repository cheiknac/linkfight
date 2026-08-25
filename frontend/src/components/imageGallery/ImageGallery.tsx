import { useState } from 'react';
import './ImageGallery.scss';

const API_URL = import.meta.env.VITE_API_URL;
const MAX_IMAGES = 6;

interface ImageData {
    id: number;
    url: string;
}

interface Props {
    images: ImageData[];
    isOwner: boolean;
    onChange: (images: ImageData[]) => void;
}

export default function ImageGallery({ images, isOwner, onChange }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`${API_URL}/images`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || "Échec de l'envoi de l'image.");
            }

            const result = await response.json();
            onChange([...images, result.data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    }

    async function handleDelete(id: number) {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/images/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Échec de la suppression.');
            }

            onChange(images.filter((img) => img.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
        }
    }

    return (
        <div className="galleryEditor">
            {error && <p className="error">{error}</p>}
            <div className="galleryContainer">
                {images.map((img) => (
                    <div className="galleryItem" key={img.id}>
                        <img src={img.url} alt="Photo galerie" />
                        {isOwner && (
                            <button
                                className="deleteImageBtn"
                                onClick={() => handleDelete(img.id)}
                                aria-label="Supprimer cette image"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isOwner && images.length < MAX_IMAGES && (
                <label className="uploadLabel">
                    {isUploading ? 'Envoi...' : `Ajouter une photo (${images.length}/${MAX_IMAGES})`}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                        style={{ display: 'none' }}
                    />
                </label>
            )}
        </div>
    );
}