import data from "./tests.json" assert { type: "json" };
// let iterator = -1;

let users = [];
// {
//   username: '',
//   easy : {
//     questionsNumbers : 10,
//     rightAnswers : 7
//   }
// }

let currentUser = "";
let currentDificulity = "";
let currentId = 0;
// ! inputs validation
function validation() {
  let username = document.getElementById("name").value;
  if (
    username.length <= 35 &&
    username.length != 0 &&
    isNaN(Number(username))
  ) {
    return true;
  } else {
    return false;
  }
}

// ! form Sign up
function signUpValidation() {
  let username = document.getElementById("name").value;
  let dificulity = document.getElementById("inputOfDificulity").value;
  if (users.length === 0) {
    users.push({
      username,
    });
    currentUser = username;
    currentDificulity = dificulity;
    startingTest();
  } else if (users.every((item) => item.username !== username)) {
    users.push({
      username,
    });
    currentUser = username;
    currentDificulity = dificulity;
    startingTest();
  } else {
    alert("This name is taken");
  }
}
document.getElementById("signUp").onclick = fromSignUp;
function fromSignUp() {
  if (validation()) {
    signUpValidation();
  } else {
    alert("write symbols more than 0 and less than 35");
  }
}
// ! form Sign in
function signInValidation() {
  let username = document.getElementById("name").value;
  if (users.length > 0) {
    let array = users.filter((item) => item.username === username);
    if (array.length === 1) {
      currentUser = array[0].username;
      currentDificulity = document.getElementById("inputOfDificulity").value;
      startingTest();
    } else {
      alert("Not found");
    }
  } else {
    alert("Not found");
  }
}
document.getElementById("signIn").onclick = fromSignIn;
function fromSignIn() {
  if (validation()) {
    signInValidation();
  } else {
    alert("write symbols more than 0 and less than 35");
  }
}

function startingTest() {
  let sectionOfTests = document.getElementById("wrapper");
  let form = document.getElementById("form");
  form.style.display = "none";
  sectionOfTests.style.display = "flex";
  console.log(`username : ${currentUser}; dificulty : ${currentDificulity}`);
  showingQuestions();
}
// ! info dropdown
let parent__list = document.getElementsByClassName("list__item").item(0);
let active = false;
parent__list.onclick = () => {
  let level = [
    {
      dificulty: "easy",
      points: 10,
    },
    {
      dificulty: "hard",
      points: 10,
    },
  ];
  let status = document.querySelector("svg").classList;
  let listItem = document.querySelector(".item__user").classList;
  active = active ? false : true;
  status.toggle("list__arrow-click");

  listItem.toggle("item__user-active");
  if (active) {
    let container = document.createElement("div");
    container.className = "item__results";
    container.id = `container-id`;
    level.forEach((item, index) => {
      let points = document.createElement("p");
      let paragraghs = document.createElement("p");
      points.innerText = item.points;
      paragraghs.innerText = item.dificulty;

      container.append(paragraghs);
      container.append(points);
    });
    parent__list.append(container);
  } else {
    document.getElementById("container-id").remove();
  }
};
// ! end info dropdown

// ! showes tests
function showingQuestions() {
  console.log(currentId + "currentid");
  let item = gettingCurrentTest()[currentId];
  let test__content = document.getElementsByClassName("test__content").item(0);
  let test__section = document.createElement("div");
  let test__question = document.createElement("h1");

  test__section.className = "test__section";
  test__question.className = "test__question";
  test__question.innerText = item.question;

  test__section.append(test__question);

  let test__buttons = document.createElement("div");
  let buttonsId = `container-of-buttons-${currentId}`,
    sectionId = `section-of-questions-and-buttons-${currentId}`;
  test__section.id = sectionId;
  test__buttons.id = buttonsId;
  test__buttons.className = "test__buttons";

  item.answers.forEach((item1) => {
    let test__button = document.createElement("button");
    test__button.className = "test__button";
    test__button.innerText = item1.answer;
    test__button.onclick = () => {
      answerValidation(buttonsId, currentId);
    };
    test__buttons.append(test__button);
    console.log(item1);
  });

  test__section.append(test__buttons);
  test__content.append(test__section);
}

// ! showes wich is right by clicking one button and others will be show yourself's background color
function answerValidation(id) {
  let children = document.getElementById(id).getElementsByTagName("button");
  let answers = eval(
    `data.tests.${currentDificulity}.questions[${currentId}].answers`
  );
  for (let i = 0; i < children.length; i++) {
    children.item(i).disabled = true;
    if (answers[i].isRight) {
      children.item(i).className = "green-answer";
    } else {
      children.item(i).className = "red-answer";
    }
  }
  // ! validating isLast question of test
  if (gettingCurrentTest().length - 1 === currentId) {
    console.log(users);
  } else {
    // ! increment current id
    currentId++;
    showingQuestions();
    console.log(currentId);
  }
}

// ! getting static difficulties array from json
function gettingCurrentTest() {
  if (currentDificulity === "easy") {
    return data.tests.easy.questions;
  } else if (currentDificulity === "medium") {
    return data.tests.medium.questions;
  } else if (currentDificulity === "hard") {
    return data.tests.hard.questions;
  }
}

// ! end shower tests and here ends function which is has name : answerValidation()
