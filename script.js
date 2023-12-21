var data = [];
// var favArr = [];
var dataF = [];


async function fetchData() {
    const response = await fetch('http://localhost:3000/movies');
    data = await response.json();
    // console.log(data,"jsondata")
    data.map(function (objData) {
        document.getElementById('cards').innerHTML += `
            <div class="card" style="width:300px  ">
               <img id="img1" class="card-img-top w-100   " src="${objData.posterPath}" alt="Card image">
               <div class="card-body">
                 <h4 class="card-title">Movie Title : ${objData.title}</h4>
                 <p class="card-text">Movie Release : ${objData.releaseDate}.</p>
                 <button id="${objData.id}" onclick="addFavourite(this.id)" class="btn btn-primary">Add Favourite</button>
               </div>
             </div>
        `
    })
    // for (let i = 0; i < data.length; i++) {
    //     document.getElementById('cards').innerHTML += `
    //          <div class="card" style="width:400px">
    //             <img id="img1" class="card-img-top" src="${data[i].posterPath}" alt="Card image">
    //             <div class="card-body">
    //               <h4 class="card-title">Movie Title : ${data[i].title}</h4>
    //               <p class="card-text">Movie Release : ${data[i].releaseDate}.</p>
    //               <a href="#" id="${data[i].id}" onclick="addFavourite(this.id)" class="btn btn-primary">Add Favourite</a>
    //             </div>
    //           </div>
    //     `
    // }
}
fetchData();

async function addFavourite(id) {
    if (id !== undefined) {
        // let item = data.find (item => item.id === id); movie ki id find krne ke liye data array mai se!!
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                var item = data[i];
            }
        }

            if (dataF.find(temp => temp.movieID === item.movieID) != null) {
                alert("Movie already exist");
            }
            else {
                const response = await fetch("http://localhost:3000/favourites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        movieID: item.movieID,
                        title: item.title,
                        releaseDate: item.releaseDate,
                        posterPath: item.posterPath
                    }),
                });
                const data = await response.json();
                console.log(data);
            }
        }
    }

addFavourite();
async function fetchFavourites() {
    const response1 = await fetch('http://localhost:3000/favourites');
    dataF = await response1.json();
    console.log(dataF)
    for (let i = 0; i < dataF.length; i++) {
        document.getElementById('fav-cards').innerHTML += `
             <div class="card" style="width:400px">
                <img id="img1" class="card-img-top" src="${dataF[i].posterPath}" alt="Card image">
                <div class="card-body">
                  <h4 class="card-title">Movie Title : ${dataF[i].title}</h4>
                  <p class="card-text">Movie Release : ${dataF[i].releaseDate}.</p>
                  <button id="${dataF[i].id}" onclick="DeleteFav(this.id)" class="btn btn-primary">Delete</button>
                </div>
              </div>
        `
    }
}

async function DeleteFav(id) {
    const response = await fetch('http://localhost:3000/favourites/' + id, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(json.stringify(data));
    console.log(data);
}
fetchFavourites();