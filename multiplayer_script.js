const rows=3;
const cols=3;
//initially turn given for player x;
let playerX=true;
let playerO=false;
let board=[];
window.onload=function(){
    startGame();
    window.setInterval(function checkWinner(){
        threeInRow();
        threeInColumn();
        threeInDiagonal();
        threeInAntiDiagonal();
        let status=threeInAntiDiagonal()||threeInDiagonal()||threeInColumn()|threeInRow();
        if(!status){
            tieCheck();
        }
    },100);
}
function startGame(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let newBox=document.createElement("div");    
            newBox.id=r.toString()+"-"+c.toString();
            newBox.classList.add("box");
            document.getElementById("game-board").append(newBox);
            newBox.textContent="";
            newBox.addEventListener("click",markBox);
        }
    }
    document.getElementById("0-1").style.borderRight="5px solid black";
    document.getElementById("1-0").style.borderRight="5px solid black";
    document.getElementById("0-0").style.borderRight="5px solid black";
    document.getElementById("1-1").style.borderRight="5px solid black";
    document.getElementById("2-0").style.borderRight="5px solid black";
    document.getElementById("2-1").style.borderRight="5px solid black";
    document.getElementById("0-0").style.borderBottom="5px solid black";
    document.getElementById("0-1").style.borderBottom="5px solid black";
    document.getElementById("1-0").style.borderBottom="5px solid black";
    document.getElementById("1-1").style.borderBottom="5px solid black";
    document.getElementById("0-2").style.borderBottom="5px solid black";
    document.getElementById("1-2").style.borderBottom="5px solid black";
}
function markBox(e){
    if(playerX){
        e.target.textContent="X";
        document.getElementById("msg").textContent="Player2 turn";
        playerX=false;
        playerO=true;
    }
    else{
        e.target.textContent="O";
        document.getElementById("msg").textContent="Player1 turn";
        playerO=false;
        playerX=true;
    }
    e.target.removeEventListener("click",markBox);
}
function threeInRow(){
    for(let r=0;r<rows;r++){
        let c=0;
        let firstBox=document.getElementById(r.toString()+"-"+c.toString());
        c+=1;
        let secondBox=document.getElementById(r.toString()+"-"+c.toString());
        c+=1;
        let thirdBox=document.getElementById(r.toString()+"-"+c.toString());
        if(firstBox.textContent==secondBox.textContent&&secondBox.textContent==thirdBox.textContent&&firstBox.textContent!=""){
            gameOver(firstBox,secondBox,thirdBox);
            return true;
        }
    }
    return false;
}
function threeInColumn(){
    for(let c=0;c<cols;c++){
        let r=0;
        let firstBox=document.getElementById(r.toString()+"-"+c.toString());
        r+=1;
        let secondBox=document.getElementById(r.toString()+"-"+c.toString());
        r+=1;
        let thirdBox=document.getElementById(r.toString()+"-"+c.toString());
        if(firstBox.textContent==secondBox.textContent&&secondBox.textContent==thirdBox.textContent&&firstBox.textContent!=""){
            gameOver(firstBox,secondBox,thirdBox);
            return true;
        }
    }
    return false;
}
function threeInDiagonal(){
    //main diagonal ma r=c 00 11 22
    //  00  |   01  |   02
    //  ----|-------|--------
    //  10  |   11  |   12
    //------|-------|--------
    //  20  |   21  |   22
    let firstBox=document.getElementById("0-0");
    let secondBox=document.getElementById("1-1");
    let thirdBox=document.getElementById("2-2");
    if(firstBox.textContent==secondBox.textContent&&secondBox.textContent==thirdBox.textContent&&firstBox.textContent!=""){
        gameOver(firstBox,secondBox,thirdBox);
        return true;
    }
    return false;
}
function threeInAntiDiagonal(){
    //sub diagonal ma 20 11 02
    let firstBox=document.getElementById("0-2");
    let secondBox=document.getElementById("1-1");
    let thirdBox=document.getElementById("2-0");
    if(firstBox.textContent==secondBox.textContent&&secondBox.textContent==thirdBox.textContent&&firstBox.textContent!=""){
        gameOver(firstBox,secondBox,thirdBox);
        return true;
    }
    return false;
}
function tieCheck(){
    const boxes = document.querySelectorAll(".box");
    let count=0;
    boxes.forEach(box => {
        if(box.textContent!=""){
            count+=1;
        }
    });
    if(count==9){
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
        box.style.backgroundColor="brown";
    });
        document.getElementById("replay").style.display="inline";
    }
}
function gameOver(first,second,third){
    first.style.backgroundColor="gold";
    second.style.backgroundColor="gold";
    third.style.backgroundColor="gold";
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.removeEventListener("click", markBox);
    });
    let winnerText=first.textContent;
    let winner="";
    if(winnerText=="X"){
        winner="player1";
    }else{
        winner="player2";
    }
    document.getElementById("msg").textContent="Winner: "+winner;
    document.getElementById("msg").style.color="green";
    document.getElementById("msg").style.fontSize="25px";
    document.getElementById("replay").style.display="inline";
}
document.getElementById("replay").addEventListener("click",()=>{
    location.reload();
});
