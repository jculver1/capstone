# capstone

Problem Statement

Just 1 in 10 adults meet the federal recommendations for fruit and vegetable consumption. 
This application will allow the user to check the nutrition status of foods by conveniently taking a photo of the item.


Please note, everything in pink is a stretch goal (in the ERD and Wireframe). 

ERD:
https://drive.google.com/file/d/1xFrq7y9HUhuC13e6CNbLfcb-wCd_TeXI/view?usp=sharing

Wireframes:
https://drive.google.com/open?id=1f1dP_QYixQF10mmwGFPeXNRjG8Dv028J

Trello:
https://trello.com/invite/b/1jamE5WS/6a5107f64354eb53855fd8675ddea118/capstone

Tech used:
1. React Native
1. PSQL
1. Node.js
1. Express
1. Tensorflow.js
    1. Object detection
    1. Tensorflow light
    1. React-Native TensorFlow
        1. Need CocoaPods and Xcode
1. USDA API

Color palette:
1. #EE4266 PARADISE PINK
1. #007DFF Dark Blue
1. #A9A9A9 Light Gray
1. #FFFE9F Light Yellow
1. #404040 Dark Gray

1. Colors: ![alt text](https://www.colorhexa.com/ee4266.png) ![alt text](https://www.colorhexa.com/007dff.png) ![alt text](https://www.colorhexa.com/a9a9a9.png) ![alt text](https://www.colorhexa.com/fffe9f.png) ![alt text](hhttps://www.colorhexa.com/404040.png)    



Server Side:
1. Get request from food_items table return USDA_id
1. Get request from nutrients table return daily value 
1. stretch goals:
    1. post request to user_intake. Send list of all nutrients to the table.
    1. get request from user_intake join food_items.id and join nutrients.id. Return food name, nutrient name, and quanity where data_stamp is equal to current date. 

