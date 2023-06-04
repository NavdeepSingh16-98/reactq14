// Importing the css for the info
import "./css/info.css";
import { Component } from "react";

class Info extends Component {

    render(){
        return (
            <div className="info">
                <div className="player">Player 1: X</div>
                <div className="player">Player 2: O</div>
            </div>
        )
    }
	
}

export default Info;
