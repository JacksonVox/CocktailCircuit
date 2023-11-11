//Cocktail List
const cocktails = [
  "Negroni",
  "Old Fashioned",
  "Margarita",
  "Espresso Martini",
  "Daiquiri",
  "French 75",
  "Pisco Sour",
  "Cosmopolitan",
  "Dark and Stormy",
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


//EVENT LISTENERS
document.querySelector('#go').addEventListener('click', goQuiz)
document.querySelector('#stop').addEventListener('click', stopQuiz)
document.querySelector('#thumbs-up').addEventListener('click', thumbsUp)
document.querySelector('#thumbs-down').addEventListener('click', thumbsDown)

//SCORE and THUMB BUTTONS
let scoreUp = document.querySelector('#scorePositive')
let scoreDown = document.querySelector('#scoreNegative')

function thumbsUp(){
  scoreUp.innerText = parseInt(scoreUp.innerText) + 1
  //splice with extra delete protection
  let index = quizList.indexOf(randomCocktail);
  if (index !== -1) {
    quizList.splice(index, 1);
  }
  // Disable the buttons
  document.querySelector('#thumbs-up').disabled = true
  document.querySelector('#thumbs-down').disabled = true
  // Win Condition
  if (quizList.length <= 0){
    win()
  }
}

function thumbsDown(){
  scoreDown.innerText = parseInt(scoreDown.innerText) + 1
  // Disable the buttons
  document.querySelector('#thumbs-up').disabled = true
  document.querySelector('#thumbs-down').disabled = true
}

//WIN
function win(){
  //change main view
  document.querySelector('#answer').classList.add('hidden')
  document.querySelector('#win').classList.remove('hidden')
  //change buttons
  document.querySelectorAll('button').forEach(e => e.classList.add('hidden'))
  // document.querySelector('#thumbs-up').classList.add('hidden')
  // document.querySelector('#thumbs-down').classList.add('hidden')
  document.querySelector('#reload').classList.remove('hidden')
  // document.querySelector('#stop').classList.add('hidden')

}

//RELOAD AFTER WIN BUTTON
document.querySelector('#reload').addEventListener('click', function() {
  location.reload()
})

//TIMER
const timer = document.getElementById('timer')
let intervalId

function startTimer() {

  //change buttons
  timer.classList.remove('hidden')
  document.querySelector('#go').classList.add('hidden')
  document.querySelector('#stop').classList.remove('hidden')

  let time = 20
  intervalId = setInterval(() => {
    // check for time up
    if (time <= 0){
      outOfTime()
      return
    }
    time--
    timer.textContent = time
  }, 1000) //delay 1000ms === 1s
}

//STOP TIME function
function stopQuiz(){
  //stop timer function
  clearInterval(intervalId)
  
  //show answer screen
  document.querySelector('#quiz').classList.add('hidden')
  document.querySelector('#answer').classList.remove('hidden')
  //change buttons
  document.querySelector('#thumbs-up').classList.remove('hidden')
  document.querySelector('#thumbs-down').classList.remove('hidden')
  document.querySelector('#go').classList.remove('hidden')
  document.querySelector('#stop').classList.add('hidden')
  //enable thumbs buttons
  document.querySelector('#thumbs-up').disabled = false;
  document.querySelector('#thumbs-down').disabled = false;
}

//OUT OF TIME function
function outOfTime(){
  //stop timer function
  clearInterval(intervalId)
  
  //show answer screen
  document.querySelector('#quiz').classList.add('hidden')
  document.querySelector('#answer').classList.remove('hidden')
}




//QUIZ

let randomCocktailIndex
let randomCocktail

function goQuiz(){
  randomCocktailIndex = Math.floor(Math.random() * quizList.length)
  randomCocktail = quizList[randomCocktailIndex]
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + randomCocktail)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

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
      document.querySelector('#answer').classList.add('hidden')
      document.querySelector('#quiz').classList.remove('hidden')
      document.querySelector('#thumbs-up').classList.add('hidden')
      document.querySelector('#thumbs-down').classList.add('hidden')
      timer.classList.remove('hidden')

      timer.textContent = 0
      startTimer()
      
    })
    .catch(err => {
        console.log(`error ${err} ${randomCocktail} is not found`)
        goQuiz()
    });
}