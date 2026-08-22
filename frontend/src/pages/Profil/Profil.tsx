import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditSportProfilModal from '../../components/editsportprofilmodal/EditSportProfilModal.tsx';
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

    return (
        <div>
            <Header />
            <div id="pageContainer">
                <div id="headContainer">
                    <div id="avatardBlock">
                        <div id="profilPicture">
                            {user.avatar && <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} />}
                        </div>
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
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p><span id="strongDesc">Age : </span>{calculateAge(user.birthday)} ans</p>
                        {sport?.categorie && <p><span id="strongDesc">Catégorie : </span>{sport.categorie}</p>}
                        {sport?.discipline && <p><span id="strongDesc">Discipline : </span>{sport.discipline}</p>}
                        {sport?.club && <p><span id="strongDesc">Club : </span>{sport.club}</p>}
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

                <div>
                    <h2>Ajoutez vos palmares</h2>
                        <img
                            src={customProfil}
                            alt="Remplir profil combattant"
                            style={{ cursor: 'pointer' }}
                        />
                    
                </div>
                {sport && sport.Palmares && sport.Palmares.length > 0 && (
                    <div className="palmaresContainer">
                        <h2>Palmarès</h2>
                        {sport.Palmares.map((p) => (
                            <div className="expContainer" key={p.id}>
                                <div>
                                    <h4>{p.title}</h4>
                                    <p><strong>Discipline : </strong>{p.discipline}</p>
                                    <p><strong>Lieu : </strong>{p.city}{p.country ? `, ${p.country}` : ''}</p>
                                    <p><strong>Date : </strong>{formatDate(p.date)}</p>
                                    <p><strong>Résultat : </strong>{p.result}</p>
                                </div>
                                <div>
                                    <img src={Trophy} width="100px" alt="trophée" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <h2>Ajoutez vos 6 images</h2>
                        <img
                            src={customProfil}
                            alt="Remplir profil combattant"
                            style={{ cursor: 'pointer' }}
                        />
                    
                </div>

                {sport && sport.Images && sport.Images.length > 0 && (
                    <div>
                        <h2>Galerie photo</h2>
                        <div className="galleryContainer">
                            {sport.Images.map((img) => (
                                <img key={img.id} src={img.url} alt="Photo galerie" />
                            ))}
                        </div>
                    </div>
                )}
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
            )};

            <Footer />
        </div>
    );
}