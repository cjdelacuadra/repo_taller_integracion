import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './style.css';
import {AppHome, AppTrays, AppCourses, AppIngredients, AppOneTray, AppOneCourse, AppOneIngredient, SearchBar, AppReordenar, AppBuscar, OpenPopup, SendReview} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const review = ReactDOM.createRoot(document.getElementById('review'));
const search = ReactDOM.createRoot(document.getElementById('search'));
const contentDiv = document.querySelector("#root");

function showHome() {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppHome />
    </React.StrictMode>
  );
  //contentDiv.innerHTML = root.render(
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
  review.render();

}

function showTray(page) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppTrays page = {page}/>
    </React.StrictMode>
  );
  //contentDiv.innerHTML = root.render(
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
    review.render();
}

function showOneTray(trayid) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppOneTray trayId={trayid}/>
    </React.StrictMode>
  );
  search.render();
  review.render();

}

function showCourse(page) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppCourses page = {page} />
    </React.StrictMode>
  );
  //contentDiv.innerHTML = root.render(
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
    review.render();

}

function showOneCourse(courseid) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppOneCourse courseid={courseid}/>
    </React.StrictMode>
  );
  search.render();
  review.render();

}

function showIngredient(page) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppIngredients page = {page}/>
    </React.StrictMode>
  );
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
    review.render();

}

function showOneIngredient(ingredientId) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppOneIngredient ingredientId={ingredientId} />
    </React.StrictMode>
  );
  search.render();
  review.render();

}

function showReordenar(page, sel1, sel2, sel3) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppReordenar page = {page} sel1={sel1} sel2={sel2} sel3={sel3} />
    </React.StrictMode>
  );
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
    review.render();

}

function showBuscar(texto) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  root.render(
    <React.StrictMode>
      <AppBuscar texto={texto} />
    </React.StrictMode>
  );
  search.render(
    <React.StrictMode>
      <SearchBar />
    </React.StrictMode>,
    document.getElementById('search'));
    review.render();

}

function showReview(id) {
  //contentDiv.innerHTML = root.render(
  ReactDOM.unmountComponentAtNode(contentDiv);
  review.render(
    <React.StrictMode>
      <OpenPopup id={id} />
    </React.StrictMode>
  );
}

function showEnviar(id, user, pass, content, rate) {
  ReactDOM.unmountComponentAtNode(contentDiv);
  review.render(
    <React.StrictMode>
    <SendReview id={id} user={user} pass={pass} content={content} rate={rate}/>
    </React.StrictMode>
  );
  review.render(
    <React.StrictMode>
      <OpenPopup id={id} />
    </React.StrictMode>
  );
}

async function showPage() {
  const hash = window.location.hash;
  //
  if (hash.startsWith("#menu/")) {
    const page = parseInt(hash.split("/")[1]);
    await showTray(page);
  } else if (hash.startsWith("#courses/")) {
    const page = parseInt(hash.split("/")[1]);
    await showCourse(page);
  } else if (hash.startsWith("#ingredients/")) {
    const page = parseInt(hash.split("/")[1]);
    await showIngredient(page);

  } else if (hash.startsWith("#onetray/")) {
    const trayId = hash.split("/")[1];
    await showOneTray(trayId);
  } else if (hash.startsWith("#onecourse/")) {
    const courseId = hash.split("/")[1];
    await showOneCourse(courseId);
  } else if (hash.startsWith("#oneingredient/")) {
    const ingredientId = hash.split("/")[1];
    await showOneIngredient(ingredientId);

  } else if (hash.startsWith("#reordenar/")) {
    const page = parseInt(hash.split("/")[1]);
    const selector1 = document.getElementById("selector1").value;
    const selector2 = document.getElementById("selector2").value;
    const selector3 = document.getElementById("selector3").value;
    await showReordenar(page, selector1, selector2, selector3);
  } else if (hash === "#Buscar") {
    const texto = document.getElementById("texto").value;
    await showBuscar(texto);
  } else if (hash.startsWith("#review/")) {
    const id = hash.split("/")[1];
    await showReview(id);
  } else if (hash.startsWith("#Enviar/")) {
    const id = hash.split("/")[1];
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const rate = document.getElementById("rating").value;
    const content = document.getElementById("content").value;
    await showEnviar(id, user, pass, content, rate);
  } else {
    showHome();
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// call showPage function when the page loads
window.addEventListener("load", showPage);

// add a listener for the hashchange event
window.addEventListener("hashchange", showPage);
showPage();
