const publicKey = '525e43e0eeb9d7e66968e648c9e53960';
const privateKey = 'c098c63f9c77e4366dda063b3149f9714b730957';

function generateHash(ts) {
  return CryptoJS.MD5(ts + privateKey + publicKey);
}

function fetchSuperHeros() {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);

  let apiUrl = `https://gateway.marvel.com/v1/public/characters/${localStorage.getItem("id")}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.data);
      if (data.data) {
        const heroInfo = document.querySelector(".hero-info");
        heroInfo.innerHTML = `
                <img src="${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}"  alt="${data.data.results[0].name
          } ">
                
                <h1>${data.data.results[0].name}</h1>
                <ul>
                
                  <li class="uniq-info">
                    <p>Bio -</p>
                    <p>${data.data.results[0].description || 'No description available.'}</p>
                  </li>
                  <li class="uniq-info">
                    <p>Comics -</p>
                    <ul>
                       ${renderList(data.data.results[0].comics)}
                    </ul>
                  </li>
                  <li class="uniq-info">
                    <p>Events -</p>
                    <ul>
                    ${renderList(data.data.results[0].events)}
                    </ul>
                  </li>
                  <li class="uniq-info">
                    <p>Series -</p>
                    <ul>
                    ${renderList(data.data.results[0].series)}
                    </ul>
                  </li>
                  <li class="uniq-info">
                    <p>Stories -</p>
                    <ul>
                    ${renderList(data.data.results[0].stories)}
                    </ul>
                  </li>
                </ul>
                
    
      
                `
        // document.getElementById("img")
        //     .setAttribute("src", `${ data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension } `);


      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
}
fetchSuperHeros();

function renderList(items) {
  if (items && items.items && Array.isArray(items.items)) {
    return items.items.map(item => `<li>${item.name}</li>`).join('');
  } else {
    return '';
  }
}