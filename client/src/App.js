import './App.css';
import GameGrid from './components/grid/GameGrid'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import DifficultyModal from "./components/modals/DifficultyModal";
import PlayButton from "./components/PlayButton";
import LoginModal from "./components/modals/LoginModal.js";
import HallOfFame from "./components/pages/HallOfFame";
import {useState} from "react";
import About from "./components/pages/About";
import * as API from "./util/API";
import LogoutModal from "./components/modals/LogoutModal";
import logo from './img/logo.png';
import {Fade} from "react-bootstrap";
import History from "./components/pages/history/History";

const initialSetup = [['A', 'B', 'C', 'D', 'E', 'F'],
    ['F', 'E', 'D', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F']];

function App() {

    const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const doLogIn = async (credentials) => {
        try {
            const user = await API.logIn(credentials);
            setLoggedIn(true);
            console.log(user);
            setUser(user);
        } catch(err) {
            //todo error handling
            console.log("not valid credetials");
        }
    }

    const doLogOut = async () => {
        await API.logOut();
        setLoggedIn(false);
        setUser({});
        navigate('/');

    }

    return (
        <div className="App">
            <MyNavbar username={loggedIn ? user.username : false}/>
            {(location.pathname === '/') ?
                <Fade appear in>
                    <center>
                        <img className={"logo"} src={logo} alt="Logo"/>
                    </center>
                </Fade> : <></>}
            <Routes>
                <Route path='/' element={<PlayButton/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/history' element={<History username={user.username} isLogged={loggedIn}/>}/>
                <Route path='difficulty' element={<DifficultyModal show={true}/>}/>
                <Route path='play/beginner' element={<center><GameGrid setup={initialSetup} user={user} isLogged={loggedIn}/></center>}/>
                <Route path='play/rookie' element={<center><GameGrid setup={initialSetup} user={user} isLogged={loggedIn}/></center>}/>
                <Route path='play/intermediate' element={<center><GameGrid setup={initialSetup} user={user} isLogged={loggedIn}/></center>}/>
                <Route path='play/command' element={<center><GameGrid setup={initialSetup} user={user} isLogged={loggedIn}/></center>}/>
                <Route path='play/god' element={<center><GameGrid setup={initialSetup} user={user} isLogged={loggedIn}/></center>}/>
                <Route path='play/*' element={<Navigate to={'/'}/>} />

                <Route path='/login' element={loggedIn ? <Navigate to={'/'}/> : <><PlayButton/><LoginModal show login={doLogIn}/></>}/>
                <Route path='/logout' element={loggedIn ? <LogoutModal logout={doLogOut}/> : <Navigate to={'/'}/> } />
                <Route path='/hall-of-fame' element={<HallOfFame/>}/>
            </Routes>
        </div>
    );
}

export default App;
