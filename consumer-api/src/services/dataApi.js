export const getTrays = (page) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/trays?sort=name&order=asc&page=' + page +'&size=20')
    .then((response) => response.json())
    .then((data) => data.items)
    .catch((error) => console.log(error))
)

export const getOneTray = (trayId) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/trays/' + trayId)
    .then((res) => res.json())
    .then((data) => data.courses)
    .catch((error) => console.log(error))
)


export const getCourses = (page) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/courses?sort=name&order=asc&page=' + page +'&size=20')
    .then((res) => res.json())
    .then((data) => data.items)
    .catch((error) => console.log(error))
)

export const getOneCourse = (id) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/courses/' + id)
    .then((res) => res.json())
    .then((data) => data.ingredients)
    .catch((error) => console.log(error))
)

export const getIngredients = (page) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients?sort=name&order=asc&page=' + page +'&size=20')
    .then((res) => res.json())
    .then((data) => data.items)
    .catch((error) => console.log(error))
)

export const getOneIngredient = (id) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients/' + id)
    .then((res) => res.json())
    .catch((error) => console.log(error))
)

const getConsulta = async (query) => {
  const url1 = 'https://tarea-1.2023-1.tallerdeintegracion.cl/search/trays?name=' + query
  const url2 = 'https://tarea-1.2023-1.tallerdeintegracion.cl/search/courses?name=' + query
  const url3 = 'https://tarea-1.2023-1.tallerdeintegracion.cl/search/ingredients?name=' + query

  const [data1 = [], data2 = [], data3 = []] = await Promise.all([
    fetch(url1).then(res => res.json())
    .catch((error) => []),
    fetch(url2).then(res => res.json())
    .catch((error) => []),
    fetch(url3).then(res => res.json())
    .catch((error) => []),
  ]);

  const allData = [...data1, ...data2, ...data3];
  console.log(allData);
  return allData;
}
export {getConsulta}

export const getReordenar = (page, sel1, sel2, sel3) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/' + sel1 + '?sort=' + sel2 + '&order=' + sel3 + '&page=' + page +'&size=20')
    .then((res) => res.json())
    .then((data) => data.items)
    .catch((error) => console.log(error))
)

export const getReview = (id) => (
  fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/' + id)
    .then((res) => res.json())
    .catch((error) => console.log(error))
)

export async function postReview(data) {
  const url = 'https://tarea-1.2023-1.tallerdeintegracion.cl/reviews'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
