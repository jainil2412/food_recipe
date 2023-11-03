const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector(".meal-details-content")
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners

searchBtn.addEventListener("click",getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt =document.getElementById('search-input').value.trim();
    // console.log(searchInputTxt);
    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' +searchInputTxt; 
    fetch(url).then(Response => Response.json()).then(data =>{
    // fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=${}').then(Response => Response.json()).then(data =>{
        // console.log(data);  
    let html ="";
            if(data.meals){
                data.meals.forEach(meal =>{
                    html +=`
                    <div class="meal-item" id="${meal.idMeal}">
                    <div class="meal-image">
                        <img src="${meal.strMealThumb}"  alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div> `    
                });
                mealList.classList.remove('notFound')
            }
            else{
                html="sorry,we didn't find any meal !";
                mealList.classList.add("notFound")
            }
            mealList.innerHTML = html;
    })
}

// get recip of the meal 
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem.id);
        let mealDetail ;
        mealDetail ='https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ mealItem.id;
        // mealDetail ="https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
        console.log(mealDetail)
        fetch(mealDetail).then(Response=> Response.json()).then(data =>
          { mealRecipeModal(data.meals)
          }) ;
    }   
}

// create a model 
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}