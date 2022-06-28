
import expess from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue,query, limitToLast} from "firebase/database";
export { listDes};

const firebaseConfig = {
  apiKey: "AIzaSyAJARgDKBZxQPTp5-f7aW1fOFXYwQ1CvfQ",
  authDomain: "sep401-c7014.firebaseapp.com",
  databaseURL: "https://sep401-c7014-default-rtdb.firebaseio.com",
  projectId: "sep401-c7014",
  storageBucket: "sep401-c7014.appspot.com",
  messagingSenderId: "499375396148",
  appId: "1:499375396148:web:e497e23ffa5c081debc161",
  measurementId: "G-PNL8X0G7Q6"
};

// Initialize Firebase
//Setings
var app = expess();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000
app.use('/css', expess.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', expess.static(__dirname + '/node_modules/jquery/dist/'));
app.set('port', port);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
//stactic files
app.use(expess.static(path.join(__dirname,'public')));
//deploy
app.listen(app.get('port'),() =>{
  console.log('Server on port', app.get('port'));
});

const appDB = initializeApp(firebaseConfig);
const database = getDatabase();
const items = ref(database, 'items/desserts')
// const newPostRef = push(items);

// onChildAdded(items, (data) => {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });
 // A post entry.
//  const postData = {
//   author: username,
//   uid: uid,
//   body: body,
//   title: title,
//   starCount: 0,
//   authorPic: picture
// };

 var listDes = []
 onValue(items, (snapshot) => {
  
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    listDes.push(childData)
   
    // ...
  });
}, {
  onlyOnce: true
});

//routes
 app.get('/', (req,res) =>{
   const snap =  query(items);
   console.log(listDes);
   app.resource('/items',listDes)
  
  //  const list = snap.docs.map((doc)=>({...doc.data()}))
  //  console.log(list)

  res.render('index',{title: 'Welcome to SEP401'});
});


//routes menu
app.get('/menu', (req,res) =>{
  const database = getDatabase();
  // const starCountRef = ref(database,"items");
  const recentPostsRef = query(ref(database, 'items'), limitToLast(100));
  // console.log(recentPostsRef)
  onValue(recentPostsRef, (snapshot) => {
   const data = snapshot.val();
    console.log(data)
   res.render('menu',{title:'Menu', menu: data});
  });
  
});

