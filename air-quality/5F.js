
const url='https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e304f3f6-9d90-4208-b460-133646a956ce'


const local =document.querySelector('#location')
const siteData =document.querySelector('#siteData')
let site =[]
let data=[];
let newData=[];
let cityData=[];
let nowTime='';



function getData(){
  axios.get(url).then((res) => {
    data =res.data.records
    console.log(data);
    nowTime =data[0].publishtime;
    console.log(nowTime);
   

    getCityData();
    getTime();

   
   
  
  }).catch((err) => {
    console.log(err);
    alert('資料錯誤，請稍後再嘗試')
  });
}

getData();

function getTime(){
  now = nowTime.split(' ');
  console.log(now);
  time3=now[1].split('',5).join('');
  date3 =now[0].split('/').join('-');
  
  console.log(time3);
  console.log(date3);

}

function getCityData(){
  data.forEach(item=> {
  newData.push(item.county); })

  // 塞選22筆縣市資料
  cityData =newData.filter((item,index,arr)=>{
      return arr.indexOf(item) === index ;});

  console.log(cityData);
  let str ='';

  cityData.forEach((item)=>{
    str+=`
    <option value="${item}">${item}</option>
    `
  })
  local.innerHTML =str; 
  randerSiteData(data)
  randerFirstCity(site)
  detailData(site)
 
}

const text =document.querySelector('.text')
const cityName =document.querySelector('#cityData')

// 下拉式選單
local.addEventListener('click',(e)=>{
  text.innerHTML = local.value; 
  randerSiteData(data)
  randerFirstCity(site)
  detailData(site)

})

function randerFirstCity(data){
  data.forEach((item)=>{
    
    cityName.innerHTML =`

    <button type="button" class="btn py-4 border rounded-0 mb-0">
    ${item.sitename}
  </button>
  <button
    type="button"
    class="btn btn-primary border rounded-0 mb-0"
    data-aqi
  >
    ${item.aqi}
  </button>
    
    `
   
  })
}

function detailData(data){
  data.forEach((item)=>{
    
    detail.innerHTML =`
    <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">城市</h4>
    <span>O3 (ppb)</span>
    <h4 class="ml-auto mb-0">${item.sitename}</h4>
  </li>
    <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">臭氧</h4>
    <span>O3 (ppb)</span>
    <h4 class="ml-auto mb-0">${item.o3}</h4>
  </li>
  <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">懸浮微粒</h4>
    <span>PM10 (μg/m³)</span>
    <h4 class="ml-auto mb-0">${item.pm10}</h4>
  </li>
  <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">細懸浮微粒</h4>
    <span>PM2.5 (μg/m³)</span>
    <h4 class="ml-auto mb-0">${item['pm2.5']}</h4>
  </li>
  <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">一氧化碳</h4>
    <span>CO (ppm)</span>
    <h4 class="ml-auto mb-0">${item.co}</h4>
  </li>
  <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">二氧化硫</h4>
    <span>SO2 (ppb)</span>
    <h4 class="ml-auto mb-0">${item.so2}</h4>
  </li>
  <li class="d-flex align-items-end pb-3 mb-3">
    <h4 class="mb-0 mr-2">二氧化氮</h4>
    <span>NO2 (ppb)</span>
    <h4 class="ml-auto mb-0">${item.no2}</h4>
  </li>
    `
    
  })
}


function randerSiteData(){
  site = data.filter((item)=>{
    return item.county ==local.value;
  })
  
  let str ='';
  site.forEach((item)=>{
  str+=`
    <div class="col-6 mb-4">
    <div
      class="btn-group btn-block rounded-0"
      role="group"
      aria-label="Basic example"
      data-btn
    >
      <button
        type="button"
        class="btn py-4 border rounded-0 mb-0"
        data-site="${item.sitename}"
      >
        ${item.sitename}
      </button>
      <button
        type="button"
        class="btn btn-primary border rounded-0 mb-0"
        data-aqi
      >
        ${item.aqi}
      </button>
    </div>
  </div> `
  })
  siteData.innerHTML =str;
  console.log(site);
}

siteData.addEventListener('click',(e)=>{
  console.log(e.target.dataset.site);
  let siteData = data.filter((item)=>{
      return item.sitename ===e.target.dataset.site
  })
  console.log(siteData);
  detailData(siteData)
  randerFirstCity(siteData)
})


