import './Profil.scss';
import Header from '../../components/Header/Header.tsx'
import Snapchat from '../../assets/social/snapchat-brands.png'
import Tiktok from '../../assets/social/tiktok-brands.png'
import Insta from '../../assets/social/instagram-brands.png'


export default function Profil() {
    return (
        <div>
            <Header />

            <div>
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

                <div className="blocContainer specialStyle">
                    <h4>Victoire</h4>
                    <p className="numberText">15</p>
                </div>

                <div className="blocContainer">
                    <h4>Défaite</h4>
                    <p className="numberText">0</p>
                </div>

                <div className="blocContainer">
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
        </div>
    )
}