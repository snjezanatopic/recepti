
function getDataFromFirebase(path, callback) {
  const dbRef = firebase.database().ref(path);
  dbRef.once('value')
    .then((snapshot) => {
      callback(snapshot.val());
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
}

// Example usage:
// getDataFromFirebase('recipes', function(data) {
//   console.log(data);
// });

// ...existing code...