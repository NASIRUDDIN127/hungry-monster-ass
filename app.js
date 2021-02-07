const search = document.getElementById('search'),
submit = document.getElementById('submit'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');


//take from api
function searchMeal(e){
    e.preventDefault();
    single_mealEl.innerHTML = '';

    //search for food terms
    const term = search.value;

    if(term.trim()){
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${term}')
       .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `
            <h3>search result '${term}':</h3>`;
            if (data.meals === null){
                resultHeading.innerHTML = `<p>not available. try another one </p>`;
               
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}">
                </div>
                </div>
                `)
                .join('');
            }
        });
       //provide search result
       search.value = '';

    } else {
        alert('enter the name of the food in the search field');
    }
}

//listener
submit.addEventListener('submit', searchMeal);