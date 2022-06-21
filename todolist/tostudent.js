console.clear();
const text = document.querySelector('.text');
const addBtn = document.querySelector('.btn_add');
const list = document.querySelector('.list');
let data = [];


function addTodo(){
  let todo = {
    text: text.value,
    id: new Date().getTime(),
    checked: ""
  }
   if(todo.text.trim() !== '') {
     data.unshift(todo);
     text.value = "";
     console.log(data);
   }
  updateList(); //初始化頁面
}

function renderList(data){
  let str = '';
  data.forEach((item) => {
  let content = 
      `<li data-id="${item.id}">
          <label class="checkbox" for="">
            <input type="checkbox" ${item.checked}/>
            <span>${item.text}</span>
          </label>
          <a href="#" class="delete"></a>
        </li>`;
    str += content;
  });
  list.innerHTML = str;
}


addBtn.addEventListener('click', addTodo);
list.addEventListener('click', (e) => {
  //透過 closest 的方式能找出點擊到的 li 標籤
  //透過 dataset.id 取出埋在該 li 內的 id
  //取出來的 id 會是字串型別記得幫它轉型成數字型別
  let id = parseInt(e.target.closest("li").dataset.id);
  //刪除功能
  //透過 classList.contains 確認是否包含 class delete
  if (e.target.classList.contains("delete")) {
    e.preventDefault(); //取消 a 標籤預設行為
    //透過陣法方法 findIndex 比對 todoData 內的 id 是否等於點擊到的 id
    let index = data.findIndex((item) => item.id === id);
    //如果是的話刪除該筆資料
    data.splice(index, 1);
  }else {
    //切換打勾功能
    //透過 todoData 去跑 forEach
    data.forEach((item) => {
      //如果 todoData 內的 id 是否等於點擊到的 id
      if (item.id === id) {
        //補充：checked 為 input checkbox 的屬性，如果新增 checked 代表打勾
        //如果點擊到的該筆 item 中 checked 屬性為 "checked"
        if (item.checked === "checked") {
          //切換狀態為不打勾
          item.checked = "";
        } else {
          //切換狀態為打勾
          item.checked = "checked";
        }
      }
    });
  }
  // 重新渲染
updateList(); //初始化頁面
});

const tab =  document.querySelector('.tab');
//預設顯示狀態為全部
let toggleStatus = "all";
//註冊監聽是否點擊到 tab

tab.addEventListener("click", changeTab);
//點擊到 tab 就執行 changeTab(e)
function changeTab(e) {
  //透過 e.target 將 dataset 埋入的 tab 取出
  toggleStatus = e.target.dataset.tab;
  //透過 querySelectorAll 選取 tab 標籤底下的 li
  let tabs = document.querySelectorAll(".tab li"); //類陣列
  //點擊時 tab 先清掉全部 class 樣式
  tabs.forEach((item) => {
    //透過 classList.remove 的方式先移除全部的 class active 樣式
    item.classList.remove("active");
  });
  //有被點擊到的才加 class 樣式
  e.target.classList.add("active");
  //切換頁面重新渲染
  updateList();
}

//修改完成狀態
function updateList() {
  //切換不同頁面顯示資料
  let showData = [];
  //跟切換 tab 的 toggleStatus 整合
  if (toggleStatus === "all") {
    //狀態為全部 "all" 時就全部顯示
    showData = data;
    //狀態為待完成 "work" 時
  } else if (toggleStatus === "work") {
    //篩選出為 checked 為 '' 尚未打勾的
    showData = data.filter((item) => item.checked === "");
  } else {
    //篩選出為 checked 為 "checked" 已經打勾的
    showData = data.filter((item) => item.checked === "checked");
  }
  //計算幾個待完成項目 (左下角)
  const workNum = document.querySelector(".workNum");
  //待完成的長度透過篩選出 checked 為 '' 尚未打勾的
  let todoLength = data.filter((item) => item.checked === "");
  //並將長度賦予到該 DOM 節點上
  workNum.textContent = todoLength.length;
  //渲染 showData
  renderList(showData);
}
updateList(); //初始化頁面

const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", (e) => {
  //取消預設效果
  e.preventDefault();
  //篩選出不是打勾狀態(未完成)的
  data = data.filter((item) => item.checked !== "checked");
  //重新渲染 updateList()
  updateList();
});
//點擊 Enter 也可以新增資料
//註冊監聽 text 的鍵盤 "keyup" 事件
text.addEventListener("keyup", (e) => {
  //如果點擊到 "Enter"
  if (e.key === "Enter") {
    //執行新增該筆資料
    addTodo();
  }
});





