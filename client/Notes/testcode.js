// write a function to retrieve a blob of JSON
// make an ajax request. Use the 'fetch' function

// http://rallycoding.herokuapp.com/api/music_albums

// async await syntax
// identify a function that contains asynchronous code and put async in front of the function
// in front of each promise, put await
// async function fetchAlbums() {
//   //   fetch("http://rallycoding.herokuapp.com/api/music_albums")
//   //     .then((res) =>
//   //       // fetch resolves its promise with an object representing the request
//   //       //res short for response. res.json to get the actual data we receive from this response but it returns another promise
//   //       // to deal with a promise, we call .then() with an argument
//   //       res.json()
//   //     )
//   //     .then((json) =>
//   //       //gets the actual json that is returned
//   //       console.log(json)
//   //     );

//   // identical segments of code
//   const res = await fetch("http://rallycoding.herokuapp.com/api/music_albums");
//   // console.log(res);
//   // note that the 'res' which is returned stands for response
//   const json = await res.json();

//   console.log(json);
// }

const fetchAlbums = async () => {
  const res = await fetch("http://rallycoding.herokuapp.com/api/music_albums");
  const json = await res.json();

  console.log("json", json);
};

fetchAlbums();
