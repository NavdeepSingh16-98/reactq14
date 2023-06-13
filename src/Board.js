// Importing the CSS for the board
import "./css/board.css";

// Importing the useState hook, useEffect hook and useRef hook
import { useState, useEffect, useRef } from "react";

const Board = ({ reset, setReset, winner, setWinner }) => {




	// Creating a turn state, which indicates the current turn
	const [turn, setTurn] = useState(0);

	// Creating a data state, which contains the
	// current picture of the board
	const [data, setData] = useState(['', '', '', '', '',
		'', '', '', ''])

	// Creating a reference for the board
	const boardRef = useRef(null);

	// Function to draw on the board
	const draw = (event, index) => {
		// Draws only if the position is not taken
		// and winner is not decided yet
		if (data[index - 1] === '' && winner === '') {

			// Draws X if it's player 1's turn else draws O
			const current = turn === 0 ? "X" : "O"

			// Updating the data state
			data[index - 1] = current;

			//Drawing on the board
			event.target.innerText = current;

			// Switching the turn
			setTurn(turn === 0 ? 1 : 0)
		}
	}

	// UseEffect hook used to reset the board whenever
	// a winner is decided
	useEffect(() => {

		// Clearing the data state
		setData(['', '', '', '', '', '', '', '', '']);

		// Getting all the children(cells) of the board
		const cells = boardRef.current.children

		// Clearing out the board
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = '';
		}

		// Resetting the turn to player 0
		setTurn(0);

		// Resetting the winner
		setWinner('');
		setReset(false);
	}, [reset, setReset, setWinner])


	// useEffect hook used to check for a winner
	useEffect(() => {

		// Checks for the win condition in rows
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |= (data[i] === data[i + 1] &&
					data[i] === data[i + 2] &&
					data[i] !== '')
			}
			return ans;
		}

		// Checks for the win condition in cols
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |= (data[i] === data[i + 3] &&
					data[i] === data[i + 6] &&
					data[i] !== '')
			}
			return ans;
		}

		// Checks for the win condition in diagonals
		const checkDiagonal = () => {
			return ((data[0] === data[4] &&
				data[0] === data[8] && data[0] !== '') ||
				(data[2] === data[4] && data[2] === data[6] &&
					data[2] !== ''));
		}

		// Checks if at all a win condition is present
		const checkWin = () => {
			return (checkRow() || checkCol() || checkDiagonal());
		}

		// Checks for a tie
		const checkTie = () => {
			let count = 0;
			data.forEach((cell) => {
				if (cell !== '') {
					count++;
				}
			})
			return count === 9;
		}

		// Setting the winner in case of a win
		if (checkWin()) {
			setWinner(turn === 0 ? "Player 2 Wins!" :
				"Player 1 Wins!");
		} else if (checkTie()) {

			// Setting the winner to tie in case of a tie
			setWinner("It's a Tie!");
		}

	})

	return (
		<div ref={boardRef} className="board">
			<div className="input input-1"
				onClick={(e) => draw(e, 1)}></div>
			<div className="input input-2"
				onClick={(e) => draw(e, 2)}></div>
			<div className="input input-3"
				onClick={(e) => draw(e, 3)}></div>
			<div className="input input-4"
				onClick={(e) => draw(e, 4)}></div>
			<div className="input input-5"
				onClick={(e) => draw(e, 5)}></div>
			<div className="input input-6"
				onClick={(e) => draw(e, 6)}></div>
			<div className="input input-7"
				onClick={(e) => draw(e, 7)}></div>
			<div className="input input-8"
				onClick={(e) => draw(e, 8)}></div>
			<div className="input input-9"
				onClick={(e) => draw(e, 9)}></div>
		</div>
	)
}

export default Board;



//class code below



// import "./css/board.css";

// import { Component,createRef } from "react";



// class Board extends Component{
//     constructor(props) {
//         super(props);
//         this.boardRef = createRef();
//         this.state = {
//             turn:0,
//             data:['', '', '', '', '',
//             '', '', '', '']
//         };

//         this.setTurn = this.setTurn.bind(this);
//         this.setData = this.setData.bind(this);
//         this.draw = this.draw.bind(this);
//       }

