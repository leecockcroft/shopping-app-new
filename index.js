import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, onValue,push,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const myApp=(()=>{
  const appSettings={
  databaseURL:''
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")


const shoppinglistInDB = ref(database, "shopping")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
let ulEl = document.getElementById("ulEl")
let arr=[]

const getData=()=>{

  let data;
  let allData;
  onValue(shoppinglistInDB,(snapshot)=>{
    if(snapshot.exists()){


  data = Object.values(snapshot.val())
  allData= Object.entries(snapshot.val())
    arr=allData;

    for(var i=0;i<allData.length;i++){

      let all = allData[i];
      let keys = all[0];
      let values = all[1]

    }
     renderUl()

       }
    else{
      ulEl.innerHTML='no data'
    }
   })

}


const eventHandler=()=>{
  getData()
  addButtonEl.addEventListener("click", addToDataBase)


}

const addToDataBase=()=>{
   let inputValue = inputFieldEl.value

    push(shoppinglistInDB, inputValue)

    console.log(`${inputValue} added to database`)
  resetInputValue()
}


const resetInputValue=()=>{
  inputFieldEl.value=""
}



const renderUl=()=>{
 ulEl.innerHTML=""

  arr.forEach((item,index)=>{

  let newLi = document.createElement('li');
    newLi.textContent=item[1];
    newLi.id=item[0];


    newLi.addEventListener('click',()=>{


       let exactLocationOfItemInDB = ref(database, `shopping/${event.target.id}`)
       remove(exactLocationOfItemInDB)
      console.log('removed')



  })


        ulEl.appendChild(newLi);

  })


}










return{


  init:()=>{
    eventHandler()
  },
  deleteItem:()=>{
    deleteFromarr()
  }
}







})()


myApp.init()
