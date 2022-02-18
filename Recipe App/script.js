const searchButton = document.getElementById('search');
const searchTerm = document.getElementById('search-text');

const mealsEl = document.getElementById('meals');

const favouriteContainer = document.getElementById("fav-meals");


getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    // console.log(randomMeal);

    addMeal(randomMeal, true); 
}

async function getMealById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();

    // console.log(respData);
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    // console.log(respData);
    const meals = await respData.meals;
    return meals;
} 

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ``}
            
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>

    `;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealfromLocalStorage(mealData.idMeal); 
            btn.classList.remove("active");
        } else{
            addToLocalStorage(mealData.idMeal);
            btn.classList.add("active");
            setTimeout(location.reload(), 5000);
        }
    });

    mealsEl.appendChild(meal);
}

function addToLocalStorage(mealId) {
    const mealIds = getMealFromLocalStorge();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealfromLocalStorage(mealId) {
    const mealIds = getMealFromLocalStorge();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id!== mealId)));
}

function getMealFromLocalStorge() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    // console.log(mealIds);

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    const mealIds = getMealFromLocalStorge();

    for(let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i];

        meal = await getMealById(mealId);

        addMealToFav(meal);
        // meals.push(meal);
    }
}

function addMealToFav(mealData) {

    const Favmeal = document.createElement('li');

    Favmeal.innerHTML = `
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = Favmeal.querySelector('.clear');

    btn.addEventListener("click", ()=> {
        removeMealfromLocalStorage(mealData.idMeal);

        favouriteContainer.innerHTML = '';
        fetchFavMeals();
    });

    favouriteContainer.appendChild(Favmeal);
    
}

// console.log(searchButton, searchTerm);
searchButton.addEventListener("click",async () => {

    mealsEl.innerHTML = '';
    const term = searchTerm.value;
    // console.log(term);
    searchTerm.value = ''; 

    // console.log(await getMealsBySearch(term));
    const meals = await getMealsBySearch(term);

    if(meals){
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});