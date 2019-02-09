
# `The Secret Place`

## Socket.io application (Serverless)
웹소켓으로 구현한 대화 및 위치 공유 방

Deploying app on heroku is completed
(Mocha testing module is also embeded)

Being able to test on local port 3000

* This application is intended to utilize Socket.io only for creating the secret chat service
* A user inserts its name and codename previously informed in advance
* Thes same codename among users leads them directly to the same chatting room (implemantation of socket.join and constraints of io.to(room))
* Google geolocation API is implemented to share the location of users in live



### Intall npm dependencies 
```bash
npm install
```

### Run testing with Mocah 
```bash
npm run test-watch
```

### Start the application
```bash
npm start
```

Heroku URL 
https://afternoon-sierra-43783.herokuapp.com/







