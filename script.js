document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                result.textContent = `${currentPlayer} wins!`;
                result.classList.add('show');
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                result.textContent = "It's a draw!";
                result.classList.add('show');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = board.children[i];
            cell.textContent = gameBoard[i];
            cell.classList.remove('X', 'O');
            if (gameBoard[i] === 'X' || gameBoard[i] === 'O') {
                cell.classList.add(gameBoard[i]);
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        result.textContent = '';
        result.classList.remove('show');
        currentPlayer = 'X';
        renderBoard();
    }
});