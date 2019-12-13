let deck_id;
    console.log(deck_id)
document.addEventListener("DOMContentLoaded",()=>{
    let button = document.querySelector("#startGame");
    button.addEventListener("click",()=>{
        let startGame = document.querySelector("#startGame");
        startGame.style.display = "none";
        fetchAllCards()
        game(deck_id);
        
    })
    const fetchAllCards = async ()=>{
        try{
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/`);
            let deck_id = res.data.deck_id;
            let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
            debugger
            deck_id += shuffled.data.deck_id;
        }catch(error){
            console.log(error)
        }
    }
    const game = async (id) =>{
        try{
            let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);
            debugger
            let playerHand = document.querySelector("#playerHand");
            for(i = 0; i < drawCards.data.cards.length; i++){
                let img = document.createElement("img");
                img.src = drawCards.data.cards[i]["image"];
                playerHand.appendChild(img)
            };



            
            
            
            
            
        }
        catch(error){
            console.log(error)
        }
    }             
})

