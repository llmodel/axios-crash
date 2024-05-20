// AXIOS GLOBALS
// by setting this up, all request will include this in the header
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


// GET REQUEST

// function getTodos() {
//   axios({
//     method: 'get',
//     url: 'https://jsonplaceholder.typicode.com/todos',
//     params: { _limit: 5 }
//   }).then(res => {
//     showOutput(res);
//   }).catch(err => {
//     console.error(err)
//   });
// }

// function getTodos() {
//   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//     .then(res => showOutput(res))
//     .catch(err => console.error(err));
// }

// GET REQUEST
const getTodos = async () => {
  try {
    // note the timeout setting below
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5000});
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// POST REQUEST
// function addTodo() {
//   axios({
//     method: 'post',
//     url: 'https://jsonplaceholder.typicode.com/todos',
//     data: { title: 'Hello World', completed: false }
//   }).then(res => {
//     showOutput(res);
//   }).catch(err => {
//     console.error(err)
//   });
// }

// POST REQUEST
const addTodo = async () => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', 
    {title: 'New todo', completed: true});
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// PUT REQUEST
const updateTodo = async () => {
  try {
    const res = await axios.put('https://jsonplaceholder.typicode.com/todos/1', 
    {title: 'Updated todo', completed: true});
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// PATCH REQUEST
const patchTodo = async () => {
  try {
    const res = await axios.patch('https://jsonplaceholder.typicode.com/todos/1', 
    {title: 'Patched Title Only'});
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// DELETE REQUEST
const removeTodo = async () => {
  try {
    const res = await axios.delete('https://jsonplaceholder.typicode.com/todos/1');
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// SIMULTANEOUS DATA

// function getData() {
//   axios.all([
//     axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=5'),
//     axios.get('https://jsonplaceholder.typicode.com/posts/?_limit=5')
//   ])
//   // .then(axios.spread((todos, posts) => showOutput(posts)))
//   .then( res => {
//     console.log(res[0]);
//     console.log(res[1]);
//     showOutput(res[1]);
//   })
//   .catch(err => console.error(err));
// }

const getData = async () => {
  try {
    const [todos, posts] = await axios.all([
      axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts/?_limit=5')
    ]);

    console.log(todos);
    console.log(posts);
    showOutput(posts);
  } catch (err) {
    console.error(err);
  }
};

// CUSTOM HEADERS
const customHeaders = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  try {
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false
      },
      config
    );
    showOutput(res);
  } catch (err) {
    console.error(err);
  }
};

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
const errorHandling = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=5',
    {  
      // Example of letting any error status below 500 to pass, so 404 will not be caught
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    });
    showOutput(res);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
    if (err.response.status === 404) {
      alert('Error: Page Not Found');
    } else if (err.request) {
      // Request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  }
};

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// AXIOS INSTANCES
// this example show how to create an instance of axios with some custom settings
// in this case we're setting the baseURL
// and then use that instance to make requests (commented out so it won't run immediately)
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('patch').addEventListener('click', patchTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
