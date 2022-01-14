import {Card, Table} from "react-bootstrap";

const rank = [{username: "Hemek", score: 420, date:"12/12/2021"},
              {username: "Naomi", score: 212, date:"12/11/2021"},
              {username: "Pippo", score: 122, date:"12/04/2021"},
              {username: "Pluto", score: 97, date:"12/29/2021"}]

const HallOfFame = (props) => {

    return (
        <center>
            <h1 className={"hall-of-fame-text"}>Hall of Fame</h1>
            <Card className="text-center hall-of-fame">
                <Card.Header>🏆 Hall of Fame 🏆</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
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
                </Card.Body>
            </Card>
        </center>

    );
}

export default HallOfFame;