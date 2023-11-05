//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)
let drinkCounter = 0
function getDrink(){
  const input = document.querySelector('input').value
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +input)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h2').innerText = data.drinks[drinkCounter].strDrink
      document.querySelector('h3').innerText = data.drinks[drinkCounter].strInstructions
      document.querySelector('img').src = data.drinks[drinkCounter].strDrinkThumb
      drinkCounter++
      if (drinkCounter === data.drinks.length)
        drinkCounter = 0
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

      // 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'