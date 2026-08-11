import './Profil.scss';
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Snapchat from '../../assets/social/snapchat-brands.png'
import Tiktok from '../../assets/social/tiktok-brands.png'
import Insta from '../../assets/social/instagram-brands.png'
import Trophy from '../../assets/trophy-solid.svg'
import PhotoGallery from '../../assets/galleryphoto.png'


export default function Profil() {
    return (
        <div>
            <Header />
            <div id="pageContainer">
                <div id="headContainer">
                    <div id="avatardBlock">
                        <div id="profilPicture">     
                        </div>
                        <div id="socialProfil">
                            <a href="#"><img src={Snapchat} alt="snapchat picto" /></a>
                            <a href="#"><img src={Tiktok} alt="titok picto" /></a>
                            <a href="#"><img src={Insta} alt="instagram picto" /></a>
                        </div>
                    </div>

                    <div className="blocContainer">
                        <h1>Rayan MAZUCHI</h1>
                        <p><strong>Age : </strong>14 ans</p>
                        <p><strong>Catégorie : </strong>14 ans</p>
                        <p><strong>Discipline : </strong>14 ans</p>
                        <p><strong>Club : </strong>14 ans</p>
                    </div>

                    <div className="blocContainer specialStyle fightNumber">
                        <h4>Victoire</h4>
                        <p className="numberText">15</p>
                    </div>

                    <div className="blocContainer fightNumber">
                        <h4>Défaite</h4>
                        <p className="numberText">0</p>
                    </div>

                    <div className="blocContainer block5">
                        <h4>Biographie</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>


                </div>


                <div className="palmaresContainer">
                    <h2>Palmarès</h2>
                        <div className="expContainer">
                            <div>
                                <h4>MMA – Championnat Régional</h4>
                                <p><strong>Discipline : </strong>MMA</p>
                                <p><strong>Lieu : </strong>Paris, France</p>
                                <p><strong>Date : </strong>15 avril 2024</p>
                                <p><strong>Résultat : </strong>1re place – Médaille d’or</p>
                            </div>
                            <div>
                                <img src={Trophy} width="100px" alt="instagram picto" />
                            </div>
                        </div>
                </div>


                <div>
                    <h2>Galerie photo</h2>
                    <div className="galleryContainer">
                        <img src={PhotoGallery} alt="Photo gallery" />
                        <img src={PhotoGallery} alt="Photo gallery" />
                        <img src={PhotoGallery} alt="Photo gallery" />
                        <img src={PhotoGallery} alt="Photo gallery" />
                        <img src={PhotoGallery} alt="Photo gallery" />
                        <img src={PhotoGallery} alt="Photo gallery" />
                    </div>
                </div>
            </div>




        <Footer />



        </div>
    )
}