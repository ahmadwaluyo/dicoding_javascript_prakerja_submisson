import './search_bar';

function main() {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?atk=5000";
    const searchElement = document.querySelector("search-bar");

    const getDecks = async () => {

        try {
            const response = await fetch(`${baseUrl}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllDecks(responseJson.data);
            }
        } catch(error) {
            showResponseMessage(error)
        }
    };

    const getDeckById = async (deckId) => {

        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${deckId}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                console.log('ini responseJson data id', responseJson.data);
                renderById(responseJson.data);
            }
        } catch(error) {
            showResponseMessage(error)
        }
    };

    const getDeckBySearch = async () => {
        const value = searchElement.value;

        console.log('masuk getdeckbysearch, terus value nya ini: ', value);

        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${value}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(showResponseMessage.error);
            } else {
                console.log('masuk data ni');
                console.log(responseJson.data);
                renderBySearch(responseJson.data);
            }
        } catch (error) {
            showResponseMessage(error)
        }
    }

    const renderById = (deck) => {
        let detailDeck = deck[0];
        console.log('masuk render id');
        console.log(deck);
        const listDeckDetailElement = document.querySelector(`#detail${detailDeck.id}`);
        listDeckDetailElement.innerHTML = "";

        listDeckDetailElement.innerHTML += `
        <table class="table table-bordered table-hover" style="color:white; width: 150%; margin-top: 20px">
            <tr>
                <th>Monster Name</th>
                <td>: ${detailDeck.name}</td>
            </tr>
            <tr>
                <th>Monster Type</th>
                <td>: ${detailDeck.type}</td>
            </tr>
            <tr>
                <th>Monster Descriptions</th>
                <td>: ${detailDeck.desc}</td>
            </tr>
            <tr>
                <th>Attack Power</th>
                <td>: ${detailDeck.atk}</td>
            </tr>
            <tr>
                <th>Deffence Power</th>
                <td>: ${detailDeck.def}</td>
            </tr>
            <tr>
                <th>Amazon Price</th>
                <td>: $ ${detailDeck.card_prices[0].amazon_price}</td>
            </tr>
            <tr>
                <th>e-Bay Price</th>
                <td>: $ ${detailDeck.card_prices[0].ebay_price}</td>
            </tr>
        <table>
        `
    }

    const renderAllDecks = (decks) => {
        const listDeckElement = document.querySelector("#listDeck");
        listDeckElement.innerHTML = "";

        decks.forEach(deck => {
            listDeckElement.innerHTML += `
                <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top: 12px;">
                    <div class="card bg-dark col-md-12" style="color: white">
                        <div class="row col-md-10 p-2">
                        <img src="${deck.card_images[0].image_url}" alt="${deck.name} class="col-md-6" id="img"></img>
                            <div class="col-md-6 ml-2">
                                <h1 class="col-md-12 text-center">Detail Deck</h1>
                                <div id="detail${deck.id}"></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 style="color: #FFD700">${deck.name}</h5>
                            <p>${deck.type}</p>
                        </div>
                        <button type="button" class="btn btn-outline-success button-detail p-2" id="${deck.id}">Show Detail</button>
                    </div>
                </div>
            `;
        });
        
        const buttons = document.querySelectorAll(".button-detail");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const deckId = event.target.id;
                routerId(deckId);
            })
        })
    };

    const renderBySearch = (decks) => {
        console.log('masuk render id');
        console.log(decks);

        const listDeckElement = document.querySelector("#listDeck");
        listDeckElement.innerHTML = "";

        decks.forEach(deck => {
            listDeckElement.innerHTML += `
                <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top: 12px;">
                    <div class="card bg-dark col-md-12" style="color: white">
                        <div class="row col-md-10 p-2">
                        <img src="${deck.card_images[0].image_url}" alt="${deck.name} class="col-md-6" id="img"></img>
                            <div class="col-md-6 ml-2">
                                <h1 class="col-md-12 text-center">Detail Deck</h1>
                                <div id="detail${deck.id}"></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 style="color: #FFD700">${deck.name}</h5>
                            <p>${deck.type}</p>
                        </div>
                        <button type="button" class="btn btn-outline-success button-detail p-2" id="${deck.id}">Show Detail</button>
                    </div>
                </div>
            `;

            const buttons = document.querySelectorAll(".button-detail");
            buttons.forEach(button => {
                button.addEventListener("click", event => {
                    const deckId = event.target.id;
                    routerId(deckId);
                })
            })
        });
    }

    const routerId = (deckId) => {
        getDeckById(deckId);
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    searchElement.clickEvent = getDeckBySearch;

    document.addEventListener("DOMContentLoaded", () => {
        getDecks();
    });
}

export default main;
