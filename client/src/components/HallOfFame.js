import {Card, Table} from "react-bootstrap";
import RankCard from './RankCard.js'
import Ranking from './Ranking.js'
import '../App.css'
const rank = [{name: "Hemek", score: 420, ranking:"1"},
              {name: "Naomi", score: 212, ranking:"2"},
              {name: "Pippo", score: 122, ranking:"3"},
              {name: "Pluto", score: 97, ranking:"4"}]

const HallOfFame = (props) => {

    return (
        <center>
            <Ranking players={rank}/>
        </center>
        /*<center>
            <h1 className={"hall-of-fame-text"}>Hall of Fame</h1>
            <Table striped bordered hover   >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {rank.map( (element, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{element.username}</td>
                            <td>{element.score}</td>
                            <td>{element.date}</td>
                        </tr>);
                })}

                </tbody>
            </Table>
        </center>*/

    );
}

export default HallOfFame;