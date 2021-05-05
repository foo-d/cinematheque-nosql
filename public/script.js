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