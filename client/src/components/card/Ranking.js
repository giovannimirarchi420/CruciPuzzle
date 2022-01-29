import RankCard from "./RankCard";
import {useEffect, useState} from "react";
import {getRanking} from "../../util/API";
import ErrorModal from "../modals/ErrorModal";

const Ranking = (props) => {
    const [ranking, setRanking] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getRanking().then((ranks) => {
            setRanking(() => [...ranks])
        })
            .catch(() => setError(true));
    }, [])
    return (
        <>
            {error ? <ErrorModal show={error}/> :
                ranking.map((player, index) => {
                    return <RankCard key={index} playerName={player.username} ranking={index + 1}
                                     playerScore={player.score}/>
                })
            }
        </>

    );
}

export default Ranking;