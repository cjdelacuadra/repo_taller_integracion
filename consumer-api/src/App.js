import './style.css';
import {getTrays, getIngredients, getCourses,  getOneCourse,  getOneTray, getOneIngredient, getConsulta, getReordenar, getReview, postReview} from './services/dataApi.js';
import React, {useState, useEffect} from 'react';

function AppHome() {
  const [tray, setTray] = useState([])

  useEffect(() => {
    getTrays(1)
      .then(data => setTray(data))
  },[])

  return (
    <div>
    <header class="content header">
      <h2 class="title">Inicio</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div class="btn-home">
        <a href="#" class="btn">Saber más</a>
        <a href="#" class="btn">Saber más</a>
      </div>
    </header>
    <h1>Menus:</h1>
    <h2>pagina  &lt;
    <a href={`#trays/1`}>
      1
    </a>
    ..
    <a href={`#trays/2`}>
      2>
    </a>
    </h2>
    <table class="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
    {tray && tray.map(item => (
      <tr key={item.id}>
        <td>
          <a href={`#onetray/${item.id}`} data-id={item.id}>
            {item.name}
          </a>
        </td>
        <td>${item.price}</td>
      </tr>
    ))}
  </tbody>

    </table>
    </div>
  );
}

function AppTrays({page}) {
  const [tray, setTray] = useState([])

  useEffect(() => {
    getTrays(page)
      .then(data => setTray(data))
  },[])
  return (
    <div>
    <h1>Menus:</h1>
    <h2>pagina  &lt;
    {page > 1 &&
    <a href={`#menu/${page - 1}`}>
      {page - 1}..
    </a>
    }
    <a href={`#menu/${page}`}>
      {page}
    </a>
    ..
    <a href={`#menu/${page + 1}`}>
      {page + 1}>
    </a>
    </h2>
    <table class="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
    {tray && tray.map(item => (
      <tr key={item.id}>
        <td>
          <a href={`#onetray/${item.id}`} data-id={item.id}>
            {item.name}
          </a>
        </td>
        <td>${item.price}</td>
      </tr>
    ))}
  </tbody>

    </table>
    </div>

  );
}

function AppOneTray({trayId}) {
  const [tray, setonetray] = useState([]);
  const [review, setReview] = useState([]);

    useEffect(() => {
      getOneTray(trayId)
        .then(data => setonetray(data))
      getReview(trayId)
        .then(data => setReview(data))
    },[trayId])

    const ratings = review ? review.map(item => item.rating) : [];
    const averageRating = ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1);

    return (
      <div>
      <h1>Este menu contiene:</h1>

      <table class="table-container">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      {tray && tray.map(item => (
        <tr key={item.id}>
          <td>
            <a href={`#onecourse/${item.id}`} data-id={item.id}>
              {item.name}
            </a>
          </td>
          <td>{item.category}</td>
          <td><img src={item.img_url} alt={item.name} style={{width: '20%', height: 'auto', opacity: 2}}/></td>
        </tr>
      ))}
    </tbody>

      </table>
      <a href={`#review/${trayId}`} className="btn-reordenar">Crear Review</a>
      <div>Promedio de puntuaciones: {averageRating}</div>

      <table class="table-container">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntuacion</th>
            <th>contenido</th>
          </tr>
        </thead>
        <tbody>

      {review && review.map(item => (
        <tr key={item.id}>
          <td>{item.username}
          </td>
          <td>{item.rating}</td>
          <td>{item.content}</td>
        </tr>
      ))}
    </tbody>

      </table>
      </div>
    );
  }

function AppCourses({page}) {
  const [course, setcourse] = useState([])

  useEffect(() => {
    getCourses(page)
      .then(data => setcourse(data))
  },[])

  return (
    <div>
      <h1>Platos:</h1>
      <h2>pagina  &lt;
      {page > 1 &&
      <a href={`#courses/${page - 1}`}>
        {page - 1}..
      </a>
      }
      <a href={`#courses/${page}`}>
        {page}
      </a>
      ..
      <a href={`#courses/${page + 1}`}>
        {page + 1}>
      </a>
      </h2>
      <table class="table-container">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      {course && course.map(item => (
        <tr key={item.id}>
          <td>
            <a href={`#onecourse/${item.id}`} data-id={item.id}>
              {item.name}
            </a>
          </td>
          <td>${item.price}</td>
          <td><img src={item.img_url} alt={item.name} style={{width: '10%', height: 'auto', opacity: 2}}/></td>
        </tr>
      ))}
    </tbody>

      </table>
    </div>
  );
}

