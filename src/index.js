let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => data.forEach(createCard))

  function createCard(object){
    const toyCard = document.createElement("div")
    const toyImg = document.createElement("img")
    const toyName = document.createElement("h2")
    const toyLikes = document.createElement("p")
    const toyButton = document.createElement("button")
    const toyZone = document.getElementById("toy-collection")
    toyCard.className = "card"
    toyImg.className = "toy-avatar"
    toyImg.src = object.image
    toyName.textContent = object.name
    toyLikes.textContent = object.likes + " likes"
    toyButton.textContent = "Like ❤️"
    toyButton.className = "like-btn"
    toyCard.id = object.id
    toyCard.append(toyName , toyImg , toyLikes , toyButton)
    toyZone.appendChild(toyCard)
    toyButton.addEventListener("click" , event =>
      fetch(`http://localhost:3000/toys/${object.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": ++object.likes
        })
      })
      .then(toyLikes.textContent = object.likes + " likes")
    )
  }

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

  const myForm = document.querySelector(".add-toy-form")
  myForm.addEventListener("submit" , event => {
    event.preventDefault()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": event.target.children[1].value,
        "image": event.target.children[3].value,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then(data => createCard(data))
    .then(myForm.reset())
  })


function handleLikes (){
  const likeBtn = document.getElementsByClassName("like-btn")
}
})
