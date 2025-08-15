const ticTac = document.querySelector(".ticTac");
const boxes = document.querySelectorAll(".box");
const h1 = document.getElementsByTagName('h1');
const rBtn = document.getElementById("rstbtn");

let currentPlayer = 'X';
let count = 0;

let winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
]



function startGame(e){

    if(e.target.innerText === "" && e.target.className !== "ticTac"){
            e.target.innerText = currentPlayer;
            count++;
            winner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';    
        }

    if(count === 9){
        h1[0].innerText = `MATCH IS DRAWN`;    
    }
        
}


ticTac.addEventListener('click', startGame);

// ticTac.addEventListener('click', (e)=>{
//     // console.log(e)
//     // console.log(e.target)

//     // e.target.textContent="Jai Siya Ram"
//     // e.target.innerText="Jai Siya Ram"

//     if(e.target.innerText === "" && e.target.className !== "ticTac"){
//         e.target.innerText = currentPlayer;
//         winner();
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';    
//     }
    
// });

function winner(){
    winningCondition.forEach((item)=>{
        let index0 = item[0];
        let index1 = item[1];
        let index2 = item[2];
        // console.log(item, index0, index1, index2);

        let val0 = boxes[index0].innerText;
        let val1 = boxes[index1].innerText;
        let val2 = boxes[index2].innerText;

        
        // console.log(index0, val0, index1, val1, index2, val2);

        if(val0!=='' && val1!=='' && val2!==''){
            if(val0 === val1 && val1 === val2)
            {
                boxes[index0].classList.add("winnerClass")
                boxes[index1].classList.add("winnerClass")
                boxes[index2].classList.add("winnerClass")
                // boxes[index0].style.backgroundColor="darkgreen";
                // boxes[index1].style.backgroundColor="darkgreen";
                // boxes[index2].style.backgroundColor="darkgreen";
                count = 0;
                h1[0].innerText = `Winner is ${val0}`;
                h1[0].style.fontSize = "80px";
                ticTac.removeEventListener('click', startGame);

            }
        }
    })
}


rBtn.addEventListener('click', ()=>{
    boxes.forEach(item=>{
        item.classList.remove("winnerClass")
        item.innerText='';
    });
    h1[0].innerText = `Tic-Tac-Toe`;
    h1[0].style.fontSize = "35px";
    currentPlayer = 'X';
    ticTac.addEventListener('click', startGame);
});
