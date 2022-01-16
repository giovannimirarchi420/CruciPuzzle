import RankCard from "./RankCard";
import {useEffect, useState} from "react";
import {getRanking} from "../../util/API";

const Ranking = (props) => {
    const [ranking, setRanking] = useState([]);
    useEffect(() => {
        getRanking().then((ranks) => setRanking(() => [...ranks]));
    }, [])
    return (
        <>
            {
                ranking.map( (player, index) => {
                    return <RankCard key={index} playerName={player.username} ranking={index+1} playerScore={player.score}/>
                })
            }
        </>

    );
}

export default Ranking;