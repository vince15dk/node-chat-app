[{
    id: 'ss',
    name: 'sj',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter(user=>user.id !== id);
        }
        return user;
        // return user that was removed
    }

    getUser (id){
       return this.users.filter((user)=> user.id === id)[0];
    }

    getUserList (room){
        const users = this.users.filter((user)=>user.room === room);
        const namesArray = users.map((user)=>user.name);
        
        return namesArray;
    }
}

module.exports = {Users};