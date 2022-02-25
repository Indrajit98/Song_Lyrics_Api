document.getElementById("search-button").addEventListener("click", function () {
  const searchValue = document.getElementById("search-value").value;
  function searchMusic() {
    fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("search-result").innerHTML = "";
        const display = document.getElementById("search-result");
        display.style.display = "block";
        for (let i = 0; i < data.data.length; i++) {
          const titleName = data.data[i].title;
          const artistName = data.data[i].artist.name;
          // console.log(data.data[0]);
          document.getElementById("search-result").innerHTML += `
      <div>
      <div  class="search-result col-md-12 mx-auto py-4">
      <div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9">
              <h3 class="lyrics-name" id="lyrics-name">${titleName}</h3>
              <p class="author lead" id="author-lead">${artistName} <span>Washed Out</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
              <button id="get-lyrics" class="btn btn-success" onclick="getLyrics('${titleName}', '${artistName}')">Get Lyrics</button>
          </div>
      </div>
  </div>
      </div> 
      `;
          if (i == 9) {
            break;
          }
        }
      })
      .catch((err) => alert("Not found"));
  }
  searchMusic();
});
function getLyrics(title,name){
  fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
  .then(res =>res.json())
  .then (data => {
    // console.log(data.lyrics)
    if(data.lyrics == undefined){
      document.getElementById('lyrics').innerHTML = 'Sorry!! lyrics is found' 
    }
    else{
      document.getElementById('lyrics').innerText= data.lyrics;
    }
  })
}