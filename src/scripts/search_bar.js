class SearchBar extends HTMLElement {
    connectedCallback () {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        console.log('ini valuenya ni');
        console.log(this.querySelector('#searchElement').value);
        return this.querySelector('#searchElement').value;
    }

    render () {
        this.innerHTML = `
        <div id="search-container" class="search-container col-md-12 d-flex">
            <input placeholder="Search Card Decks" name="search" id="searchElement" class="form-control mr-2" type="search">
            <button id="searchButtonElement" class="btn btn-success button-search" type="submit">Search</button>
        </div>
        `
        this.querySelector('#searchButtonElement').addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);