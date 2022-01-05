import './App.css';
import GameGrid from './components/grid/GameGrid'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

const setup = [['A', 'B', 'C', 'D', 'E', 'F'],
    ['F', 'E', 'D', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'D', 'E', 'F']];

function App() {

    return (
        <div className="App">
            <Container>
                <GameGrid setup={setup}/>
            </Container>
        </div>
    );
}

export default App;
