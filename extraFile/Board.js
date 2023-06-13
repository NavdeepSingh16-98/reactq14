
import "./css/board.css";

import { Component,createRef } from "react";



class Board extends Component{
    constructor(props) {
        super(props);
        this.boardRef = createRef();
        this.state = {
            turn:0,
            data:['', '', '', '', '',
            '', '', '', '']
        };

        this.setTurn = this.setTurn.bind(this);
        this.setData = this.setData.bind(this);
        this.draw = this.draw.bind(this);
      }

      setTurn = val =>{
        this.setState({
          turn:val  
        })
      }

      setData = val =>{

        this.setState({
            data:val
        });
      }

	
	 draw = (event, index) => {
		
		if (this.state.data[index - 1] === '' && this.props.winner === '') {

			
			const current = this.state.turn === 0 ? "X" : "O"

		

            let data = [...this.state.data];
			data[index - 1] = current;

            this.setState({
                data:data
            })

			
			event.target.innerText = current;

			
			this.setTurn(this.state.turn === 0 ? 1 : 0)
		}
	}


    componentDidUpdate(prevProps,prevState){

        console.log('props',prevProps);

        console.log('state',prevState)
        if (prevProps.reset !== this.props.reset || prevProps.winner !== this.props.winner ) {
          
		this.setData(['', '', '', '', '', '', '', '', '']);

	
		const cells = this.boardRef.current.children

		
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = '';
		}

		
		this.setTurn(0);

		
		this.props.setWinner('');
		this.setReset(false);

          }


        
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |= (this.state.data[i] === this.state.data[i + 1] &&
					this.state.data[i] === this.state.data[i + 2] &&
					this.state.data[i] !== '')
			}
			return ans;
		}

		
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |= (this.state.data[i] === this.state.data[i + 3] &&
					this.state.data[i] === this.state.data[i + 6] &&
					this.state.data[i] !== '')
			}
			return ans;
		}

		
		const checkDiagonal = () => {
			return ((this.state.data[0] === this.state.data[4] &&
				this.state.data[0] === this.state.data[8] && this.state.data[0] !== '') ||
				(this.state.data[2] === this.state.data[4] && this.state.data[2] === this.state.data[6] &&
					this.state.data[2] !== ''));
		}

		
		const checkWin = () => {
			return (checkRow() || checkCol() || checkDiagonal());
		}

		
		const checkTie = () => {
			let count = 0;
			this.state.data.forEach((cell) => {
				if (cell !== '') {
					count++;
				}
			})
			return count === 9;
		}

		
		if (checkWin()) {
			this.props.setWinner(this.state.turn === 0 ? "Player 2 Wins!" :
				"Player 1 Wins!");
		} else if (checkTie()) {

			
			this.props.setWinner("It's a Tie!");
		}




          
       

    }

	

    render(){

    
	return (
		<div ref={this.boardRef} className="board">
			<div className="input input-1"
				onClick={(e) => this.draw(e, 1)}></div>
			<div className="input input-2"
				onClick={(e) => this.draw(e, 2)}></div>
			<div className="input input-3"
				onClick={(e) => this.draw(e, 3)}></div>
			<div className="input input-4"
				onClick={(e) => this.draw(e, 4)}></div>
			<div className="input input-5"
				onClick={(e) => this.draw(e, 5)}></div>
			<div className="input input-6"
				onClick={(e) => this.draw(e, 6)}></div>
			<div className="input input-7"
				onClick={(e) => this.draw(e, 7)}></div>
			<div className="input input-8"
				onClick={(e) => this.draw(e, 8)}></div>
			<div className="input input-9"
				onClick={(e) => this.draw(e, 9)}></div>
		</div>
	)
    }
}

export default Board;
