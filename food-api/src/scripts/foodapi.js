
// Function for creating the element
const makeFoodListComponent = (name, ethnicity, type) => {
  let foodSection = document.createElement("section")
  foodSection.classList.add("foodItem")
  foodSection.innerHTML = `
    <div class="foodDiv">
    <h2>${name}</h2>
    <h6>${ethnicity}</h6>
    <h6>${type}</h6>
    </div>
  `
  return foodSection
}

// function to insert HTML representation into the DOM
const renderFoodList = (food) => {
  let foodMan = document.querySelector(".foodlist")
  foodMan.appendChild(food)
}


// A function to bring it all together
const makeTheFoodPlease = () => {
  fetch("http://localhost:8088/food/")
  .then(foods => foods.json())
    .then(parsedFoods => {
      parsedFoods.forEach(myFood => {
        const foodComponent = makeFoodListComponent(myFood.name, myFood.ethnicity, myFood.type)
        renderFoodList(foodComponent)
      })
    })
}

const getLocalDataBtn = document.getElementById("btn-getLocalData");
getLocalDataBtn.addEventListener("click", makeTheFoodPlease)


// Fetching the additional info needed from the external API
const additionalFood = () => {
    fetch("http://localhost:8088/food/")
  //makes the data into json
  .then((foodData) => foodData.json())
  // this is going to loop over my array to get barcode and look up food in the other database
  .then((realData) => {
    let foodList = document.querySelector("#foodList")
    realData.forEach((food) => {
      fetch(`https://world.openfoodfacts.org/api/v0/product/
            ${food.barcode}.json`)
        .then((foodData) => foodData.json())
        .then((realData) => {
          // below is the HTML template
          foodList.innerHTML += `
                    <div class="foodDiv">
                    <h1>${food.name}</h1>
                    <h2>
                    ${food.ethnicity} ${food.type}</h2>
                    <p>
                    Ingredients: ${realData.product.ingredients_text}<br/><br/>
                    Country of Origin: ${realData.product.countries}<br/><br/>
                    Barcode: ${food.barcode}</p>
                    Calories per serving: ${realData.product.nutriments.energy} kcal<br/><br/>
                    Fat per serving: ${realData.product.nutriments.fat} g<br/><br/>
                    Sugar per serving: ${realData.product.nutriments.sugars} g<br/><br/>
                    </div>
                    `
        })
    })
  })
}

const getApiDataBtn = document.getElementById("btn-getApiData");
getApiDataBtn.addEventListener("click", additionalFood)
