// function for set time
function getTime(time) {
    const day = parseInt(time / 86400)
    let remainSecond = time % 86400;
    const hour = parseInt(remainSecond / 3600);
    remainSecond = remainSecond % 3600;
    const minute = parseInt(remainSecond / 60)
    remainSecond = remainSecond % 60;
    return `${day} day ${hour} hour ${minute} minute ${remainSecond} second ago`
}

const removeBtnColor = ()=>{
    const buttons = document.getElementsByClassName('btn');
    for(let btn of buttons){
        btn.classList.remove('btn-primary')
    }
}

// search button
document.getElementById('search-input').addEventListener('keyup',(e)=>{
    const searchInput = e.target.value;
    loadVideos(searchInput);
})


// show details but click details
const showDatailsBtn=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
        .then(res => res.json())
        .then(data => showModalbtn(data.video))
        .catch(error => console.log(error));
}

const showModalbtn=(video)=>{
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML=`
        <img src="${video.thumbnail}" />
        <p>${video.description}</p>
    `
    // step-01
    // document.getElementById('modal-btn').click()
    // step-01
    document.getElementById('custom').showModal()
}

// load api for category button
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));

}

// getting videos but click on button api

const loadCategoryById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data =>{
            // sovai ke remove korte hobe
            removeBtnColor()
            // id ar class active korte hobe
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('btn-primary')
            displayVideos(data.category)
        })
        .catch(error => console.log(error));

}


// loading api for homepage videos

const loadVideos = (searchInput= '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}




// show button 
const displayCategories = (categories) => {

    const buttonContainer = document.getElementById('button-container')
    categories.forEach((category) => {
        // console.log(category);
        const buttonCard = document.createElement('div')
        buttonCard.innerHTML = `
        <button onclick="loadCategoryById(${category.category_id})" 
            id="btn-${category.category_id}" class="btn">
            ${category.category}
        </button>
        `

        // append div
        buttonContainer.append(buttonCard)

    });

}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML ='';

    if(videos.length == 0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML= `
        <div class="flex flex-col gap-3 justify-center items-center py-10">
        <img class="h-[300px] w-[300px]" src="assets/Icon.png" />
        <p class="text-xl font-semibold">There is no video in this category</p>
        </div>
        `;
        return
    } 
    else{
        videosContainer.classList.add("grid")
    }


    for (const video of videos) {
        console.log(video)
        // create a card
        const card = document.createElement('div');
        card.classList = "card card-compact mb-5";
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img
            src=${video.thumbnail}
            alt="image" class="h-full w-full object-cover" />

            ${video.others.posted_date?.length == 0 ? '' : `<span class="bg-black text-xs p-1 text-white rounded-md absolute right-2 bottom-2"> ${getTime(video.others.posted_date)}</span>`}

        </figure>
        <div class="px-0 py-2 flex items-center gap-3">
            <div>
            <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                <p>${video.authors[0].profile_name} </p>
                ${video.authors[0].verified ? `<i class="fa-solid fa-certificate"></i>` : ''}
                </div>
            </div>
        </div>
        <div class="text-center">
        <button class="btn btn-sm" id=${video.video_id} onclick="showDatailsBtn(id)">Details</button>
        </div>
        `
        videosContainer.append(card)
    }
}

// load button category
loadCategories()

// load all videos
loadVideos()
