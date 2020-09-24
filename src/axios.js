// import axios from "axios"
// //allow to interact with apis
// const instance=axios.create({
//     baseURL:'http://localhost:5001/fir-5871d/us-central1/api'//the api url (cloud functio)

// });
// export default instance

import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: 'http://localhost:5001/fir-5871d/us-central1/api'
    // "http://localhost:5001/challenge-4b2b2/us-central1/api",
});

export default instance;


