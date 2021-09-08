document.getElementById('error-msg').style.display = 'none';

const searchFood = () => {
    const searchFoodField = document.getElementById('search-field');
    const searchFieldText = searchFoodField.value;

    // reset search input value
    searchFoodField.value = '';

    // error msg
    document.getElementById('error-msg').style.display = 'none';
    if (searchFieldText == '') {
        // please write something
    }
    else {
        // load meal data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
    }

}

const displayError = error => {
    document.getElementById('error-msg').style.display = 'block';
}


const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    if (meals.length == 0) {
        // show not result found;
    }

    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="h-100 m-3 bg-secondary">
                <img src="${meal.strMealThumb}" class="card-img-top img-fluid">
                <div class="card-footer text-center mt-2">
                <h4 class="card-title text-warning title">${meal.strMeal}</h4>
                <button class='btn btn-info btn-sm mt-2 '>See details</button>
                </div> 
            </div>
        `;
        searchResult.appendChild(div);
    });
}

const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.style.maxWidth = '540px';
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top h-25">
            <div class="card-footer h-25 bg-secondary">
                <h5 class="card-title text-warning title">${meal.strMeal}</h5>
                <h5 class="card-title text-warning title">Origin: ${meal.strArea}</h5>
                <h5 class="card-title text-warning title">Category: ${meal.strCategory}</h5>
                <p class="card-text text-warning text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
            </div>
    `;
    mealDetails.appendChild(div);
}