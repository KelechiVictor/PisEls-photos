 if(window.innerWidth > 500){
document.queryselector('body').style.display = 'none';
}

const apikey = "BvVz7nsdifMqkVFMy47ftdGdXhunTQrF9bFSgqUyDRnEGujIPNDrQPZN";
const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input",(e) =>{
    event.preventDefault();
    search_text = e.target.value;
})

/** Adding Event Listener to search button to search according to input value **/
search_btn.addEventListener("click",()=>{
    if(input.value==="")
    {
        alert("Enter Image Name")
        return;
    }
    cleargallery();
    search = true;
    SearchPhotos(search_text,page_num);
})

function cleargallery(){
    document.querySelector(".display_images").innerHTML ="";
    page_num = 1;
}

/** Displaying Default Images as the page loads
    **/
async function CuratedPhotos(page_num){
      // fetching data from the api
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    //convert the response to json 
    const response = await data.json();
    console.log(response);

    display_images(response);// calling the display_images method to display the images
}

function display_images(response){
    //using forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo = document.createElement("div");
        photo.innerHTML =`<img src=${image.src.large}/>
        <figcaption> Photo By: ${image.photographer}</figcaption>`;
        document.querySelector(".display_images").appendChild(photo);
    });
}

async function SearchPhotos(query, page_num){
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response = await data.json();
    console.log(response);

    display_images(response);
}

showmore_btn.addEventListener("click", () => {
    if(!search){  
        page_num++;
        CuratedPhotos(page_num);
    }
    else{
        if(search_text.value==="")
        return;
        page_num++;
        SearchPhotos(search_text,page_num);
    }
})

CuratedPhotos(page_num);



/*****Nav Button Code*****/
let burger = document.getElementById('burger'),
	 nav    = document.getElementById('main-nav'),
	 slowmo = document.getElementById('slowmo');

burger.addEventListener('click', function(e){
	this.classList.toggle('is-open');
	nav.classList.toggle('is-open');
});

slowmo.addEventListener('click', function(e){
	this.classList.toggle('is-slowmo');
});

/* Onload demo - dirty timeout */
let clickEvent = new Event('click');

window.addEventListener('load', function(e) {
	slowmo.dispatchEvent(clickEvent);
	burger.dispatchEvent(clickEvent);
	
	setTimeout(function(){
		burger.dispatchEvent(clickEvent);
		
		setTimeout(function(){
			slowmo.dispatchEvent(clickEvent);
		}, 4500);
	}, 5500);
});
