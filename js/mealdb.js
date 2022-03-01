const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals == null) {
        const noMeal = document.getElementById('no-meal');
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>No Meal Found..</h2>
        `;
        noMeal.appendChild(div);
    } else {
        meals.forEach(meal => {
            const noMeal = document.getElementById('no-meal');
            noMeal.textContent = '';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
                </div>
                `;
            searchResult.appendChild(div);
        })
    }




}

// extra information showing above part

const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = (meal) => {

    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 125)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">more details..</a>
            </div>
    `;
    mealDetails.appendChild(div);

}