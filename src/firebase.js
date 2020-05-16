import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBv36gR2w5eLFrzGv2Vb4oVHmluZ3Q7hcE",
    authDomain: "dianquan.firebaseapp.com",
    databaseURL: "https://dianquan.firebaseio.com",
    projectId: "dianquan",
    storageBucket: "dianquan.appspot.com",
    messagingSenderId: "219304596629",
    appId: "1:219304596629:web:162b0bead23a823312379c",
    measurementId: "G-0XKWV8Y0L2"
  };
var fire = firebase.initializeApp(config);
export default fire;

