import { BalldontlieAPI } from "@balldontlie/sdk";
import { useEffect,useState } from "react";
import SimpleBarChart from "./SimpleBarChart";
import PieChartComp from "./PieChart";
import { Link } from "react-router-dom";
import './App.css'

const API_KEY =  import.meta.env.VITE_BALLDONTLIE_API_KEY; 
const api = new BalldontlieAPI({ apiKey: API_KEY });

function Dashboard() {
  
  const [playerList, setplayerList] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const validPlayers = playerList.filter(player => player.weight);

  useEffect(() =>{
    const fetchData = async () => {

    try{
    const allPlayers = await api.nba.getPlayers({per_page: 25});
    console.log(allPlayers);
    setAllPlayers(allPlayers.data); 
    setplayerList(allPlayers.data);
    }
    catch(error){
      console.error("Error fetching data:", error);
    }
    }
    fetchData();
  },[]);


  const heightToInches = (height) => {
    if (!height) return 0;
    const [feet, inches] = height.split('-').map(Number);
    return (feet * 12) + inches;
  }

  const averageHeight = (players) => {
    if (!players || players.length === 0) return 0;
    const totalInches = players.reduce((acc, player) => acc + heightToInches(player.height), 0);
    return totalInches / players.length;
  }

  const averageWeight = (players) => {
  const valid = players
    .map(p => Number(p.weight))
    .filter(w => !isNaN(w) && w > 0);

  if (valid.length === 0) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
  };

  const inchestoFeet = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${Math.floor(remainingInches)}`;
  }

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
      const filteredPlayers = allPlayers.filter(player =>
        `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm)
      );
      setplayerList(filteredPlayers);
  }

  const handleTeamChange = (event) => {
    const teamTerm = event.target.value;
  
      const filteredPlayers = allPlayers.filter(player =>
        teamTerm === "" || player.team.abbreviation === teamTerm || (teamTerm === "EAST" && player.team.conference === "East") || (teamTerm === "WEST" && player.team.conference === "West")
      );
      setplayerList(filteredPlayers );
  }

  const getHeightData = () =>{
    const count = {};
    playerList.forEach(player => {
      const height = player.height || "N/A";
      count[height] = (count[height] || 0) + 1;
    });
    return Object.entries(count).map(([height, count]) => ({ name: height, count }));
  }

  const getpositionData = () =>{
    const count = {};
    playerList.forEach(player => {
      const position = player.position || "N/A";
      count[position] = (count[position] || 0) + 1;
    });
    return Object.entries(count).map(([position, count]) => ({ name: position, count }));
  }

  const heightData = getHeightData();
  const positionData = getpositionData();

  return (
    <>
      <div className="App">
        <section className="header">
        <h1>SwishStats</h1>
        <p>Welcome to SwishStats, your ultimate destination for comprehensive basketball statistics and insights.</p>
        </section>
      </div>


      <div className="cardContainer">
        <div className="card">
          <h2>Total players</h2>
          <p>{playerList?.length || 0}</p>
        </div>
        <div className="card">
          <h2>Average height</h2>
          <p>{inchestoFeet(averageHeight(playerList))}</p>

        </div>

        <div className="card">
          <h2>Average weight</h2>
          <p>{validPlayers.length ?
           (Math.floor(averageWeight(validPlayers))) : 0} lbs
          </p>
        </div>
      </div>

      {playerList.length > 0 && 
        <>
            <SimpleBarChart data={heightData} />
            <PieChartComp positionData={positionData} />
        </>
       }

      <div className="listContainer">

        <div className="searchBar">
        <input type="text" placeholder="Search players..."  onChange={handleChange}/>
        </div>

        <div className="filters">
          <label></label>
          <select name="team-conferences" id="team-conferences" onChange={handleTeamChange}>
            <option value="">All Teams & Conferences</option>
            <option value="LAL">Los Angeles Lakers</option>
            <option value="BOS">Boston Celtics</option>
            <option value="GSW">Golden State Warriors</option>
            <option value="CHI">Chicago Bulls</option>
            <option value="MIA">Miami Heat</option>
            <option value="NYK">New York Knicks</option>
            <option value="HOU">Houston Rockets</option>
            <option value="DAL">Dallas Mavericks</option>
            <option value="MIN">Minnesota Timberwolves</option>
            <option value="PHX">Phoenix Suns</option>
            <option value="EAST">Eastern Conference</option>
            <option value="WEST">Western Conference</option>
          </select>
        </div>

        <div className="playerList">
        <table>
        
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
        {playerList && playerList.map(player => (
                <tr key={player.id}>
                  <td>
                    <Link to={`/player/${player.id}`}>
                    {player.first_name} {player.last_name}
                    </Link>
                    </td>
                  <td> {player.height || "N/A"}</td>
                  <td> {player.position || "N/A"}</td>
                </tr>
        ))}
        </tbody>
        </table>
        </div>

      </div>



    </>
  );
}

export default Dashboard;