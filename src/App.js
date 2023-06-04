
import Board from './Board';
import Info from "./Info";
import { Component } from 'react';


import "./App.css";



class App extends Component {


  constructor(props) {
    super(props);
    this.state = { reset: true,
    winner:''

    };

    this.setReset = this.setReset.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  setReset=(val)=> {
this.setState({reset:val})

  }
  setWinner=(val)=>{
    this.setState({winner:val})
  }

	
	resetBoard (){
		this.setReset(true);
	}

  render(){
	return (
		<div className="App">
		
			<div className={`winner ${this.state.winner !== '' ? '' : 'shrink'}`}>
			
				<div className='winner-text'>{this.state.winner}</div>
			
				<button onClick={() => this.resetBoard()}>
					Reset Board
				</button>
			</div>
			
			<Board reset={this.state.reset} setReset={this.setReset} winner={this.state.winner}
				setWinner={this.setWinner} />
			<Info />
		</div>
	);}
}

export default App;
