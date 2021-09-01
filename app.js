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
  addSuperhero(entry);
}

//...........................events................
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
  console.log(list);
});
