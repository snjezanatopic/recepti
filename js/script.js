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










// ovaj dio je vezana za "vaši recepti, prijava i registracija"
// Pohrana podataka u lokalno skladište
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;
let userRecipes = {}; // objekat gdje ključevi su korisnički emaili, a vrijednosti su nizovi recepata

// Učitavanje postojeće recepte
if (localStorage.getItem('userRecipes')) {
    userRecipes = JSON.parse(localStorage.getItem('userRecipes'));
}

// Elementi
const modal = document.getElementById('modal');
const formContainer = document.getElementById('form-container');
const closeModalBtn = document.getElementById('close-modal');

const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const btnLogout = document.getElementById('btn-logout');

const yourRecipesSection = document.getElementById('your-recipes');
const recipeForm = document.getElementById('recipe-form');
const recipesList = document.getElementById('recipes-list');

// Funkcija za prikaz modala
function openModal(contentHTML) {
    formContainer.innerHTML = contentHTML;
    modal.style.display = 'block';
}

// Funkcija za zatvaranje modala
if (closeModalBtn)
closeModalBtn.onclick = () => {
    modal.style.display = 'none';
};
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Funkcije za prikaz forme za prijavu i registraciju
function showLoginForm() {
    const html = `
        <h2>Prijava</h2>
        <form id="login-form">
            <input type="email" id="login-email" placeholder="Email" required />
            <input type="password" id="login-password" placeholder="Lozinka" required />
            <button type="submit">Prijava</button>
        </form>
    `;
    openModal(html);

    document.getElementById('login-form').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUI();
            modal.style.display = 'none';
            prikaziRecepte();
        } else {
            alert('Neispravni podaci.');
        }
    };
}

function showRegisterForm() {
    const html = `
        <h2>Registracija</h2>
        <form id="register-form">
            <input type="email" id="register-email" placeholder="Email" required />
            <input type="password" id="register-password" placeholder="Lozinka" required />
            <button type="submit">Registriraj se</button>
        </form>
    `;
    openModal(html);

    document.getElementById('register-form').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Provjera da li korisnik već postoji
        if (users.find(u => u.email === email)) {
            alert('Korisnik s tim emailom već postoji.');
            return;
        }

        // Dodavanje novog korisnika
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUI();
        modal.style.display = 'none';
    };
}
// Funkcija za odjavu
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUI();
}     
// Funkcija za ažuriranje UI na osnovu stanja prijave
function updateUI() {
    if (currentUser) {        
       if (btnLogin)
      btnLogin.style.display = 'none';
        if (btnRegister)  
        btnRegister.style.display = 'none';
        if (btnLogout)
        btnLogout.style.display = 'inline-block';
        if (yourRecipesSection) 
        yourRecipesSection.style.display = 'block';
    } else {
        if (btnLogin)
        btnLogin.style.display = 'inline-block';
        if (btnRegister)
        btnRegister.style.display = 'inline-block';
        if (btnLogout) 
        btnLogout.style.display = 'none';
        if (yourRecipesSection)
        yourRecipesSection.style.display = 'none';
    }    
}
// Funkcija za prikaz recepata korisnika
function prikaziRecepte() {
    if (!currentUser) return;

    const userRecipes = recipes.filter(r => r.author === currentUser.email);
    recipesList.innerHTML = '';

    if (userRecipes.length === 0) {
        recipesList.innerHTML = '<p>Nema vaših recepata.</p>';
        return;
    }

    userRecipes.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = recipe.title;
        recipesList.appendChild(li);
    });
}   
// Event listeneri za dugmad
if (btnLogin)
btnLogin.onclick = showLoginForm;
if (btnRegister)
btnRegister.onclick = showRegisterForm;
if (btnLogout)
btnLogout.onclick = logout;
if (recipeForm)
recipeForm.onsubmit = (e) => {
    e.preventDefault();
    const title = recipeTitle.value;
    const details = recipeDetails.value;

    const newRecipe = { title, details, author: currentUser.email };
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    prikaziRecepte();
    recipeForm.reset();
};

// Inicijalizacija
if (localStorage.getItem('currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
}
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
}
updateUI();
prikaziRecepte();
const recipeTitle = document.getElementById('recipe-title');
const recipeDetails = document.getElementById('recipe-details');
// kraj ovog dijela je vezana za "vaši recepti, prijava i registracija"










function prikaziHladnoPredjelo () {
  getDataFromFirebase('recepti', "hladno_predjelo", function(data) {
    console.log(data);
    rendercards(data, 'recepti-hladno-predjelo');
  });
}

prikaziHladnoPredjelo();




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


function prikaziKruh () {
  getDataFromFirebase('recepti', "kruh", function(data) {
    console.log(data);
    rendercards(data, 'recepti-kruh');
  });
}

prikaziKruh();


function prikaziToploPredjelo () {
  getDataFromFirebase('recepti', "toplo_predjelo", function(data) {
    console.log(data);
    rendercards(data, 'recepti-toplo-predjelo');
  });
}

prikaziToploPredjelo();



function prikaziPalacinke () {
  getDataFromFirebase('recepti', "palacinke", function(data) {
    console.log(data);
    rendercards(data, 'recepti-palacinke');
  });
}

prikaziPalacinke();




function prikaziKolaciBezPecenja () {
  getDataFromFirebase('recepti', "kolaci_bez_pecenja", function(data) {
    console.log(data);
    rendercards(data, 'recepti-kolaci-bez-pecenja');
  });
}

prikaziKolaciBezPecenja();


function prikaziPeciva () {
  getDataFromFirebase('recepti', "peciva", function(data) {
    console.log(data);
    rendercards(data, 'recepti-peciva');
  });
}

prikaziPeciva();



function prikaziRazniSmoothie () {
  getDataFromFirebase('recepti', "razni_smoothie", function(data) {
    console.log(data);
    rendercards(data, 'recepti-razni-smoothie');
  });
}

prikaziRazniSmoothie();



function prikaziSladoled () {
  getDataFromFirebase('recepti', "sladoled", function(data) {
    console.log(data);
    rendercards(data, 'recepti-sladoled');
  });
}

prikaziSladoled();




function prikaziSlatkiZalogajcici () {
  getDataFromFirebase('recepti', "slatki_zalogajcici", function(data) {
    console.log(data);
    rendercards(data, 'recepti-slatki-zalogajcici');
  });
}

prikaziSlatkiZalogajcici();



function prikaziStrudleIPite () {
  getDataFromFirebase('recepti', "strudle_i_pite", function(data) {
    console.log(data);
    rendercards(data, 'recepti-strudle-i-pite');
  });
}

prikaziStrudleIPite();





function prikaziTjestenina () {
  getDataFromFirebase('recepti', "tjestenina", function(data) {
    console.log(data);
    rendercards(data, 'recepti-tjestenina');
  });
}

prikaziTjestenina();


function prikaziPovrce () {
  getDataFromFirebase('recepti', "povrce", function(data) {
    console.log(data);
    rendercards(data, 'recepti-povrce');
  });
}

prikaziPovrce();



function prikaziClanci () {
  getDataFromFirebase('recepti', "clanci", function(data) {
    console.log(data);
    rendercards(data, 'recepti-clanci');
  });
}

prikaziClanci();



function prikazivoce () {
  getDataFromFirebase('recepti', "voce", function(data) {
    console.log(data);
    rendercards(data, 'recepti-voce');
  });
}

prikazivoce();





