
var mealData;
getImagesData();
getBeerData();
async function getImagesData(){
    const responce = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json");
    const responceData = await responce.json();
    console.log(responceData);
}
async function getBeerData(){
    const responce = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json");
    const responceData = await responce.json();
    console.log(responceData[0]);
    mealData = responceData;
    addMealsToPage(1);
    showPagination(responceData.length);
};
const mealsCont = document.querySelector('#meals');
const paginationCont = document.querySelector('#changeTo');
function addMealsToPage(forPage){
    console.log(mealData);
    let start = (forPage - 1) * 20;
    let end = start+20;
    console.log(start,end);
    mealsCont.innerHTML = null;
    for(let i=start;i<end;++i){
        let meal = document.createElement("div");
        meal.classList.add("meal");
        meal.setAttribute("id",mealData[i].id);
        meal.innerHTML =`
            <p  class="name">Name:${mealData[i].name}</p>
            <p class="style">Type:${mealData[i].style}</p>
            <p class="ounces"><span>Quantity:</span>${mealData[i].ounces}</p>
            <p>abv:4${mealData[i].abv}</p>
            <p>ibu:${mealData[i].ibu}</p>
        `;
        mealsCont.appendChild(meal);
    }
}
function showPagination(length){
    for(let i=1;i<=length;++i){
        const newPage = document.createElement("p");
        newPage.innerHTML = i;
        newPage.addEventListener('click',()=>addMealsToPage(i));
        paginationCont.appendChild(newPage);
    }
}
const leftBtn = document.querySelector('#leftbtn');
const rightBtn = document.querySelector('#rightbtn');
leftBtn.addEventListener('click',()=>{
    if (paginationCont.scrollLeft > 0)
    paginationCont.scrollLeft -=100;
    console.log(paginationCont.scrollLeft)
})
rightBtn.addEventListener('click', () => {
    paginationCont.scrollLeft += 100;
})