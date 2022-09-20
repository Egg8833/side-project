// JSON 檔案網址
const url = "https://shannon945.github.io/farm_produce/data.json";
const productsList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
let data = [];
//撈取資料
function getData() {
  axios.get(url).then(function (response) {
    data = response.data;
    console.log(response);
    renderData(data)
  });
}
getData();

//透過此方式可以呼叫 renderData 並傳入參數，組出想渲染的字串
function renderData(showData) {
  let str = "";
  showData.forEach((item) => {
    str += `<tr>
        <td>${item.作物名稱}</td> 
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`;
  });
 productsList.innerHTML = str;
}

buttonGroup.addEventListener("click", function(e) {
 
  //請透過底下判斷式，確認點擊到的是否為 BUTTON
  if (e.target.type == "button") {
    Array.from(this.children).forEach(button=>{
      button.classList.remove('active');
    });
    e.target.classList.add('active');
    //請取出埋藏於 HTML button 上的 data-type 屬性值
    //將該值賦予到 type 變數上
    let type = e.target.dataset.type;
    let filterData = [];
    if (type == "N04") {
    
      filterData = data.filter(item =>{
          return item.種類代碼 =='N04'
      })
     
    } else if (type == "N05") {
  
      filterData = data.filter(item=>item.種類代碼 == "N05");
    } else if (type == "N06") {
    
       filterData = data.filter(item=>item["種類代碼"] == "N06");
    }
  
    //呼叫 renderData 並傳入參數 filterData
    renderData(filterData);
  }
});



const search = document.querySelector(".search-group");

//註冊監聽 search 的點擊事件，並帶入事件參數
search.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
   
    const crop = document.querySelector("#crop");
    if(crop.value.trim() ==''){
        alert("請輸入內容")
    }
  
   
    let filterData = [];
     filterData = data.filter((item)=> item.作物名稱 === crop.value);
    // filterData = data.filter(item =>{
    //     item.作物名稱 ===crop.value;
   
    
  
    //判斷 filterData 長度等於零
    //不等於零的情況下執行函式 renderData 並帶入參數 filterData
    if (filterData.length === 0) {
      productsList.innerHTML =
        '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>';
    } else {
      renderData(filterData);
    }
  }
});

const select = document.querySelector('.sort-select');

//註冊監聽 select 的 change 事件
select.addEventListener('change',(e)=>{
    switch(e.target.value){
       
        case '依上價排序':
        selectChange('上價');
        break;

        case '依中價排序':
        selectChange('中價');
        break;

        case '依下價排序':
        selectChange('下價');
        break;

        case '依平均價排序':
        selectChange('平均價');
        break;   
        case '依交易量排序':
        selectChange('交易價');
        break;        
    }
})


function selectChange(value){
    data.sort(function(a,b){
        return a[value]-b[value];
    })
    renderData(data);
}



const sortAdvanced = document.querySelector(".js-sort-advanced");
sortAdvanced.addEventListener('click',(e)=>{

    let getData =e.target.dataset;
    
    function  priceTrade(){
        let priceUp =[];
        let priceDown =[];
        if(getData.sort =='up'){
            priceUp =data.sort(function(a,b){
                return a[`${getData.price}`]-b[`${getData.price}`];
            })
            renderData(priceUp);
            console.log(priceUp);
         
        }else if (getData.sort =='down'){
            
            priceDown =data.sort(function(a,b){
                return b[`${getData.price}`]-a[`${getData.price}`];
            })
            renderData(priceDown);
        }      
    }

        if(getData.price =="上價"){
            priceTrade()
        }else if(getData.price =="中價"){
            priceTrade()
        }
        else if(getData.price =="下價"){
            priceTrade()
        }
        else if(getData.price =="平均價"){
            priceTrade()
        }
        else if(getData.price =="交易量"){
            priceTrade()
        }

})



