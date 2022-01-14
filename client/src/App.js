import './App.css';
import GameGrid from './components/grid/GameGrid'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Routes} from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import DifficultyModal from "./components/DifficultyModal";
import PlayButton from "./components/PlayButton";
import LoginModal from "./components/LoginModal.js";
import HallOfFame from "./components/HallOfFame";
import {useState} from "react";
import Score from "./components/Score";
import About from "./components/About";

const setup = [['A', 'B', 'C', 'D', 'E', 'F'],
    ['F', 'E', 'D', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F']];

function App() {

    const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in

    return (
        <div className="App">
            <MyNavbar/>
            <Routes>
                <Route path='/' element={<PlayButton/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path='difficulty' element={<DifficultyModal show={true}/>}/>
                <Route path='play/beginner' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/rookie' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/intermediate' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/command' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/god' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='/login' element={<><PlayButton/><LoginModal show/></>}/>
                <Route path='/hall-of-fame' element={<HallOfFame/>}/>
            </Routes>
        </div>
    );
}

export default App;
