const rows=3;
const cols=3;
//initially turn given for player x;
let playerX=true;//user
let playerO=false;//bot
let checkedBox=[];
// adding content in array for computer move :
for(let r=0;r<rows;r++){
    checkedBox[r] = [];
    for(let c=0;c<cols;c++){
        checkedBox[r][c]=0;
    }
}
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
    },50);
}
function startGame(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let newBox=document.createElement("div");    
            newBox.id=r.toString()+"-"+c.toString();
            newBox.classList.add("box");
            document.getElementById("s-game-board").append(newBox);
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
        let idNums=e.target.id.split("-");
        r=parseInt(idNums[0]);
        c=parseInt(idNums[1]);
        checkedBox[r][c]=1;
        e.target.textContent="X";
        document.getElementById("s-msg").textContent="Computer's turn!!";
        e.target.removeEventListener("click",markBox);
        let status=threeInAntiDiagonal()||threeInDiagonal()||threeInColumn()|threeInRow()||tieCheck();
        if(!status){
            playerX=false;
            playerO=true;
        }
        markBox();
    }
    else if(playerO){
        setTimeout(computerMove, 500);
    }
}
function getTempBoxId(){
    let c=Math.floor(Math.random()*3);
    let r=Math.floor(Math.random()*3);
    let tempId=r.toString()+"-"+c.toString();
    return tempId;
}
function checkBoxStatus(sId){
    let ids=sId.split("-");
    let r=parseInt(ids[0]);
    let c=parseInt(ids[1]);
    if(checkedBox[r][c]==0){
        checkedBox[r][c]=1;
        return true;
    }else{
        return false;
    }
}
function computerMove(){
    let selectedId=getTempBoxId();
    let available=checkBoxStatus(selectedId);
    if(available){
        let target=document.getElementById(selectedId);
        target.textContent="O";
        document.getElementById("s-msg").textContent="Your turn";
        target.removeEventListener("click",markBox);
        let status=threeInAntiDiagonal()||threeInDiagonal()||threeInColumn()|threeInRow()||tieCheck();
        if(!status){
            playerO=false;
            playerX=true;
        }
    }else{
        computerMove();
    }
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
        playerO=false;
        playerX=false;
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
        box.style.backgroundColor="brown";
    });
    document.getElementById("s-replay").style.display="inline";
    document.getElementById("s-msg").textContent="Game-Tied";
    return true;
    }
}
function gameOver(first,second,third){
    playerO=false;
    playerX=false;
    first.style.color="red";
    first.style.backgroundColor="gold";
    second.style.color="red";
    second.style.backgroundColor="gold";
    third.style.color="red";
    third.style.backgroundColor="gold";
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.removeEventListener("click", markBox);
    });
    let winnerText=first.textContent;
    let winner="";
    if(winnerText=="X"){
        winner="You Win!";
        document.getElementById("s-msg").textContent="Yes!!! "+winner;
    }else{
        winner="Computer Wins!";
        document.getElementById("s-msg").textContent="Opps!!! "+winner;
    }
    document.getElementById("s-msg").style.color="green";
    document.getElementById("s-msg").style.fontSize="25px";
    document.getElementById("s-replay").style.display="inline";
}
document.getElementById("s-replay").addEventListener("click",()=>{
    location.reload();
});
