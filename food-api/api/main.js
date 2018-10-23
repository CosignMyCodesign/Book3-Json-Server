console.log("howdy")
fetch("http://localhost:8088/food")
  .then( (foodData) => foodData.json())
  .then( (realData) => {
    console.table(realData)
    let foodlist= document.querySelector("#foodlist")
    realData.forEach( (food) => {
      foodlist.innerHTML += `<p>${food.name}</p>`
    } )
  })

  

// let name =  "fred"
// for (blahblah)                            <---------all this code runs normally