document.addEventListener("DOMContentLoaded",()=>{
    let deck_id;
    let scoreArr = [];
    let hitArr = [];
    let compScore = [];
    let total = 0;
    let hitTotal = 0;
    let computerScore = 0;
    let playerHand = document.querySelector("#playerHand");
    let button = document.querySelector("#startGame");
    let h1 = document.createElement("h1");
    button.addEventListener("click",()=>{
        let startGame = document.querySelector("#startGame");
        startGame.style.display = "none";
        start(deck_id);
        // debugger
    })
    let hit = document.querySelector("#hit");
    hit.addEventListener("click",()=>{
        hitMe(deck_id);
    })
    let stay = document.querySelector("#stay");
    stay.addEventListener("click",()=>{
        console.log('2',deck_id)
        draw(deck_id)
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
            hitArr.pop()
            playerHand.appendChild(h1)
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
            debugger;
            h1.innerHTML = `Player Score: ${total}`;
            playerHand.appendChild(h1)    
            
        }catch(error){
            console.log(error)
        }
    }  
    fetchAllCards();
    
    let draw = async (idThree) =>{
        try{
            let stayBtn = await axios.get(`https://deckofcardsapi.com/api/deck/${idThree}/draw/?count=2`)
            for(let i = 0; i < stayBtn.data.cards.length; i++){
                let dealer = document.querySelector("#computerHand");
                let imgThree = document.createElement("img");
                imgThree.src = stayBtn.data.cards[i]["image"];
                let numThree = stayBtn.data.cards[i]["value"]
                dealer.appendChild(imgThree);
                compScore.push(numThree)
                // debugger
            }
            score(stayBtn);
            // let p = document.querySelector("#compScore");
            // p.innerText = 

            
            
        }catch(error){
            console.log(error)
        }
    }
    const score = (arr) =>{
        let sum = 0

        
        arr.forEach(el =>{
            if(el === "ACE"){
                if(sum < 10){
                    el = 11;
                    sum += el
                }else{
                    el = 1;
                    sum += el
                }
            }else if(el === "KING" || el === "QUEEN" || el === "JACK"){
                el = 10;
                sum += el
            }else{
                sum += Number(el)
            }
        })
        debugger;
        total += sum
        hitArr.pop()
    }



})





