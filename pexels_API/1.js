const container =document.querySelector('.container')
const btn = document.querySelector('.btn')
const searchValue =document.querySelector('#search')
const searchBtn =document.querySelector('.search_btn')
const ulBox =document.querySelector('.ulBox')
const loading=document.querySelector('#loading')
let auth ='563492ad6f91700001000001b5f41c61d5d34784b842ed700031fe27'
let num=1;
let snum =1;
let initNum =0;

getPhoto()
// 第一支  563492ad6f91700001000001b5f41c61d5d34784b842ed700031fe27
// 第二支2 563492ad6f917000010000013470d7a9a7b44b32935140c977f9ef82

async function render(url){
    let data = await axios.get(url,{
        headers:{
            Authorization:auth,
        }})
        let str=''
        let photos =data.data.photos;
        console.log(data);
        photos.forEach(d => {   

            str+=`
            <li>
            <p>${d.photographer}</p>
            <img src="${d.src.large}" alt="" /></li>`  
            
        });
        loading.classList.add('visible')
        ulBox.insertAdjacentHTML('beforeend',str)
}


// 精選照片
function getPhoto(){
    let url =`https://api.pexels.com/v1/curated?page=${num}&per_page15`
    render(url)
}

// 搜尋照片
function searchPhoto(txt){ 
    let url = `https://api.pexels.com/v1/search?query=${txt}&page=${snum}&per_page=15`
    render(url)
}

// 點擊更改搜尋照片
searchBtn.addEventListener('click',()=>{
    let txt =searchValue.value;
    initNum =0;
    ulBox.innerHTML=''
    loading.classList.remove('visible')
    searchPhoto(txt)
})
// 點擊新增精選照片
btn.addEventListener('click',()=>{
    let txt =searchValue.value;
    if(txt ==''){
        getPhoto() 
        num++
    }else{
        if(initNum ==0){
            snum ++;
            searchPhoto(txt)
            initNum+=1;
        }else{
            snum++
            searchPhoto(txt)
        }
    }

})
