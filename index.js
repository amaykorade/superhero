
if (localStorage.getItem('favourites') == null) {
    localStorage.setItem('favourites', JSON.stringify([]));
} else {
    var arr = JSON.parse(localStorage.getItem('favourites'));
}

function showDetail(idNumber) {
    localStorage.setItem("id", idNumber);
    window.location = "details.html";
}

function addToFavorites(id) {
    if (!arr.includes(id) == true) {
        arr.push(id);
        localStorage.setItem("favourites", JSON.stringify(arr));
        alert('added successfully');
    } else {
        alert('Super hero already present in favourites')
    }
}

const publicKey = '525e43e0eeb9d7e66968e648c9e53960';
const privateKey = 'c098c63f9c77e4366dda063b3149f9714b730957';

function generateHash(ts) {
    return CryptoJS.MD5(ts + privateKey + publicKey);
}

function fetchSuperHeros() {
    const inputValue = document.querySelector("#heroName").value;
    if (inputValue.lenght > 0) {

    } else {
        const ts = new Date().getTime().toString();
        const hash = generateHash(ts);

        let apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${inputValue}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data.results);
                if (data.data.results) {
                    const heroList = document.querySelector(".grid");
                    heroList.innerHTML = '';
                    data.data.results.forEach((element) => {
                        const hero = document.createElement('div');
                        hero.className = 'grid-item';
                        hero.innerHTML = `
                            <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
                            <p class="name">${element.name}</p>
                            <a href="superhero.html?id=${element.id}" target="_blank" onclick="showDetail(${element.id})" >Details</a>
                            <button class="fav-btn" id=${element.id} onclick="addToFavorites(${element.id})">F</button>
                        `
                        heroList.append(hero);
                    })
                }
            })
            .catch(error => {
                console.error(`Fetch error: `, error);
            })
    }


}

fetchSuperHeros();