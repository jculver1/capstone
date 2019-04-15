# Capstone - Eatit

Problem Statement

Just 1 in 10 adults meet the federal recommendations for fruit and vegetable consumption. Research has shown that having visual aids during nutrition education can have a positive effect on individuals who are looking to make healthier choices. This application will allow the user to check the nutrition status of foods by conveniently taking a photo of the item.

Please note, everything in pink is a stretch goal (in the ERD). 
ERD:
https://drive.google.com/file/d/1xFrq7y9HUhuC13e6CNbLfcb-wCd_TeXI/view?usp=sharing

Wireframes:
https://www.justinmind.com/usernote/tests/39976685/39980508/39980510/index.html

Trello:
https://trello.com/invite/b/1jamE5WS/6a5107f64354eb53855fd8675ddea118/capstone

Github link to backend: 
https://github.com/jculver1/capstone_backend

Tech used:
1. React Native
1. PSQL
1. Node.js
1. Express
1. Clarifai API
1. USDA API

Color palette:
1. #EE4266 PARADISE PINK
1. #404040 DARK GRAY
1. #00CC99 CARIBBEAN GREEN

![alt text](https://www.colorhexa.com/ee4266.png) 
![alt text](https://www.colorhexa.com/404040.png)
![alt text](https://www.colorhexa.com/00CC99.png)



Server Side:
1. Get request from food_items table return USDA_id
1. Get request from nutrients table return daily value 
1. stretch goals:
    1. post request to user_intake. Send list of all nutrients to the table.
    1. get request from user_intake join food_items.id and join nutrients.id. Return food name, nutrient name, and quanity where data_stamp is equal to current date. 

