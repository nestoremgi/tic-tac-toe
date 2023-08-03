import { useState } from "react";

function Square({ value, onClickSquare }) {
    /*const [value, setValue] = useState(null);
        Este estado es manejado de manera aislada en el componente Square.
        Por lo que isXNext debe de ser estado del Board.
    const [isXNext, setIsXNext] = useState(true);
    function handleClick() {
        if(isXNext) {
            setValue("x")
        }else {
            setValue("o");
        }
        setIsXNext(!isXNext); 
        console.log(isXNext);
    }*/

    return(
        <button
            className="square"
            onClick={onClickSquare}
        >
            {value}
        </button>
    );
};

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
   // const [value, setValue] = useState(null);
    const [isXNext, setIsXNext] = useState(true);

    function handleClick(i) {
        if (squares[i] || confirmWinner(squares)) { 
            return;
        }
    
        const nextSquares = squares.slice();

        if(isXNext) {
            nextSquares[i] = "x";
            setSquares(nextSquares)
        }else {
            nextSquares[i] = "o";
            setSquares(nextSquares);
        }
        setIsXNext(!isXNext); 
    }
    
    //Re render execute this code
    const winner = confirmWinner(squares);
    let status;

    if (winner) {
        status = 'Winner ' + winner;
    } else {
        status = 'Next Player: ' + (isXNext? "X" : "O");
    }
    
    return (
        <div className="game">
            <h1>{status}</h1>
            <div className="row">
                <Square value={squares[0]} onClickSquare={() => { handleClick(0) }} />
                <Square value={squares[1]} onClickSquare={() => { handleClick(1) }} />
                <Square value={squares[2]}  onClickSquare={() => { handleClick(2)}} />
            </div>
            <div className="row">
                <Square value={squares[3]}  onClickSquare={() => { handleClick(3)}} />
                <Square value={squares[4]}  onClickSquare={() => { handleClick(4) }} />
                <Square value={squares[5]}  onClickSquare={() => { handleClick(5) }} />
            </div>
            <div className="row">
                <Square value={squares[6]}  onClickSquare={() => { handleClick(6) }} />
                <Square value={squares[7]}  onClickSquare={() => { handleClick(7) }} />
                <Square value={squares[8]}  onClickSquare={() => { handleClick(8) }} />
            </div>  
        </div>
    )
};

export default function Game() {
    const [history, setHistory] = useState(Array(9).fill(null));
    
    return(
        <Board />
    );
};

function confirmWinner(squares) {
    //Describes 8  possibilities for winner of  game 
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],//Diagononal
        [2, 4, 6]//Diagononal
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

