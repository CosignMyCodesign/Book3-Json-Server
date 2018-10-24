
// Function for string template
const makeFoodListComponent = (name, ethnicity, type) => {
  let foodSection = document.createElement("section")
  foodSection.classList.add("foodItem")
  foodSection.innerHTML = `
    <h2>${name}</h2>
    <h5>${ethnicity}</h5>
    <h5>${type}</h5>
  `
  return foodSection
}

// function to insert HTML representation into the DOM
const renderFoodList = (food) => {
  let foodMan = document.querySelector(".foodList")
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

makeTheFoodPlease()