//       setTurn = val =>{
//         this.setState({
//           turn:val  
//         })
//       }

//       setData = val =>{

//         this.setState({
//             data:val
//         });
//       }

	
// 	 draw = (event, index) => {
		
// 		if (this.state.data[index - 1] === '' && this.props.winner === '') {

			
// 			const current = this.state.turn === 0 ? "X" : "O"

		

//          //   let data = [...this.state.data];
// 			this.state.data[index - 1] = current;

//             // this.setState({
//             //     data:data
//             // })

			
// 			event.target.innerText = current;

			
// 			this.setTurn(this.state.turn === 0 ? 1 : 0)
// 		}
// 	}


//     componentDidUpdate(prevProps,prevState){

//         console.log('props',prevProps);

//         console.log('state',prevState)
//         if (prevProps.reset !== this.props.reset || prevProps.winner !== this.props.winner ) {
          
// 		this.setData(['', '', '', '', '', '', '', '', '']);

	
// 		const cells = this.boardRef.current.children

		
// 		for (let i = 0; i < 9; i++) {
// 			cells[i].innerText = '';
// 		}

		
// 		this.setTurn(0);

		
// 		this.props.setWinner('');
// 		this.props.setReset(false);

//           }


        
// 		const checkRow = () => {
// 			let ans = false;
// 			for (let i = 0; i < 9; i += 3) {
// 				ans |= (this.state.data[i] === this.state.data[i + 1] &&
// 					this.state.data[i] === this.state.data[i + 2] &&
// 					this.state.data[i] !== '')
// 			}
// 			return ans;
// 		}

		
// 		const checkCol = () => {
// 			let ans = false;
// 			for (let i = 0; i < 3; i++) {
// 				ans |= (this.state.data[i] === this.state.data[i + 3] &&
// 					this.state.data[i] === this.state.data[i + 6] &&
// 					this.state.data[i] !== '')
// 			}
// 			return ans;
// 		}

		
// 		const checkDiagonal = () => {
// 			return ((this.state.data[0] === this.state.data[4] &&
// 				this.state.data[0] === this.state.data[8] && this.state.data[0] !== '') ||
// 				(this.state.data[2] === this.state.data[4] && this.state.data[2] === this.state.data[6] &&
// 					this.state.data[2] !== ''));
// 		}

		
// 		const checkWin = () => {
// 			return (checkRow() || checkCol() || checkDiagonal());
// 		}

		
// 		const checkTie = () => {
// 			let count = 0;
// 			this.state.data.forEach((cell) => {
// 				if (cell !== '') {
// 					count++;
// 				}
// 			})
// 			return count === 9;
// 		}

		
// 		if (checkWin()) {

//             let str = this.state.turn === 0 ? "Player 2 Wins!" :
//             "Player 1 Wins!";

//             console.log(str);
//             debugger;
// 			this.props.setWinner(this.state.turn === 0 ? "Player 2 Wins!" :
// 				"Player 1 Wins!");
// 		} else if (checkTie()) {

// 			console.log("It's a Tie!")
// 			this.props.setWinner("It's a Tie!");
// 		}




          
       

//     }

	

//     render(){

    
// 	return (
// 		<div ref={this.boardRef} className="board">
// 			<div className="input input-1"
// 				onClick={(e) => this.draw(e, 1)}></div>
// 			<div className="input input-2"
// 				onClick={(e) => this.draw(e, 2)}></div>
// 			<div className="input input-3"
// 				onClick={(e) => this.draw(e, 3)}></div>
// 			<div className="input input-4"
// 				onClick={(e) => this.draw(e, 4)}></div>
// 			<div className="input input-5"
// 				onClick={(e) => this.draw(e, 5)}></div>
// 			<div className="input input-6"
// 				onClick={(e) => this.draw(e, 6)}></div>
// 			<div className="input input-7"
// 				onClick={(e) => this.draw(e, 7)}></div>
// 			<div className="input input-8"
// 				onClick={(e) => this.draw(e, 8)}></div>
// 			<div className="input input-9"
// 				onClick={(e) => this.draw(e, 9)}></div>
// 		</div>
// 	)
//     }
// }

// export default Board;

