const prompt = require('prompt-sync')();

const Rows = 3;
const Cols = 3;

const symbols_counts = {
    'A':2,
    'B':4,
    'C':6,
    'D':8
}

const symbols_values = {
    'A':5,
    'B':4,
    'C':3,
    'D':2
}

const deposit = () =>{
    while(true){
        const depositAmount = prompt('Enter a deposite amount: ');
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Invalide. Try again!');
        } else {
            return numberDepositAmount;
        }
    }
};
    

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt('Enter the number of lines: ');
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log('Invalide. Try again!');
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance,line) =>{
    while(true){
        const bet = prompt('Enter the number of bet per line: ');
        const numberOfbet = parseFloat(bet);

        if (isNaN(numberOfbet) || numberOfbet <= 0 || numberOfbet > (balance / line)){
            console.log('Invalide. Try again!');
        } else {
            return numberOfbet;
        }
    }
}

const spin = () =>{
    const symbols = [];
    for (const [s, c] of Object.entries(symbols_counts)){
       for (let i = 0; i < c; i++){
            symbols.push(s)
       } 
    }

    const reels = [];
    for (let i = 0; i < Cols; i++){
        reels.push([])
        const reel_symbols = [...symbols];
        for (let j = 0; j < Rows; j++){
            const random = Math.floor(Math.random() * reel_symbols.length)
            const selected_symbol = reel_symbols[random]
            reels[i].push(selected_symbol);
            reel_symbols.splice(random, 1);
        }
    }

    return reels
};

const transpose = (reels) =>{
    const rows = [];
  
    for (let i = 0; i < Rows; i++) {
        rows.push([]);
        for (let j = 0; j < Cols; j++) {
            rows[i].push(reels[j][i]);
        }
    }
  
    return rows;
};

const printRows = (rows) =>{
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
            rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * symbols_values[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true){
        const numberOfLines = getNumberOfLines();

        const bet = getBet(balance, numberOfLines)

        const reels = spin()

        const rows = transpose(reels)
        printRows(rows)

        const winnings = getWinnings(rows,bet,numberOfLines)
        balance -= bet * numberOfLines 
        balance += winnings
        console.log('You have won: ' + winnings.toString() + '$ and your balance is: ', + balance)

        if (balance <= 0){
            console.log('Your balance is 0!')
            break;
        }
        const playAgain = prompt('Do you still want to play (y/n)? ')
        if (playAgain != 'y'){
            break;
        }
    };
};

game();

