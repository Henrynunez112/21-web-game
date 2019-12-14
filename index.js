document.addEventListener("DOMContentLoaded",()=>{
    let deck_id;
    let button = document.querySelector("#startGame");
    button.addEventListener("click",()=>{
        let startGame = document.querySelector("#startGame");
        startGame.style.display = "none";
        game(deck_id);
    })

    let hit = document.querySelector("#hit");
    hit.addEventListener("click",()=>{
        hitMe(deck_id);
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
    const game = async (id) =>{
        try{
            let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);
            // debugger
            let playerHand = document.querySelector("#playerHand");
            for(i = 0; i < drawCards.data.cards.length; i++){
                let img = document.createElement("img");
                img.src = drawCards.data.cards[i]["image"];
                // debugger;
                playerHand.appendChild(img)
            };
            let score = document.createElement("p");


        }
        catch(error){
            console.log(error)
        }
    }
    fetchAllCards()
    const hitMe = async (idTwo)=>{
        try{
            let compDraw = await axios.get(`https://deckofcardsapi.com/api/deck/${idTwo}/draw/?count=1`);
            let compHand = document.querySelector("#computerHand");
            for(i=0; i < compDraw.data.cards.length; i++){
                let imgTwo = document.createElement("img");
                imgTwo.src = compDraw.data.cards[i]["image"];
                debugger
                playerHand.appendChild(imgTwo)

            }

        }catch(error){

        }
    }        
})




