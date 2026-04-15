import './Signup.scss';
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'


export default function Signup() {
    return (
        <div>
            <Header />
            <div>
                <div>
                    <h1>Rejoingnez-nous</h1>
                    <p>Veuillez remplir ce formulaire ci-dessous afin d'obtenir un compte</p>
                </div>

                <div id="formRegister">
                    <form action="/Login" method="POST">
                        <label>Vous êtes</label>
                        <select name="role" id="role">
                            <option value="">-- Sélectionnez votre rôle</option>
                            <option value="Combattant">Combattant</option>
                            <option value="Sponsors">Sponsor</option>
                            <option value="Organisateur">Orgalisateur</option>
                            <option value="Coach">Coach</option>
                        </select>

                        <label>Prénom<span className="requireRed">*</span></label>
                        <input id="prenom" type="text" name="prenom" required />

                        <label>Nom<span className="requireRed">*</span></label>
                        <input id="nom" type="text" name="nom" required />

                        <label>Email<span className="requireRed">*</span></label>
                        <input id="email" type="email" name="email" required />

                        <label>Mot de passe<span className="requireRed">*</span></label>
                        <input id="password" type="text" name="password" required />

                        <label>Date de naissance<span className="requireRed">*</span></label>
                        <input id="birth" type="date" name="birth" required />

                        <div className="ppBox">
                            <input type="checkbox" id="policy" name="policy" required />
                            <label>J'accepte la <a href="#">politique de confidentialite</a></label>
                        </div>

                        <div>
                            <button type="submit" className="btnValidate">Valider</button>
                        </div>

                    </form>
                </div>

            </div>

            <Footer />
        </div>
    )
}