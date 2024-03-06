const btnContainer = document.getElementById('btn-container')
const cardContainer = document.getElementById('card-container')
let selectedCategory = 1000;
console.log(btnContainer)
const fetchCategorys = () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories' 
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        data.forEach((card) => {
            const newBtn = document.createElement('button')
            newBtn.className = 'btn btn-ghost bg-slate-700 text-white text-lg'
            newBtn.innerText = card.category;
            newBtn.addEventListener('click', () =>fetchDataByCategorys(card.category_id))
            btnContainer.appendChild(newBtn)

        })
    })
}
const fetchDataByCategorys=(categoryID) => {
    selectedCategory = categoryID
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        cardContainer.innerHTML=''
        data.forEach((video) => {
            let verifiedBatch = ''
            if (video.authors[0].verified){
                verifiedBatch = '<img class="w-6 h-6" src="./images/verify.png" alt="">';
            }
          
           const newCard = document.createElement('div')
           newCard.innerHTML = `
           <div class="card w-full bg-base-100 shadow-xl caontainer mx-auto">
                <figure class="overflow-hidden ">
                    <img class="w-full h-72" src="${video.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="${video.title}">Laugh At My Pain</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                               ${verifiedBatch}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
           `
           cardContainer.appendChild(newCard)
            
        })
     
    })
}
fetchCategorys()
fetchDataByCategorys(selectedCategory) 