// the superhero entry
class SuperheroEntry {
  constructor(superheroName, superheroUniverse, superheroPower) {
    this.superheroName = superheroName;
    this.superheroUniverse = superheroUniverse;
    this.superheroPower = superheroPower;
  }
}

//the superhero list class
class SuperheroList {
  //add superhero
  addSuperhero(entry) {
    const listData = document.querySelector(".superhero-list-data");
    const listContainer = document.createElement("ul");
    listContainer.setAttribute("id", "list");

    listContainer.innerHTML += `
    <li>${entry.superheroName}</li>
    <li>${entry.superheroUniverse}</li>
    <li>${entry.superheroPower}</li>
    <i class="fas fa-trash"></i>
    `;

    listData.appendChild(listContainer);
  }
  //clear superhero input fields function
  clearSuperheroInputs() {
    [
      document.querySelector("#name").value,
      document.querySelector("#universe").value,
      document.querySelector("#power").value,
    ] = ["", "", ""];
  }

  //validation error function
  validationError() {
    document.querySelector(".validate-error").classList.add("show-validation");
    setTimeout(() => {
      document
        .querySelector(".validate-error")
        .classList.remove("show-validation");
    }, 2500);
  }

  //validation success function
  validationSuccess() {
    document
      .querySelector(".validate-success")
      .classList.add("show-validation");
    setTimeout(() => {
      document
        .querySelector(".validate-success")
        .classList.remove("show-validation");
    }, 1500);
  }
}

//storesuperhero class
class StoreSuperhero {
  //get superheroes from LS
  static getSuperhero() {
    let superheroes;
    if (localStorage.getItem("superheroes") === null) {
      superheroes = [];
    } else {
      superheroes = JSON.parse(localStorage.getItem("superheroes"));
    }
    return superheroes;
  }
  //add superheroes from LS
  static addSuperhero(entry) {
    const superheroesList = StoreSuperhero.getSuperhero();
    superheroesList.push(entry);
    localStorage.setItem("superheroes", JSON.stringify(superheroesList));
  }

  //display superheroes from LS
  static displaySuperhero() {
    const superheroesList = StoreSuperhero.getSuperhero();
    superheroesList.forEach((superhero) => {
      //instantiating the superherolist class
      const list = new SuperheroList();
      list.addSuperhero(superhero);
    });
  }
  //removing superheroes from the LS
  static removeSuperhero(clickedSuperhero) {
    const superheroesList = StoreSuperhero.getSuperhero();
    superheroesList.forEach((superhero, index) => {
      if (superhero.superheroName === clickedSuperhero) {
        superheroesList.splice(index, 1);
      }
    });
    localStorage.setItem("superheroes", JSON.stringify(superheroesList));
  }
}
//...........................events................
document.addEventListener("DOMContentLoaded", StoreSuperhero.displaySuperhero);

//form submission event listener
const form = document.querySelector(".superhero-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let [superheroName, superheroUniverse, superheroPower] = [
    document.querySelector("#name").value,
    document.querySelector("#universe").value,
    document.querySelector("#power").value,
  ];

  //intantiating the superheroEntry class
  const entry = new SuperheroEntry(
    superheroName,
    superheroUniverse,
    superheroPower
  );

  //intantiating the superheroList class
  const list = new SuperheroList();

  list.addSuperhero(entry);
  list.clearSuperheroInputs();

  //validate the form if one or more of the input fields are empty
  if (
    superheroName === "" ||
    superheroUniverse === "" ||
    superheroPower === ""
  ) {
    list.validationError();
    //console.log("Error");
  } else {
    list.addSuperhero(entry);
    list.clearSuperheroInputs();
    list.validationSuccess();

    //adding superhero to local storage
    StoreSuperhero.addSuperhero(entry);
  }
  console.log(list);
});

//deleting listed superheroes
const listData = document.querySelector(".superhero-list-data");
listData.addEventListener("click", function (e) {
  if (e.target.className === "fas fa-trash") {
    const trash = e.target.parentNode;
    const clickedSuperhero =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;

    StoreSuperhero.removeSuperhero(clickedSuperhero);
    trash.remove();
  }
});
