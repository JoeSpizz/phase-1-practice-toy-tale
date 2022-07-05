let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// defining elements
let h2 = document.createElement('h2');
let img = document.createElement('img');
let p = document.createElement('p');
let button = document.createElement('button');
//fetching toys from api
fetch("http://localhost:3000/toys")
  .then (res => res.json())
  .then ((toyArray) => {
      toyArray.forEach(element => {
        buildToys(element)
      })})


// building the toy card and adding to DOM
function buildToys (toy) {
  let card = document.querySelector("#toy-collection")
  let divCard = document.createElement ('div')
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button')
    h2.innerText = toy.name
   img.src = toy.image
   img.className = "toy-avatar"
   p.innerText = `${toy.likes} likes`
   button.innerText = "Like ❤️"
   button.id = `${toy.id}`
   divCard.className = "card"
  card.appendChild(divCard)
divCard.appendChild(h2)
divCard.appendChild(img)
divCard.appendChild(p)
divCard.appendChild(button)
//building button like event inside buildToy
button.addEventListener('click', (event)=>{
 newLikeAdded(event)
})
}

// adding new toy to db.json
function newToy (inputname, inputimage) {
  fetch("http://localhost:3000/toys",
  {
  method: 'POST',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify({
    "name" : inputname,
    "image": inputimage,
    "likes": 0
  })
 
})
.then(res=>res.json())
.then(add => {
  buildToys(add)
})

}

//defining terms for new toys
let newName =""
let newImage =""
let newToyForm = document.querySelector("form")
let toySubmission = ""
//new toy submit event
newToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
let newName = e.target.name.value
let newImage = e.target.image.value
newToy(newName, newImage)
});

// new like container
function newLikeAdded (event) {
  event.preventDefault();
  let newNumberOfLikes = 
  fetch(`http://localhost:3000/toys/${event.id}`,
  {
  method: 'PATCH',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify({
    "likes": toy.likes + 1
  })

})
.then(res=>res.json())
.then(update => p.innerText = `${update.likes} likes`)
}