var arr = JSON.parse(localStorage.getItem('favourites'));

const publicKey = '525e43e0eeb9d7e66968e648c9e53960';
const privateKey = 'c098c63f9c77e4366dda063b3149f9714b730957';

function generateHash(ts) {
    return CryptoJS.MD5(ts + privateKey + publicKey);
}

function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
    window.location = "details.html";
}

function removeHero(id) {
    var index = arr.indexOf(id);
    arr.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(arr));
    location.reload();
}

function fetchSuperHeros() {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);
    for (let i = 0; i < arr.length; i++) {
        let apiUrl = `https://gateway.marvel.com/v1/public/characters/${arr[i]}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        const heroList = document.querySelector(".hero-list");
        heroList.innerHTML = ''
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.data.results) {
                    // const heroList = document.querySelector(".hero-list");
                    // heroList.innerHTML = ''
                    heroList.innerHTML +=
                        `
                        <div class="hero-item" ">
                            <img src="${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}"  alt="${data.data.results[0].name
                        } ">
                        <p>${data.data.results[0].name}</p>
                        <button class="remove" onclick="removeHero(${arr[i]})">remove</button>
                        <button calss="details" onclick="showDetails(${arr[i]})">details</button>

                        </div>
                        `
                }
            })
    }

}
fetchSuperHeros();