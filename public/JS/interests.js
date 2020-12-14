// const express = require('express');
// //const router = express.Router();
// const data = require('../data');
// const usersData = data.users;

// const currentUser=document.getElementById('username');
//const interestsList=usersData.userInterests(currentUser);
const interestsList=["Tech", "Science", "Art"];
// let s2=document.getElementById(slct2);
// s2.innerHTML="";
// const checkList = document.getElementById('list1');
// checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
//   if (checkList.classList.contains('visible'))
//     checkList.classList.remove('visible');
//   else
//     checkList.classList.add('visible');
// }
function createChk(inp, arr)
{
  for(let option in interestsList)  
    {   
      let checkbox=document.createElement("input");
      checkbox.setAttribute('type','checkbox');
      checkbox.setAttribute('id','interests');
      checkbox.setAttribute('name','products');
      let lbl=document.createElement('label');
      lbl.setAttribute('for', 'interests');
      lbl.appendChild(document.createTextNode(option));
      let list=document.getElementById("container");
      list.appendChild(checkbox);
      list.appendChild(lbl);
    }
}

createChk(document.getElementById('container'),interestsList);