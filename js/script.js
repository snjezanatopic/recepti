const db = firebase.database();
function getDataFromFirebase(path, filter, callback) {
  const dbRef = db.ref(path);
 dbRef.orderByChild("kategorija").equalTo(filter).once("value")
  .then(snapshot => {
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

//getDataFromFirebase('recepti', "hladno-predjelo", function(data) {
  //console.log(data);
//}); 
function rendercards(data, containerId) {
 const container = document.getElementById(containerId);
 if (!container) { return; }
    container.innerHTML = ''; // Clear previous content
    for (const [key, value] of Object.entries(data)) {
      console.log(value);
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      card.innerHTML = `
        <img src="${value.slika}" alt="${value.naziv}" />
        <h3>${value.naziv}</h3>
        <p>${value.opis}</p>
        <a href="${value.link}" target="_blank"><button>Pročitaj recept</button></a>
      `;
      container.appendChild(card);
    }
}




function prikaziHladnaPredjela () {
  getDataFromFirebase('recepti', "hladno_predjelo", function(data) {
    console.log(data);
    rendercards(data, 'recepti-hladno-predjelo');
  });
}

prikaziHladnaPredjela();




function prikaziJuhe () {
  getDataFromFirebase('recepti', "juhe", function(data) {
    console.log(data);
    rendercards(data, 'recepti-juhe');
  });
}

prikaziJuhe();



function prikaziGlavnoJelo () {
  getDataFromFirebase('recepti', "glavno_jelo", function(data) {
    console.log(data);
    rendercards(data, 'recepti-glavno-jelo');
  });
}

prikaziGlavnoJelo();


 //nije uspjelo, nije u json formatu
function prikaziKolaciKojiSeNePeku () {
  getDataFromFirebase('recepti', "kolaci_koji_se_ne_peku", function(data) {
    console.log(data);
    rendercards(data, 'recepti-kolaci-koji-se-ne-peku');
  });
}

prikaziKolaciKojiSeNePeku();



function prikaziMeduobrok () {
  getDataFromFirebase('recepti', "meduobrok", function(data) {
    console.log(data);
    rendercards(data, 'recepti-meduobrok');
  });
}

prikaziMeduobrok();


function prikaziVecera () {
  getDataFromFirebase('recepti', "vecera", function(data) {
    console.log(data);
    rendercards(data, 'recepti-vecera');
  });
}

prikaziVecera();


function prikaziTorte () {
  getDataFromFirebase('recepti', "torte", function(data) {
    console.log(data);
    rendercards(data, 'recepti-torte');
  });
}

prikaziTorte();



function prikaziSuhiKolacici () {
  getDataFromFirebase('recepti', "suhi_kolacici", function(data) {
    console.log(data);
    rendercards(data, 'recepti-suhi-kolacici');
  });
}

prikaziSuhiKolacici();


function prikaziKolaci () {
  getDataFromFirebase('recepti', "kolaci", function(data) {
    console.log(data);
    rendercards(data, 'recepti-kolaci');
  });
}

prikaziKolaci();


function prikaziRazniSmoothie () {
  getDataFromFirebase('recepti', "razni_smoothie", function(data) {
    console.log(data);
    rendercards(data, 'recepti-razni-smoothie');
  });
}

prikaziRazniSmoothie();


function prikaziKruh () {
  getDataFromFirebase('recepti', "kruh", function(data) {
    console.log(data);
    rendercards(data, 'recepti-kruh');
  });
}

prikaziKruh()




function prikaziLijevaStrana () {
  getDataFromFirebase('recepti', "lijeva_strana", function(data) {
    console.log(data);
    rendercards(data, 'recepti-lijeva-strana');
  });
}

prikaziLijevaStrana()


