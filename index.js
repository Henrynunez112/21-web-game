document.addEventListener("DOMContentLoaded",()=>{
    let deck_id;
    let scoreArr = [];
    let hitArr = [];
    let compScore = [];
    let total = 0;
    let computerScore = 0;
    let playerHand = document.querySelector("#playerHand");
    let dealerHand = document.querySelector("#computerHand");
    let h1 = document.createElement("h1");
    let secondH1 = document.createElement("h1");
    let button = document.querySelector("#startGame");
    button.addEventListener("click",()=>{
        let startGame = document.querySelector("#startGame");
        startGame.style.display = "none";
        hit.style.display = "block"
        stay.style.display = "block"
        start(deck_id);

    })
    let hit = document.querySelector("#hit");
    hit.style.display = "none"
    hit.addEventListener("click",()=>{
        hitMe(deck_id)
    })
    let stay = document.querySelector("#stay");
    stay.style.display = "none"
    stay.addEventListener("click",()=>{
        draw(deck_id);
        stay.style.display = "none"
    })
    const fetchAllCards = async ()=>{
        try{
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/`);
            deck_id = res.data.deck_id;
            let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
        }catch(error){
            console.log(error)
        }
    }
    fetchAllCards();
    const start = async (id) =>{
        
        try{
            let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);
            // debugger
            // debugger
            for(let i = 0; i < drawCards.data.cards.length; i++){
                let img = document.createElement("img");
                img.src = drawCards.data.cards[i]["image"];
                playerHand.appendChild(img);

                num = drawCards.data.cards[i]["value"];
                scoreArr.push(num)
                
            };
            score(scoreArr)
            h1.innerText = `Players Score: ${total}`
            playerHand.appendChild(h1)
            gameOver();
            // debugger
        }
        catch(error){
            console.log(error)
        }
    }
    
    fetchAllCards()
    const hitMe = async (idTwo)=>{
        try{
            let hitDraw = await axios.get(`https://deckofcardsapi.com/api/deck/${idTwo}/draw/?count=1`);
            for(let i = 0; i < hitDraw.data.cards.length; i++){
                let imgTwo = document.createElement("img");
                imgTwo.src = hitDraw.data.cards[i]["image"];
                let numTwo = hitDraw.data.cards[i]["value"];
                playerHand.appendChild(imgTwo)
                hitArr.push(numTwo)
            }
            score(hitArr)
            // debugger;
            h1.innerHTML = `Player Score: ${total}`;
            playerHand.appendChild(h1)    
            gameOver()
            
        }catch(error){
            console.log(error)
        }
    }  
    fetchAllCards();
    
    let draw = async (idThree) =>{
        try{
            let stayBtn = await axios.get(`https://deckofcardsapi.com/api/deck/${idThree}/draw/?count=3`)
            for(let i = 0; i < stayBtn.data.cards.length; i++){
                let imgThree = document.createElement("img");
                imgThree.src = stayBtn.data.cards[i]["image"];
                let numThree = stayBtn.data.cards[i]["value"]
                dealerHand.appendChild(imgThree);
                // debugger
                compScore.push(numThree)
            }
            stayScore(compScore);
            // debugger;
            secondH1.innerHTML = `House Score: ${computerScore}`;
            dealerHand.appendChild(secondH1)
            gameOver()

            
            
        }catch(error){
            console.log(error)
        }
    }

    const score = (arr) =>{
        let sum = 0;
        arr.forEach(el =>{
            if(el === "KING" || el === "QUEEN" || el === "JACK"){
               el = 10;
               sum += el;
            }else if(el === "ACE"){
                if(sum < 11){
                    el = 11;
                    sum += el;
                }else{
                    el = 1;
                    sum += el
                }
            }else{
                sum += Number(el)
            }
        })
        // debugger;
        total += sum;
        hitArr = []
    }
    const stayScore = (arr) =>{
        let sum = 0;
        arr.forEach(el =>{
            if(el === "KING" || el === "QUEEN" || el === "JACK"){
               el = 10;
               sum += el;
            }else if(el === "ACE"){
                if(sum < 11){
                    el = 11;
                    sum += el;
                }else{
                    el = 1;
                    sum += el
                }
            }else{
                sum += Number(el)
            }
        })
        // debugger;
        computerScore += sum
        compScore = []
    }

    const gameOver = () =>{
        // debugger
        if(total > 21){
            h1.innerHTML = `BUSTED!!!`;
            hit.style.display = "none";
            stay.style.display = "none";
        }else if(total === 21){
            h1.innerHTML = `CONGRATS ${total}2121212121`;
            hit.style.display = "none";
            stay.style.display = "none";
        }else if(computerScore > 21){
            h1.innerHTML = `The House BUST with ${computerScore}. YOU WIN`;
            secondH1.innerHTML = ""
            stay.style.display = "none"
        }
        else if(computerScore === total){
            h1.innerHTML = `ITS A TIE`
            secondH1.innerHTML = `ITS A TIE`;
            hit.style.display = "none";
            stay.style.display = "none"
        }
        else if(computerScore > 0 && computerScore > total){
            secondH1.innerHTML = `The house wins ${computerScore}`;
            hit.style.display = "none";
            stay.style.display = "none"         
        }else if(computerScore > 0 && computerScore < total){
            h1.innerHTML = `Congrats!!!!!!!!! you beat the house with ${total}`;
            hit.style.display = "none";
            stay.style.display = "none"
        }
    }    
})




