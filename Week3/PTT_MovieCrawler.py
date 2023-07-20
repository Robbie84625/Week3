import urllib.request as req
import json
import csv
import re

def getData(url):
    
    MyHeader={"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 Edg/114.0.1823.67"}
    request=req.Request(url,headers=MyHeader)
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")

    import bs4
    root=bs4.BeautifulSoup(data, 'html.parser')
    titles=root.find_all("div",class_="title")#尋找所有class="title"的div標籤
    tweets=root.find_all("div",class_="nrec")
    

    writer=csv.writer(file)
    for title,number in zip(titles,tweets):
        if title.a !=None:#如果標題含有a標籤(沒有被刪除)，印出來
            titleLink="https://www.ptt.cc"+title.a.get("href")
            title_request = req.Request(titleLink, headers = MyHeader)
            with req.urlopen(title_request) as response:
                titleData = response.read().decode("utf-8")
            
            titleRoot = bs4.BeautifulSoup(titleData,"html.parser")
            header=titleRoot.find_all('span','article-meta-value')
            writer.writerow([title.a.string,number.text,header[3].text])
# 抓上一頁的連結
    nextLink=root.find("a",string="‹ 上頁")
    return "https://www.ptt.cc"+nextLink["href"]

PageURL="https://www.ptt.cc/bbs/movie/index.html"
count=0
with open("movie.txt",mode="w",newline="",encoding="utf-8") as file:
    while count< 3:
        PageURL=getData(PageURL)
        count+=1


