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


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));

}

const displayCategories = (categories) => {

    const buttonContainer = document.getElementById('button-container')
    categories.forEach((category) => {
        // create a button
        const button = document.createElement('button')
        button.classList = "btn btn-secondary"
        button.innerText = category.category;

        // append button
        buttonContainer.append(button)

    });

}

// const video ={
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }



const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    for (const video of videos) {
        console.log(video)
        // create a card
        const card = document.createElement('div');
        card.classList = "card card-compact";
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
        `
        videosContainer.append(card)
    }
}

// load button category
loadCategories()

// load all videos
loadVideos()