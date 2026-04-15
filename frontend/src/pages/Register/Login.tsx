import './Login.scss';
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'


export default function Login() {
    return (
        <div>
            <Header />
            <h1>Connexion</h1>

            <div id="formLogin">
                    <form action="/Login" method="POST">

                        <label>Email<span className="requireRed">*</span></label>
                        <input id="email" type="email" name="email" required />

                        <label>Mot de passe<span className="requireRed">*</span></label>
                        <input id="password" type="text" name="password" required />

                        <div>
                            <button type="submit" className="btnValidate">Valider</button>
                        </div>

                    </form>
                </div>

            <Footer />
        </div>
    )
}