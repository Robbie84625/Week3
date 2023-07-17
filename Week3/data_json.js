// 獲取資料並更新圖片的函數
async function getData() 
{
    const response = await fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json");
    const data = await response.json();
    let attractions={}
    for (const detail of data['result']['results']) 
    {
        // 使用正規表達式找出所有的URL，以jpg或JPG結尾
        const urls = detail['file'].match(/https?:\/\/[^\s]*?\.jpg/ig);
        //aa[detail['stitle']] = urls[0];
        attractions[detail['stitle']]=urls[0]
    }
    var three_img = document.querySelectorAll('.three_img');

    three_img.forEach(function(div, index) {
    var key = Object.keys(attractions)[index];
    var imgURL = attractions[key];

    // 创建一个新的 <img> 元素
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', imgURL);
    imgElement.setAttribute('id', 'three_img'); 
    

    // 创建一个新的 <span> 元素
    var spanElement = document.createElement('span');
    spanElement.textContent = key;

    // 將圖片和景點放入<div>中
    div.appendChild(imgElement);
    div.appendChild(spanElement);
    });

    var sixteen_img = document.querySelectorAll('.sixteen_img');
    sixteen_img.forEach(function(div, index) {
        var key = Object.keys(attractions)[index+3];
        var imgURL = attractions[key];
    
        // 创建一个新的 <img> 元素
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', imgURL);
        imgElement.setAttribute('class', 'sixteenImg'); 
        
        
    
        // 创建一个新的 <span> 元素
        var divElement = document.createElement('div');
        divElement.textContent = key;
        divElement.setAttribute('id', 'text')
    
        // 將圖片和景點放入<div>中
        div.appendChild(imgElement);
        div.appendChild(divElement);
        });

}

// 執行 getData() 以獲取資料並更新圖片
getData();


