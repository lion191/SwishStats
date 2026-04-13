import { useParams } from "react-router-dom";
import { BalldontlieAPI } from "@balldontlie/sdk";
import { useEffect, useState } from "react";
import './App.css'  

const API_KEY =  import.meta.env.VITE_BALLDONTLIE_API_KEY;
const api = new BalldontlieAPI({ apiKey: API_KEY });

function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let timer;
    const fetchPlayer = async () => {
        try{
        const playerData = await api.nba.getPlayer(parseInt(id));
        console.log("Single Player Data:", playerData);

        if (isMounted)
            setPlayer(playerData.data);
      } catch (error) {
        if (error.message.includes('429')) {
        console.error("Rate limit hit. Cooling down...");
        } else {
        console.error("Error fetching player data:", error);
        }
      }
      
    };
    if (id) {

        timer = setTimeout(() => {
      fetchPlayer();
        }, 100);
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [id]);

  if(!player) {
    return <p>Loading...</p>;
  }

  return (
    <div className="playerDetail">
      <h1>Player Detail</h1>
      
      <div className="playerCard">
        <p><strong>Name:</strong> {player.first_name} {player.last_name}</p>
        <p><strong>Height:</strong> {player.height || "N/A"}</p>
        <p><strong>Weight:</strong> {player.weight || "N/A"}</p>
        <p><strong>Position:</strong> {player.position || "N/A"}</p>
        <p><strong>Team:</strong> {player.team ? player.team.full_name : "N/A"}</p>
        <p><strong>Conference:</strong> {player.team ? player.team.conference : "N/A"}</p>
        <p><strong>Division:</strong> {player.team ? player.team.division : "N/A"}</p>
      </div>
    </div>
  );
}

export default PlayerDetail;