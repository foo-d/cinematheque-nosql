var firebaseConfig = {
  apiKey: "AIzaSyA74mURdk57hFn0jB9NSFzv1MY69ymxNSU",
  authDomain: "cinematheque-nosql.firebaseapp.com",
  databaseURL: "https://cinematheque-nosql-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cinematheque-nosql",
  storageBucket: "cinematheque-nosql.appspot.com",
  messagingSenderId: "937608774480",
  appId: "1:937608774480:web:176efae9e4c67ebf2c6255"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function loadProfil() {
  db.collection('user').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().email = window.location.href.split('#')[1]) {
        document.getElementById('pseudo').value = doc.data().pseudo;
        document.getElementById('datenaissance').value = doc.data().datenaissance;
        document.getElementById('pays').value = doc.data().pays;
        document.getElementById('bio').value = doc.data().bio;
        document.getElementById('genrefavori').value = doc.data().genrefavori;
        document.getElementById('filmfavori').value = doc.data().filmfavori;
      }
    });
  });
}

function goToProfil(temp) {
  location.href = 'article.html#' + temp;
}

function saveInfo() {
  if (document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1] == window.location.href.split('#')[1]) {
    db.collection('user').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1]) {
          return db.collection('user').doc(doc.id).update({
            bio: document.getElementById('bio').value,
            datenaissance: document.getElementById('datenaissance').value,
            filmfavori: document.getElementById('filmfavori').value,
            genrefavori: document.getElementById('genrefavori').value,
            pays: document.getElementById('pays').value,
            pseudo: document.getElementById('pseudo').value
          }).then(() => {
            console.log('Document successfully updated!');
          }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        }
      });
    });
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkCookie() {
  if (document.cookie.split('; ').find(row => row.startsWith('email='))) {
    if (document.cookie && document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1] != '') {
      let temp = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
      document.getElementById('login').innerHTML = '<button style="width: 110px;color: black; background-color: white;border: 3px solid white;border-radius: 10px 10px 10px 10px;margin-right: 5px;" onclick="goToProfil(\'' + temp + '\');">&nbsp;' + document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1] + ' </button><button onclick="logout();" style="width: 110px;color: white; background-color: black;border: 3px solid black;border-radius: 10px 10px 10px 10px;">Se déconnecter</button>'
    }
  }
}

function login() { 
  if (validateEmail(document.getElementById('email').value)) {
    if (document.getElementById('password').value !== '') {
      db.collection('user').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (document.getElementById('email').value == doc.data().email && document.getElementById('password').value == doc.data().password) {
            document.cookie = 'email=' + document.getElementById('email').value + ';';
            let temp = document.getElementById('email').value;
            document.getElementById('login').innerHTML = '<button style="width: 110px;color: black; background-color: white;border: 3px solid white;border-radius: 10px 10px 10px 10px;margin-right: 5px;" onclick="goToProfil(\'' + temp + '\');">&nbsp;' + document.getElementById('email').value + ' </button><button onclick="logout();" style="width: 110px;color: white; background-color: black;border: 3px solid black;border-radius: 10px 10px 10px 10px;">Se déconnecter</button>'
          }
        });
      });
    } else {
      alert('Le mot de passe ne peux pas être vide');
    }
  } else {
    alert('Vérifiez votre adresse email');
  }
}

function register() {
  if (validateEmail(document.getElementById('email').value)) {
    if (document.getElementById('password').value !== '') {
      alert('Bienvenue chez Cinematheque');
      db.collection('user').add({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      }).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      document.cookie = 'email=' + document.getElementById('email').value + ';';
      let temp = document.getElementById('email').value;
      document.getElementById('login').innerHTML = '<button style="width: 110px;color: black; background-color: white;border: 3px solid white;border-radius: 10px 10px 10px 10px;margin-right: 5px;" onclick="goToProfil(\'' + temp + '\');">&nbsp;' + document.getElementById('email').value + ' </button><button onclick="logout();" style="width: 110px;color: white; background-color: black;border: 3px solid black;border-radius: 10px 10px 10px 10px;>Se déconnecter</button>'
    } else {
      alert('Le mot de passe ne peux pas être vide');
    }
  } else {
    alert('Vérifiez votre adresse email');
  }
}

