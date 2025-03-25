Чтобы запустить локальный сервер через npm, необходимо:

Установить Node.js и npm. 
Скачать последнюю стабильную версию для операционной системы можно на официальном сайте Node.js.
Создать папку проекта. Например, mkdir my-project и перейти в неё с помощью cd my-project.
Инициализировать проект Node.js. Для этого нужно запустить npm init -y. Эта команда создаст файл package.json с базовыми настройками.

Далее нужно добавить пару пакетов (express, jsonwebtoken) в package.json и запускать сервер:
вот мой измененный packadge.json:

{
  "name": "express-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

После правки своего packadge делаем установку командой: npm install
Зауск сервера: node index.js
В консоли покажется адрес сервера
если перейти по нему с добавлением /test (http://localhost:3000/test) то увидим хеловорд

-
**Авторизация**:
POST
http://localhost:3000/login
Body (raw (json))
json:
{
  "username": "Mario",
  "password": "Nintendo"
}

Example (curl):
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data '{
  "username": "john",
  "password": "pass"
}'

Response body (json):
json:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3NDI4NTExNzJ9.75BNn8wbZF0FIkub0S4Qr5CRcyGpvnwlnm5X8y_rV9Y"
}

**Запрос данных:**
GET
http://localhost:3000/mygames

Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmlvIiwiaWF0IjoxNzQyODk2NjQ5fQ.RcKtatWyrYVUliC-Dy_R-vBEipIR7QyBZaoaDSZ_Mr0

Example (curl):
curl --location 'http://localhost:3000/mygames' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmlvIiwiaWF0IjoxNzQyODk2NjQ5fQ.RcKtatWyrYVUliC-Dy_R-vBEipIR7QyBZaoaDSZ_Mr0'

Response body (json):
jsons array:
[
    {
        "name": "Zelda TOK",
        "gametimeseconds": 457436
    },
    {
        "name": "Splatun X",
        "gametimeseconds": 657568
    },
    {
        "name": "Animal Crossing",
        "gametimeseconds": -357
    }
]

