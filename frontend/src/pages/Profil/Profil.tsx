import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditSportProfilModal from '../../components/editsportprofilmodal/EditSportProfilModal.tsx';
import EditSportAvatarModal from '../../components/editssportavatarmodal/editssportavatarmodal.tsx';
import EditPalmaresModal from '../../components/editPalmaresModal/EditPalmaresModal.tsx';
import ImageGallery from '../../components/imageGallery/ImageGallery.tsx';
import { useAuth } from '../../context/useAuth';

import './Profil.scss';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Snapchat from '../../assets/social/snapchat-brands.png';
import Tiktok from '../../assets/social/tiktok-brands.png';
import Insta from '../../assets/social/instagram-brands.png';
import Trophy from '../../assets/trophy-solid.svg';
import customProfil from '../../assets/pen-to-square-regular-full.png';

const API_URL = import.meta.env.VITE_API_URL;

interface Palmares {
    id: number;
    title: string;
    discipline: string;
    city: string;
    country: string;
    date: string;
    result: string;
}

interface Image {
    id: number;
    url: string;
}

interface Sportprofil {
    biography: string;
    categorie: string;
    discipline: string;
    club: string;
    victory: number;
    defeat: number;
    weight: number;
    instagram: string;
    tiktok: string;
    snapchat: string;
    Palmares: Palmares[];
    Images: Image[];
}

interface UserProfile {
    firstname: string;
    lastname: string;
    birthday: string;
    avatar: string;
    type: string;
    Sportprofil: Sportprofil | null;
}

