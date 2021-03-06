import {useEffect, useState} from "react";
import {getHistory} from "../../../util/API";
import Card from "./Card";
import {useNavigate} from "react-router-dom";
import {Pagination} from "react-bootstrap";
import '../../../App.css'
import ErrorModal from "../../modals/ErrorModal";


const History = (props) => {

    const [page, setPage] = useState(0);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(false);
    const pages = []
    const navigate = useNavigate();
    const PAGE_SIZE = 4;

    useEffect(() => {
        if (!props.isLogged) {
            navigate('/');
        }
        getHistory(page, PAGE_SIZE)
            .then((history) => setHistory(history))
            .catch(() => setError(true));
    }, [page]);

    for (let i = page; i < page + 3; i++) {
        pages.push(
            <Pagination.Item className={"font-game"} key={i} active={i === page} disabled={history.length < PAGE_SIZE}
                             onClick={() => setPage(i)}>
                {i + 1}
            </Pagination.Item>
        )
    }

    return (

        <>{error ? <ErrorModal show={error}/> : <>
            <h3 style={{marginTop: "4vh"}} className={"font-game"}>Past game of <span
                style={{color: "red"}}> {props.username} </span></h3>
            <center>{
                history.map((element, index) => {
                    return <Card key={index} playerScore={element.score} ranking={element.date}/>
                })}</center>
            <Pagination size="lg">
                <Pagination.Item className={"font-game"} key={0} onClick={() => setPage((page) => page - 1)}
                                 disabled={page === 0}>
                    {"<"}
                </Pagination.Item>
                {pages}
                <Pagination.Item className={"font-game"} key={5} onClick={() => setPage((page) => page + 1)}
                                 disabled={history.length < PAGE_SIZE}>
                    {">"}
                </Pagination.Item>
            </Pagination></>}
        </>

    );
}

export default History;