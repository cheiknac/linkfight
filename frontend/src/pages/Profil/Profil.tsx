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


            </div>
        </div>
    )
}