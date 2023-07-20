// 獲取資料並更新圖片的函數
function getData() 
{
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json").then(function(response)
    {
        return response.json()
        }).then(function(data)
        {
        let attractions={}

        for (const detail of data['result']['results']) 
        {
            // 使用正規表達式找出所有的URL，以jpg或JPG結尾
            const urls = detail['file'].match(/https?:\/\/[^\s]*?\.jpg/ig);
            //aa[detail['stitle']] = urls[0];
            attractions[detail['stitle']]=urls[0]
        }
        let three_img = document.querySelectorAll('.three_img');

        three_img.forEach(function(div, index) 
        {
            let key = Object.keys(attractions)[index];

            let imgURL = attractions[key];

            // 創建一个新的 <img> 元素
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', imgURL);
            imgElement.setAttribute('id', 'three_img'); 


            // 創建一个新的 <span> 元素
            let spanElement = document.createElement('span');
            spanElement.textContent = key;

            // 將圖片和景點放入<div>中
            div.appendChild(imgElement);
            div.appendChild(spanElement);
        });

        let sixteen_img = document.querySelectorAll('.sixteen_img');
        sixteen_img.forEach(function(div, index) 
        {
            let key = Object.keys(attractions)[index+3];
            let imgURL = attractions[key];

            // 创建一个新的 <img> 元素
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', imgURL);
            imgElement.setAttribute('class', 'sixteenImg'); 
            
            

            // 创建一个新的 <span> 元素
            let divElement = document.createElement('div');
            divElement.textContent = key;
            divElement.setAttribute('id', 'text')

            // 將圖片和景點放入<div>中
            div.appendChild(imgElement);
            div.appendChild(divElement);
        });
        
        let btn = document.getElementsByClassName('btn')[0];
        let btnClickCount = 0;
        let remaining =  Object.keys(attractions).length-15;
        btn.onclick = function() 
        {
            let sixteen_sheet = document.getElementsByClassName('sixteen_sheet')[0];
            let startIndex = 15 + 12 * btnClickCount;

            console.log(remaining)
            for(let i=0;i<12;i++)
            {  
                
                if(remaining <= 0)
                {
                    break;
                }
                
                let index = startIndex + i;
                let key = Object.keys(attractions)[index];
                let imgURL = attractions[key];
                let divWrapper = document.createElement('div');
                divWrapper.setAttribute('class', 'sixteen_img'); 

                let imgElement = document.createElement('img');
                imgElement.setAttribute('src', imgURL);
                imgElement.setAttribute('class', 'sixteenImg'); 

                let divElement = document.createElement('div');
                divElement.textContent = key;
                divElement.setAttribute('id', 'text')

                divWrapper.appendChild(imgElement);
                divWrapper.appendChild(divElement);
                sixteen_sheet.appendChild(divWrapper);

                remaining--;
            }
            // 每次按鈕被按下後，計數器增加
            btnClickCount++;
        };
        
    });
}


// 執行 getData() 以獲取資料並更新圖片
getData();



