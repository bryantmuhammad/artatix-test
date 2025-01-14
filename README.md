

# ARTATIX TESTING API



## ⚡Quick Start

Download and Install [NodeJS](https://nodejs.org/en/download) and [Mysql](https://www.mysql.com/downloads/)

1. Install App
    ```bash
    npm run build
    ```
2. Start App

    ```bash
    npm run start
    ```
3. Dev Mode

    ```bash
    npm run dev
    ```

## 🌱 Env Variables

Copy .env.example to .env example below here: 
```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=artatix-test
DATABSE_PASSWORD=
DATABASE_USER=root
```
## 📖 API Reference
## Auth
#### Credentials
```
E-mail   : user@gmail.com
Password : password
```


#### Login

```
  POST http://localhost:8080/login
```

| Body        | Type     | Description                                                              |
| :---------- | :------- | :----------------------------------------------------------------------- |
| `email`   | `string` | **Required**. Email : user@gmail.com                              |
| `password`        | `string` | **Required**. Password : password |

##### Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE3MzY3NTM2OTIsImV4cCI6MTczNzYxNzY5Mn0.Lpccfm0jkx7ZLsPJ80_R-ySvhTiRIUEgFcKoIYu9a6I"
}
```
----

## Talent
#### Get all talent
```
  POST http://localhost:8080/talent
```

| Header | Description                                                              |
| :---------- | :-------------------------------------------------------------------|
| `Authorization`  | **Required**. Token from login action                          |

##### Response
```
{
    "talents": [
        {
            "id": 4,
            "name": "new talent",
            "image": "image/2025-01-13T16-27-47.833Z-pexels-evg-kowalievska-1170986.jpg",
            "isActive": 0
        }
    ]
}
```
----------------
#### Get one talent
```
  POST http://localhost:8080/talent/:id
```

| Header | Description                                                              |
| :---------- | :-------------------------------------------------------------------|
| `Authorization`  | **Required**. Token from login action                          |

##### Response
```

{
    "message": "Success",
    "data": {
        "id": 4,
        "name": "new talent",
        "image": "image/2025-01-13T16-27-47.833Z-pexels-evg-kowalievska-1170986.jpg",
        "isActive": 0
    }
}
```
----------------
#### Post talent
```
  POST http://localhost:8080/talent
```
| Header | Description                                                              |
| :---------- | :-------------------------------------------------------------------|
| `Authorization`  | **Required**. Token from login action                          |

| Form-data        | Type     | Description                                                              |
| :---------- | :------- | :----------------------------------------------------------------------- |
| `name`   | `string` | **Required**. Talent name                               |
| `image`        | `File` | **Required**. Talent image : 2MB [png,jpg,jpeg] |

##### Response
```
{
    "message": "upload success",
    "data": {
        "id": 4,
        "name": "new talent",
        "image": "image/2025-01-13T16-27-47.833Z-pexels-evg-kowalievska-1170986.jpg",
        "isActive": 0
    }
}
```
----------------
#### Update talent
```
  PUT http://localhost:8080/:id
```
| Header | Description                                                              |
| :---------- | :-------------------------------------------------------------------|
| `Authorization`  | **Required**. Token from login action                          |

| Form-data        | Type     | Description                                                              |
| :---------- | :------- | :----------------------------------------------------------------------- |
| `name`   | `string` | **Optional**. Talent name                               |
| `image`        | `File` | **Optional**. Talent image : 2MB [png,jpg,jpeg] |
| `isActive`        | `smalint` | **Optional**. isActive : 1 or 0 |

##### Response
```
{
    "message": "Talent has been updated",
    "data": {
        "id": 4,
        "name": "new talent",
        "image": "image/2025-01-13T16-27-47.833Z-pexels-evg-kowalievska-1170986.jpg",
        "isActive": 0
    }
}
```
----------------
#### Update talent
```
  DELETE http://localhost:8080/:id
```

| Header | Description                                                              |
| :---------- | :-------------------------------------------------------------------|
| `Authorization`  | **Required**. Token from login action                          |

##### Response
```
{
    "message": "Talent has been deleted"
}
```