//   let a = 20
//   console.log(a);

//   var args = [1, 2, 3];
//   var abs =[...args];
//   console.log(abs);

// let groupA = {'老大':'1','老二':'2','老么':'3'};
// let groupB = {...groupA};
// groupB['老大']=33;

// console.log(groupA); // ['老大','老二','老么'];
// console.log(groupB); // ['老大','老二','老么','小花'];

// function promiseFn(num){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       if(num){
//         resolve('成功');
//       }else {
//         reject('失敗')
//       }
//     },10);
//   }).then(res=>{
    
//     console.log(res);
//   }).catch(res=>{
//     console.log(res);
//   })
// }

// promiseFn(1)
// promiseFn(0)


// let data5 = {}

// console.log('開始');

// axios.get('https://randomuser.me/api/').then(function(response) {
//   data5 = response;
// });

// console.log(data5);


let num ='https://randomuser.me/api/';

// axios.get(url).then((res)=>{
//   console.log(1,res);
//   const seed =res.data.info.seed;
//   return axios.get(`${url}?seed=${seed}`)
// }).then((res)=>{
//   console.log(2,res);
// })

// Promise.all([axios.get(url),axios.get(url)]).then(([res1,res2])=>{
//   console.log(res1,res2);
// })


// axios.get(url).then((res)=>{
//   console.log(res);
// })
// Promise.all(([axios.get(url),axios.get(url)])).then(([res1,res2])=>{
//   console.log(res1,res2);
// })

// const promiseFn =function(num,time){
//   return new Promise ((resolve,reject)=>{
//     setTimeout(()=>{
//       if(num){
//         resolve('你率 成功')
//       }else{
//         reject('failed')
//       }
//     },time)
//   })
// }

// promiseFn(1,100).then((res)=>{
//   console.log(res);
//   return promiseFn(0,300)
// }).catch((res)=>{
//   console.log(res);
// })


// array=[1,2,3,4]
// array[4]=5;
// // array.push('炒米粉')
// array.splice(1,1)
// console.log(array);

// const a = document.querySelector

// console.log(typeof(array));

// console.log(ggs);



// const promiseFn =function(num,time){
//   return new Promise((resolve,reject)=>{
//   setInterval(()=>{
//     if(num){
//       resolve('成功');
//     }else{
//       reject('失敗')
//     }

// })
//   })
     
// }

// promiseFn(num,100).then((res)=>{
//   console.log(res);
//   return promiseFn(num,100)
// }).then((res)=>{
//   console.log(res,'12');
//   return promiseFn(0,1000)
// })
// .catch((res)=>{
//   console.log(res);
// })


// const promiseFn =function(num,time){
//   return new Promise ((resolve,reject)=>{
//     setTimeout(() => {
//         if(num){
//           resolve('成功kkkk')
//         }else{
//           reject('失敗')
//         }
//     }, time);
//   })
// }

// promiseFn(0,300).then((res)=>{
//   console.log(res);
// }).catch((res)=>{
//   console.log(res);
// })


array2=[2,4,5,6,444,55,32,1,3,5,67,31]
array2.sort((x,y)=>{
  return y-x
})

console.log(array2[array2.length-1]);
let abc = Math.max(...array2);
console.log(abc);
let cca = [...array2];
console.log(cca);



const promiseFn =function(num,time){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(num){
        resolve('成功')
      }else{
        reject('失敗')
      }
    },time)
  })
}
promiseFn(1,1000).then((res)=>{
  console.log(res);
  return promiseFn(0,100)
}).catch((res)=>{
  console.log(res);
})

let a=0;b=0;c=0;
let person ={
  height:a,
  weight:b,
  age:c
}

function superman(a,b,c){
  person.height=a;
  person.weight=b;
  person.age=c;
console.log(person);
} 
superman(171,64,24)


var arr = [1,2,3,4,1,2,3,1,2,3]
let arr2 =[...arr]
let arr3 =arr;
console.log(arr2 == arr);
console.log(arr3 == arr);
let newarr =[...new Set(arr)]
console.log(newarr);
console.log(newarr == uniqueArr);


var uniqueArr = Math.max(...arr)

console.log(uniqueArr)