function AppOneCourse({courseId}) {
  const [course, setonecourse] = useState([]);
  const [review, setReview] = useState([]);

    useEffect(() => {
      getOneCourse(courseId)
        .then(data => setonecourse(data))
      getReview(courseId)
        .then(data => setReview(data))
    },[courseId])
    console.log(review);
    const ratings = review ? review.map(item => item.rating) : [];
    const averageRating = ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1);

    return (
      <div>
        <h1>Este plato contiene:</h1>
        <table class="table-container">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        {course && course.map(item => (
          <tr key={item.id}>
            <td>
              <a href={`#oneingredient/${item.id}`} data-id={item.id}>
                {item.name}
              </a>
            </td>
            <td>{item.quantity}</td>
            <td><img src={item.img_url} alt={item.name} style={{width: '20%', height: 'auto'}}></img></td>

          </tr>
        ))}
      </tbody>

        </table>
        <a href={`#review/${courseId}`} className="btn-reordenar">Crear Review</a>
        <div>Promedio de puntuaciones: {averageRating}</div>

        <table class="table-container">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puntuacion</th>
              <th>contenido</th>
            </tr>
          </thead>
          <tbody>
        {review && review.map(item => (
          <tr key={item.id}>
            <td>{item.username}
            </td>
            <td>{item.rating}</td>
            <td>{item.content}</td>
          </tr>
        ))}
      </tbody>

        </table>
      </div>
    );
  }

function AppIngredients({page}) {
  const [ingredient, setIngredient] = useState([])

  useEffect(() => {
    getIngredients(page)
      .then(data => setIngredient(data))
  },[])

  return (
    <div>
      <h1>Ingredientes:</h1>
      <h2>pagina  &lt;
      {page > 1 &&
      <a href={`#ingredients/${page - 1}`}>
        {page - 1}..
      </a>
      }
      <a href={`#ingredients/${page}`}>
        {page}
      </a>
      ..
      <a href={`#ingredients/${page + 1}`}>
        {page + 1}>
      </a>
      </h2>
      <table class="table-container">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      {ingredient && ingredient.map(item => (
        <tr key={item.id}>
          <td>
            <a href={`#oneingredient/${item.id}`} data-id={item.id}>
              {item.name}
            </a>
          </td>
          <td>${item.price}</td>
          <td><img src={item.img_url} alt={item.name} style={{width: '20%', height: 'auto'}}></img></td>

        </tr>
      ))}
    </tbody>

      </table>
    </div>
  );
}

function AppOneIngredient({ingredientId}) {
  const [ingredient, setOneIngredient] = useState([])
  const [review, setReview] = useState([]);

  useEffect(() => {
    getOneIngredient(ingredientId)
      .then(data => setOneIngredient(data))
      getReview(ingredientId)
        .then(data => setReview(data))
  },[])
  const ratings = review ? review.map(item => item.rating) : [];
  const averageRating = ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1);

  return (
    <div>
    <table class="table-container">
      <thead>
        <tr>
          <th>{ingredient.name}</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>{ingredient.description}</td>
      </tr>
      <tr>
        <td><img src={ingredient.img_url} alt={ingredient.name} style={{width: 'auto', height: '300px'}}/></td>
      </tr>
  </tbody>

    </table>
    <a href={`#review/${ingredientId}`} className="btn-reordenar">Crear Review</a>
    <div>Promedio de puntuaciones: {averageRating}</div>
    <table class="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puntuacion</th>
          <th>contenido</th>
        </tr>
      </thead>
      <tbody>
    {review && review.map(item => (
      <tr key={item.id}>
        <td>{item.username}
        </td>
        <td>{item.rating}</td>
        <td>{item.content}</td>
      </tr>
    ))}
  </tbody>

    </table>
    </div>
  );
}

