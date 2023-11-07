//Cocktail List
const cocktails = [
  "Negroni",
  "Old Fashioned",
  "Margarita",
  "Espresso Martini",
  "Daiquiri",
  "Air Mail",
  "Southside",
  "Hanky Panky",
  "Rum Old Fashioned",
  "Army & Navy",
  "Mojito",
  "Long Island Iced Tea",
  "Bloody Mary",
  "Manhattan",
  "White Russian",
  "Martini",
  "Mai Tai",
  "Caipirinha",
  "Sangria",
  "Mimosa"
]


const quizList = [...cocktails]

  // 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'


  //EVENT LISTENERS

  document.querySelector('#go').addEventListener('click', goQuiz)
  // document.querySelector('#stop').addEventListener('click', stopQuiz)
  // document.querySelector('#thumb-up').addEventListener('click', thumbUp)
  // document.querySelector('#thumb-down').addEventListener('click', thumbDown)

//TIMER
const timer = document.getElementById('timer')
let time = 0

//OUT OF TIME function
function outOfTime(){
  //stop timer function
  clearInterval(intervalId)
  
  //show answer screen
  document.querySelector('#quiz').classList.add('hidden')
  document.querySelector('#answer').classList.remove('hidden')
}

let intervalId = setInterval(() => {
  // check for time up
  if (time >= 20){
    outOfTime()
    return
  }
  time++
  timer.textContent = time
}, 1000) //delay 1000ms === 1s


//QUIZ

function goQuiz(){
  const randomCocktailIndex = Math.floor(Math.random() * quizList.length)
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + quizList[randomCocktailIndex])
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      //create ingredients array
      const ingredientsArr = []
      for (let i = 1; i <= 15; i++){
        if (data.drinks[0][`strIngredient${i}`] !== null ){
          ingredientsArr.push(`${data.drinks[0][`strMeasure${i}`] === null ? '' : (data.drinks[0][`strMeasure${i}`] + " ")}` + data.drinks[0][`strIngredient${i}`])
        }
      }

      //Inject content
      document.querySelectorAll('img').forEach(e => e.src = data.drinks[0].strDrinkThumb)
      document.querySelectorAll('.drink-name').forEach(e => e.innerText = data.drinks[0].strDrink)
      document.querySelector('#ingredients').innerHTML = (() => {
        let output = []
        ingredientsArr.forEach(e => output.push(`<li>${e}</li>`))
        return output.join('')
      })()
      document.querySelector('#steps').innerText = data.drinks[0].strInstructions

      //hide greeting panel and display quiz panel elements
      document.querySelector('#greet').classList.add('hidden')
      document.querySelector('#quiz').classList.remove('hidden')
      timer.classList.remove('hidden')
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}