function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function Profil() {
    const { slug } = useParams();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user: currentUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [editingPalmares, setEditingPalmares] = useState<Palmares | null | undefined>(undefined);

    const isOwner = currentUser?.slug === slug;

    useEffect(() => {
        fetch(`${API_URL}/profil/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error('Profil introuvable');
                return res.json();
            })
            .then((data) => setUser(data))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [slug]);

    if (isLoading) {
        return (
            <div>
                <Header />
                <p>Chargement du profil...</p>
                <Footer />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div>
                <Header />
                <p>{error || 'Profil introuvable'}</p>
                <Footer />
            </div>
        );
    }

    const sport = user.Sportprofil;

    function handlePalmaresSuccess(savedPalmares: Palmares) {
        setUser((prev) => {
            if (!prev || !prev.Sportprofil) return prev;

            const existingIndex = prev.Sportprofil.Palmares.findIndex((p) => p.id === savedPalmares.id);
            const updatedList =
                existingIndex >= 0
                    ? prev.Sportprofil.Palmares.map((p, i) => (i === existingIndex ? savedPalmares : p))
                    : [...prev.Sportprofil.Palmares, savedPalmares];

            return {
                ...prev,
                Sportprofil: { ...prev.Sportprofil, Palmares: updatedList },
            };
        });
        setEditingPalmares(undefined);
    }

    async function handlePalmaresDelete(id: number) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/palmares/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Échec de la suppression.');

            setUser((prev) => {
                if (!prev || !prev.Sportprofil) return prev;
                return {
                    ...prev,
                    Sportprofil: {
                        ...prev.Sportprofil,
                        Palmares: prev.Sportprofil.Palmares.filter((p) => p.id !== id),
                    },
                };
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Header />
            <div id="pageContainer">
                <div id="headContainer">
                    <div id="avatardBlock">
                        <div
                            id="profilPicture"
                            onClick={() => isOwner && setIsAvatarModalOpen(true)}
                            style={{
                                ...(isOwner ? { cursor: 'pointer' } : {}),
                                ...(user.avatar ? { backgroundImage: `url(${user.avatar})` } : {}),
                            }}
                        />
                        <div id="socialProfil">
                            {sport?.snapchat && (
                                <a href={sport.snapchat} target="_blank" rel="noopener noreferrer">
                                    <img src={Snapchat} alt="snapchat picto" />
                                </a>
                            )}
                            {sport?.tiktok && (
                                <a href={sport.tiktok} target="_blank" rel="noopener noreferrer">
                                    <img src={Tiktok} alt="tiktok picto" />
                                </a>
                            )}
                            {sport?.instagram && (
                                <a href={sport.instagram} target="_blank" rel="noopener noreferrer">
                                    <img src={Insta} alt="instagram picto" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="blocContainer">
                        {isOwner && (
                            <div id="customProfil">
                                <img
                                    src={customProfil}
                                    alt="Remplir profil combattant"
                                    onClick={() => setIsModalOpen(true)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        )}
                        <h1><span id="firstnameCapitalized">{user.firstname}</span> <span id="nameUppercase">{user.lastname}</span></h1>
                        <p><span id="strongDesc">Age : </span>{calculateAge(user.birthday)} ans</p>
                        {sport?.categorie && <p><span id="strongDesc">Catégorie : </span>{sport.categorie}</p>}
                        {sport?.discipline && <p><span id="strongDesc">Discipline : </span>{sport.discipline}</p>}
                        {sport?.club && <p><span id="strongDesc">Club : </span>{sport.club}</p>}
                        {sport?.weight && <p><span id="strongDesc">Poids : </span>{sport.weight} kg</p>}
                    </div>

                    {sport && (
                        <>
                            <div className="blocContainer specialStyle fightNumber">
                                <h4>Victoire</h4>
                                <p className="numberText">{sport.victory}</p>
                            </div>

                            <div className="blocContainer fightNumber">
                                <h4>Défaite</h4>
                                <p className="numberText">{sport.defeat}</p>
                            </div>

                            <div className="blocContainer block5">
                                <h4>Biographie</h4>
                                <p>{sport.biography || 'Aucune biographie renseignée.'}</p>
                            </div>
                        </>
                    )}
                </div>
                <h2 className="palmaresTitle">Palmarès</h2>
                {isOwner && (
                    <div id="palmaresAddContainer">
                        <h2>Ajoutez vos palmares</h2>
                        <img
                            src={customProfil}
                            alt="Ajouter un palmarès"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setEditingPalmares(null)}
                        />
                    </div>
                )}
                
                {sport && sport.Palmares && sport.Palmares.length > 0 && (
                    <div className="palmaresContainer">
                       
                        {sport.Palmares.map((p) => (
                            <div className="expContainer" key={p.id}>
                                <div className="expDetails">
                                    <div className="expTitle">
                                        <img src={Trophy} width="100px" alt="trophée" />
                                        <h3>{p.title}</h3>
                                    </div>
                                    <p><strong><span id="strongDesc">Discipline :</span> </strong>{p.discipline}</p>
                                    <p><strong><span id="strongDesc">Lieu :</span> </strong>{p.city}{p.country ? `, ${p.country}` : ''}</p>
                                    <p><strong><span id="strongDesc">Date :</span> </strong>{formatDate(p.date)}</p>
                                    <p><strong><span id="strongDesc">Résultat :</span> </strong>{p.result}</p>
                                </div>

                                {isOwner && (
                                    <div className="palmaresActions">
                                        <img
                                            src={customProfil}
                                            alt="Modifier ce palmarès"
                                            style={{ cursor: 'pointer', width: '24px' }}
                                            onClick={() => setEditingPalmares(p)}
                                        />
                                        <button
                                            onClick={() => handlePalmaresDelete(p.id)}
                                            aria-label="Supprimer ce palmarès"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div id="galleryAddContainer">
                    <h2>Galerie photo</h2>
                    <ImageGallery
                        images={sport?.Images ?? []}
                        isOwner={isOwner}
                        onChange={(newImages) => {
                            setUser((prev) => {
                                if (!prev || !prev.Sportprofil) return prev;
                                return {
                                    ...prev,
                                    Sportprofil: { ...prev.Sportprofil, Images: newImages },
                                };
                            });
                        }}
                    />
                </div>
            </div>

            {isModalOpen && (
                <EditSportProfilModal
                    currentData={sport}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={(updatedSport) => {
                        setUser((prev) => {
                            if (!prev) return prev;

                            const previousSport = prev.Sportprofil;

                            const mergedSport: Sportprofil = {
                                biography: updatedSport.biography ?? previousSport?.biography ?? '',
                                categorie: updatedSport.categorie ?? previousSport?.categorie ?? '',
                                discipline: updatedSport.discipline ?? previousSport?.discipline ?? '',
                                club: updatedSport.club ?? previousSport?.club ?? '',
                                victory: updatedSport.victory ?? previousSport?.victory ?? 0,
                                defeat: updatedSport.defeat ?? previousSport?.defeat ?? 0,
                                weight: updatedSport.weight ?? previousSport?.weight ?? 0,
                                instagram: updatedSport.instagram ?? previousSport?.instagram ?? '',
                                tiktok: updatedSport.tiktok ?? previousSport?.tiktok ?? '',
                                snapchat: updatedSport.snapchat ?? previousSport?.snapchat ?? '',
                                Palmares: previousSport?.Palmares ?? [],
                                Images: previousSport?.Images ?? [],
                            };

                            return { ...prev, Sportprofil: mergedSport };
                        });
                        setIsModalOpen(false);
                    }}
                />
            )}

            {isAvatarModalOpen && (
                <EditSportAvatarModal
                    onClose={() => setIsAvatarModalOpen(false)}
                    onSuccess={(newAvatar: string) => {
                        setUser((prev) => (prev ? { ...prev, avatar: newAvatar } : prev));
                        setIsAvatarModalOpen(false);
                    }}
                />
            )}

            {editingPalmares !== undefined && (
                <EditPalmaresModal
                    currentData={editingPalmares}
                    onClose={() => setEditingPalmares(undefined)}
                    onSuccess={handlePalmaresSuccess}
                />
            )}

            <Footer />
        </div>
    );
}