function SearchBar(props) {
  const [query, setQuery] = React.useState("");

  async function handleInputChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <div class='select'>
      <label htmlFor="selector1">Ordenar: </label>
        <select id="selector1">
          <option value="trays">Menus</option>
          <option value="courses">Platos</option>
          <option value="ingredients">Ingredientes</option>
        </select>
      <label htmlFor="selector2"> por: </label>
        <select id="selector2">
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
        </select>

      <label htmlFor="selector3"> en orden: </label>
        <select id="selector3">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendiente</option>
        </select>
        <a href="#reordenar/1" className="btn-reordenar">Reordenar</a>
      <input id="texto" type="text" value={query} onChange={handleInputChange} />
      <a href="#Buscar" className="btn-reordenar">Buscar</a>
      </div>
    </div>
  );
}

function AppReordenar({page, sel1, sel2, sel3}) {
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    getReordenar(page, sel1, sel2, sel3)
      .then(data => setSortedData(data))
  },[])
  function getItemLink(item) {
    if (item.img_url && item.img_url.includes("ingredient")) {
      return <a href={`#oneingredient/${item.id}`} data-id={item.id}>{item.name}</a>;
    } else if (item.img_url && item.img_url.includes("course")) {
      return <a href={`#onecourse/${item.id}`} data-id={item.id}>{item.name}</a>;
    } else {
      return <a href={`#onetray/${item.id}`} data-id={item.id}>{item.name}</a>;
    }
  }
  return (
    <div>
    <h2>pagina  &lt;
    {page > 1 &&
    <a href={`#reordenar/${page - 1}`}>
      {page - 1}..
    </a>
    }
    <a href={`#reordenar/${page}`}>
      {page}
    </a>
    ..
    <a href={`#reordenar/${page + 1}`}>
      {page + 1}>
    </a>
    </h2>
    <table class="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    {sortedData && sortedData.map(item => (
      <tr key={item.id}>
        <td>
        {getItemLink(item)}
        </td>
        <td>${item.price}</td>
        <td>
        {item.img_url && (
        <img src={item.img_url} alt={item.name} style={{width: '20%', height: 'auto'}} />
        )}
        </td>

      </tr>
    ))}
  </tbody>

    </table>
    </div>
  );
}

function AppBuscar({texto}) {
  const [consulta, setConsulta] = useState([])

  useEffect(() => {
    getConsulta(texto)
      .then(data => setConsulta(data))
  },[])
  function getItemLink(item) {
    if (item.img_url && item.img_url.includes("ingredient")) {
      return <a href={`#oneingredient/${item.id}`} data-id={item.id}>{item.name}</a>;
    } else if (item.img_url && item.img_url.includes("course")) {
      return <a href={`#onecourse/${item.id}`} data-id={item.id}>{item.name}</a>;
    } else {
      return <a href={`#onetray/${item.id}`} data-id={item.id}>{item.name}</a>;
    }
  }
  return (
    <div>
    <table class="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    {consulta && consulta.map(item => (
      <tr key={item.id}>
        <td>
        {getItemLink(item)}
        </td>
        <td>${item.price}</td>
        <td>
        {item.img_url && (
        <img src={item.img_url} alt={item.name} style={{width: '20%', height: 'auto'}} />
        )}
        </td>

      </tr>
    ))}
  </tbody>

    </table>
    </div>
  );
}

function OpenPopup({id}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState('');

return (
  <form>
  <div class="form-group">
    <label class="form-label" htmlFor="username">Usuario:</label>
    <input class="form-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
  </div>

  <div class="form-group">
    <label class="form-label" htmlFor="password">Contraseña:</label>
    <input class="form-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

  <div class="form-group">
    <label class="form-label" htmlFor="rating">Puntaje:</label>
    <select class="form-select" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

  <div class="form-group">
    <label class="form-label" htmlFor="content">Contenido:</label>
    <textarea class="form-input" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
  </div>
    <a class="form-submit" href={`#Enviar/${id}`} className="btn-reordenar">Enviar reseña</a>
  </form>
);
};

function SendReview ({id, user, pass, content, rate}) {
  const data = {
    "entity_id": `${id}`,
    "email": `${user}`,
    "password": `${pass}`,
    "rating": `${rate}`,
    "content": `${content}`
  }
  console.log(JSON.stringify(data));
  postReview(data)
  .then(response => console.log(response))
  .catch(error => console.error(error));
}

export {AppHome};
export {AppIngredients, AppCourses, AppTrays};
export {AppOneIngredient, AppOneTray, AppOneCourse};
export {SearchBar, AppBuscar, AppReordenar};
export {OpenPopup, SendReview};
