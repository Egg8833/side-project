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
/**          問題填答區開始       ***/
/** 步驟一 **/
//請依以下步驟改寫 renderData
//在名稱處新增一個參數 renderData(showData)
//將 data.forEach 改為 showData.forEach
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
  /** 步驟二 **/
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
      /** 步驟三 **/
      //請透過 data 陣列跑 filter ，並至少帶入第一個參數
      //以下步驟在 filter {} 大括號內執行
      //篩選出 data 內的種類代碼為 "N04"
      //賦予給 filterData
      filterData = data.filter(item =>{
          return item.種類代碼 =='N04'
      })
     
    } else if (type == "N05") {
      //請透過 data 陣列跑 filter ，並至少帶入第一個參數
      //以下步驟在 filter {} 大括號內執行
      //篩選出 data 內的種類代碼為 "N05"
      //賦予給 filterData
      filterData = data.filter(item=>item.種類代碼 == "N05");
    } else if (type == "N06") {
      //請透過 data 陣列跑 filter ，並至少帶入第一個參數
      //以下步驟在 filter {} 大括號內執行
      //篩選出 data 內的種類代碼為 "N06"
      //賦予給 filterData
       filterData = data.filter(item=>item["種類代碼"] == "N06");
    }
    /** 步驟四 **/
    //呼叫 renderData 並傳入參數 filterData
    renderData(filterData);
  }
});



const search = document.querySelector(".search-group");
/** 題目填答區開始  **/
/** 步驟一 **/
//註冊監聽 search 的點擊事件，並帶入事件參數
//以下步驟在監聽函式內執行
//透過 if 判斷點擊到的等於以下按鈕
//<button type="button" class="search text-white btn mb-2">搜尋</button>
search.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
   
    const crop = document.querySelector("#crop");
    if(crop.value.trim() ==''){
        alert("請輸入內容")
    }
    // if (crop.value.trim() === "") {
    //   alert("請輸入作物名稱！");
    //   return;
    // }
    /** 步驟三 **/
    //宣告一個變數 filterData 並賦予值為空陣列
    //透過 data 跑 filter，並至少帶入一個參數
    //透過 filter 篩選出作物名稱與 input 欄位值相等的結果
    //將篩選的值賦予給 filterData
    let filterData = [];
     filterData = data.filter((item)=> item.作物名稱 === crop.value);
    // filterData = data.filter(item =>{
    //     item.作物名稱 ===crop.value;
   
    
    //挑戰題
    // filterData = data.filter((item) => {
    //   return item.作物名稱.match(crop.value);
    // });
    
    /** 步驟四 **/
    //判斷 filterData 長度等於零
    //等於零的情況下
    //將 productsList 透過 innerHTML 的方式賦予以下 HTML 標籤字串
    // '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>'
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
/** 題目填答區開始 **/
/** 步驟一 **/
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
/** 步驟二 **/
//底下步驟於監聽函式大括號內執行
//使用 switch 並於 switch 後方小括號內填入(e.target.value)
//判斷撰寫五個 case ，五個 case 比對的值如下：
//"依上價排序"
//"依中價排序"
//"依下價排序"
//"依平均價排序"
//"依交易量排序"
//記得每個 case 後方需透過 break; 終止


function selectChange(value){
    data.sort(function(a,b){
        return a[value]-b[value];
    })
    renderData(data);
}





/** 步驟三 **/
//以下步驟於監聽函式內 switch 外執行
//定義一個 function 並命名為 selectChange
//帶入一個參數 value

/** 步驟四 **/
//以下步驟於 selectChange 函式內執行
//透過 data 執行陣列方法 sort
//帶入 compareFunction 函式，並於函式內帶入 a 、 b 兩參數
//透過 return 回傳 a[value] -  b[value]; 



/** 步驟五 **/
//以下步驟於 selectChange 函式內 sort 大括號外執行
//執行函式 renderData 並帶入參數 data



/** 步驟六 **/
//以下步驟於 switch 五個 case 內執行：
//"依上價排序"：呼叫 selectChange 函式並帶入參數"上價"
//"依中價排序"：呼叫 selectChange 函式並帶入參數"中價"
//"依下價排序"：呼叫 selectChange 函式並帶入參數"下價"
//"依平均價排序"：呼叫 selectChange 函式並帶入參數"平均價"
//"依交易量排序"：呼叫 selectChange 函式並帶入參數"交易量"





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



/** 題目填答區開始  **/
/** 步驟一 **/
//註冊監聽 sortAdvanced 的點擊事件
//並帶入事件參數

/** 步驟二 **/
//以下步驟於監聽函式大括號內執行
//透過 if 撰寫判斷式
//判斷點擊到的標籤是否為 <i></i> I 標籤

/** 步驟二 **/
//以下步驟於 if 判斷式內執行
//請宣告一個變數命名為 sortPrice
//將點擊時取出埋藏於 i 標籤的 data-price 值
//賦予給 sortPrice

//請宣告一個變數命名為 sortCaret
//將點擊時取出埋藏於 i 標籤的 data-sort 值
//賦予給  sortCaret

/** 步驟三 **/
//撰寫 if else 流程判斷
//在 if 的小括號內條件應填入"如果 sortCaret 取出的值相等於 "up"

/** 步驟四 **/
//以下步驟於在 if 判斷式大括號內執行
//透過 data 執行陣列方法 sort
//帶入 compareFunction 函式，並於函式內帶入 a 、 b 兩參數
//透過 return 回傳 b[sortPrice] -  a[sortPrice];
// b - a 可實現從大排到小

/** 步驟五 **/
//以下步驟在 else 大括號內執行
//透過 data 執行陣列方法 sort
//帶入 compareFunction 函式，並於函式內帶入 a 、 b 兩參數
//透過 return 回傳 a[sortPrice] -  b[sortPrice];
// a -  b 可實現從小排到大

/** 步驟六 **/
//以下步驟於 if（"判斷點擊到的為 I 標籤"）內
//if（"如果 sortCaret 取出的值相等於 "up"） else 大括號外執行
//呼叫函式 renderData 並帶入參數 data

/** 題目填答區結束  **/

