
# `The Secret Place`

<image src="images/collab.png" width=500>

## Socket.io application
웹소켓으로 구현한 대화 및 위치 공유 방

Deploying app on heroku is completed
(Mocha testing module is also added)

Testing the app on local /3000

* This application is intended to utilize Socket.io only for making the secret chat service
* A user inserts its use name and a secret codename
* Thes same codename leads users directly to the same chatting room (impl of socket.join and constraints of io.to(room))
* Google geolocation API is implemented to share the location of users in live

Enjoy!

### Intall npm dependencies 
```bash
npm install
```

### Run testing with Mocha 
```bash
npm run test-watch
```

### Start the application
```bash
npm start
```

Heroku URL 
https://afternoon-sierra-43783.herokuapp.com/







