const cityele=document.querySelector('#input-city');
const searchbtn=document.querySelector('#search-btn');

//fields
let temp=document.querySelector('.temp-info p');
let cond=document.querySelector('.condition-info p');
let lan=document.querySelector('.location-info .lan');
let lon=document.querySelector('.location-info .lon');
let colevel=document.querySelector('.air-info .co');
let no2level=document.querySelector('.air-info .no2');
let o3level=document.querySelector('.air-info .o3');

let cityname=document.querySelector('.city-name');

async function current(position){
    let data1=await getdatafromlatilong(position.coords.latitude,position.coords.longitude);
    await print(data1);
}
async function bydefault(){
    let data2=await getdatafromlatilong(21.5222,70.4579);
    await print(data2);
}

async function getdatafromlatilong(lati,long){
    let promise=await fetch(`http://api.weatherapi.com/v1/current.json?key=5b4e80c0d1de463a9b570239242004&q=${lati},${long}&aqi=yes`);
    return data=await promise.json();
}

async function getdatafromcitie(citie){
    let promise=await fetch(`http://api.weatherapi.com/v1/current.json?key=5b4e80c0d1de463a9b570239242004&q=${citie}&aqi=yes`);
    return data=await promise.json();
}

navigator.geolocation.getCurrentPosition(current,bydefault);
searchbtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    let data3=await getdatafromcitie(cityele.value);
    await print(data3);
})

function print(data){
    cityname.innerText=`${data.location.name}`;
    temp.innerText=`${data.current.temp_c}'C`;
    cond.innerText=`${data.current.condition.text}`;
    lan.innerText=`Latitude: ${data.location.lat}`;
    lon.innerText=`Lognitude: ${data.location.lon }`;
    colevel.innerText=`CO: ${data.current.air_quality.co}`;
    no2level.innerText=`NO2: ${data.current.air_quality.no2}`;
    o3level.innerText=`O3: ${data.current.air_quality.o3}`;
}