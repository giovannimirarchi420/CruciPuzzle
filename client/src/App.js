import './App.css';
import GameGrid from './components/grid/GameGrid'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Routes, useLocation} from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import DifficultyModal from "./components/DifficultyModal";
import PlayButton from "./components/PlayButton";

const setup = [['A', 'B', 'C', 'D', 'E', 'F'],
    ['F', 'E', 'D', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F']];

function App() {

    const difficultyRedirect = () => {
        return <Link to={'difficulty'}/>;
    }

    const gridRedirect = () => {
        return <Link to={'play'}/>;
    }

    return (
        <div className="App">
            <MyNavbar/>
            <Routes>
                <Route path='/' element={<PlayButton/>}/>
                <Route path='difficulty' element={<DifficultyModal show={true}/>}/>
                <Route path='play/beginner' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/rookie' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/intermediate' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/command' element={<center><GameGrid setup={setup}/></center>}/>
                <Route path='play/god' element={<center><GameGrid setup={setup}/></center>}/>
            </Routes>
        </div>
    );
}

export default App;