function logout() {
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.getElementById('login').innerHTML =
  '<input type="email" placeholder="Email" name="email" id="email" style="width: 170px;border: 3px solid white;border-radius: 10px 10px 0 0;text-align: center;"> <button id="btnlogin" style="width: 110px;color: white; background-color: black;border: 3px solid black;border-radius: 10px 10px 0 0;" onclick="login();">Se connecter</button><br>' +
  '<input type="password" placeholder="Mot de passe" name="password" id="password" style="width: 170px;border: 3px solid white;border-radius: 0 0 10px 10px;text-align: center;"> <button id="btnregister" style="width: 110px;color: white; background-color: black;border: 3px solid black;border-radius: 0 0 10px 10px;" onclick="register();">S\'inscrire</button>';
  location.href = 'index.html';
}

function festivals() {
  db.collection('festivals').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      document.getElementById('festivals').innerHTML +=
      '<li>' +
      '<img src="' + doc.data().image + '" alt="" style="width: 200px; border: 5px solid black" />' +
      '<a href="#">' + doc.data().nom + '</a><br>' +
      doc.data().description + '<br><br>' +
      'Prix : ' + doc.data().prix + '<br>' +
      doc.data().lieu + '<br>' +
      doc.data().prochain + '<br><br>' +
      doc.data().bio +
      '</li>';
    });
  });
}

function sorties() {
  db.collection('actualites').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      document.getElementById('sorties').innerHTML +=
      '<li>' +
      '<img src="' + doc.data().image + '" alt="" style="width: 200px; border: 5px solid black" />' +
      '<a href="#">' + doc.data().nom + '</a><br><br>' +
      doc.data().date + ' - ' + doc.data().genre + '<br>' +
      'Réalisé par ' + doc.data().realisateur + '<br>' +
      'Avec ' + doc.data().acteurs + '<br><br>' +
      doc.data().description +
      '</li>';
    });
  });
}

function realisateurs() {
  db.collection('realisateurs').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      document.getElementById('realisateurs').innerHTML +=
      '<li id="a' + doc.data().nom + doc.data().prenom + '">' + 
      '<img src="' + doc.data().image + '" alt="" style="width: 200px; border: 5px solid black" />' +
      '<a href="#">' + doc.data().prenom + ' ' + doc.data().nom + '</a><br>' +
      '<img src="' + doc.data().drapeau + '" alt="" style="height: 16px; margin-top: 4px" />' + doc.data().nationalite + '<br>' +
      doc.data().biographie + '<br><br>' +
      '<div id="' + doc.data().nom + doc.data().prenom + '"></div><br><br><br><br>' +
      '<a href="films.html#a' + doc.data().nom + doc.data().prenom + '">Voir les films réalisés par ' + doc.data().prenom + ' ' + doc.data().nom + '...</a>' +
      '</li>';
      location.href = '#' + window.location.href.split('#')[1];
      db.collection('realisateurs').doc(doc.data().nom.replace(' ', '') + doc.data().prenom).collection('films').get().then((querySnapshot0) => {
        querySnapshot0.forEach((film) => {
          document.getElementById(doc.data().nom + doc.data().prenom).innerHTML +=
          '<img src="' + film.data().image + '" alt="" style="height: 85px; border: 2px solid black" />';
        });
      });
    });
  }).catch((error) => {
    console.log('Error getting document : ', error);
  });
}

function films() {
  db.collection('realisateurs').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      db.collection('realisateurs').doc(doc.data().nom.replace(' ', '') + doc.data().prenom).collection('films').get().then((querySnapshot0) => {
        querySnapshot0.forEach((film) => {
          document.getElementById('films').innerHTML += 
          '<li id="a' + doc.data().nom + doc.data().prenom + '">' + 
          '<img src="' + film.data().image + '" alt="" style="width: 200px; border: 5px solid black" />' +
          '<a href="#">' + film.data().nom + '</a><br>' +
          film.data().date + ' - ' + film.data().genre + ' - ' + film.data().duree + '<br>' +
          '⭐ ' + film.data().note + '<br>' +
          film.data().description + '<br>' +
          '<a href="articles.html#a' + doc.data().nom + doc.data().prenom + '">Réalisé par ' + film.data().realisateur + ' (voir plus...)</a>';
          location.href = '#' + window.location.href.split('#')[1];
        });
      }).catch((error) => {
        console.log('Error getting document : ', error);
      });
    });
  });
}