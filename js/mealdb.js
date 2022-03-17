// search on enter key pressing in keyboard directly 
const searchBtn = document.getElementById("search-button");
const searchFld = document.getElementById("search-field");

searchFld.addEventListener("keypress", function (event) {
    /* event.preventDefault(); */
    if (event.keyCode == 13) {
        searchBtn.click();
    }
});


document.getElementById('error-message').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data from extra information div
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';

    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';


    if (searchText == '') {

        const noMeal = document.getElementById('no-meal');
        noMeal.textContent = '';

        const div = document.createElement('div');
        div.innerHTML = `
            <h2>Empty Search field..</h2>
        `
        const addSearchInput = document.getElementById('empty-search');
        addSearchInput.innerText = '';

        addSearchInput.appendChild(div);

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    } else {
        const addSearchInput = document.getElementById('empty-search');
        addSearchInput.innerText = '';
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }

}

const displayError = error => {

    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
    // console.log(meals);

    if (meals == null) {
        const noMeal = document.getElementById('no-meal');
        noMeal.innerText = '';

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        const div = document.createElement('div');
        div.innerHTML = `
            <h2>No Meal Found..</h2>
        `;
        noMeal.appendChild(div);
    } else {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

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