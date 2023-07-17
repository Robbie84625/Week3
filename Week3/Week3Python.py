import urllib.request as req
import json
import csv
import re
url="https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
request=req.Request(url)
with req.urlopen(request) as response:
    data = response.read().decode("utf-8")

# 解析json檔
data=json.loads(data)
mrt_list=[]
with open("attraction.csv",mode="w",newline="",encoding="utf-8") as file:
    writer=csv.writer(file)
    for detail in data['result']['results']:
        # 使用正則表達式找出所有的'xx區'
        district = re.search(r'(.{2})區', detail['address'])
        # 使用正則表達式找出所有的URL，以jpg或JPG結尾
        urls = re.findall(r'https?://[^\s]*?\.jpg', detail['file'], re.IGNORECASE)
        mrt_list.append([detail['MRT'],detail['stitle']])
        writer.writerow([detail['stitle'],district.group(),detail['longitude'],detail['latitude'], urls[0]])

grouped_mrt = {}
for item in mrt_list:
    key = item[0]
    if key not in grouped_mrt and key!=None:
        grouped_mrt[key] = []
    elif key==None:
        continue
    grouped_mrt[key].extend(item[1:])


with open("mrt.csv",mode="w",newline="",encoding="utf-8") as file:
    writer=csv.writer(file)    
    for key in grouped_mrt:
        writer.writerow([key] + grouped_mrt[key])