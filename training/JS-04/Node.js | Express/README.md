### Routes

* `/user` - *GET* all users
* `/user/1` - *GET* user with id 1
* `/user/create` - (*POST*) create new user. 
    * in *POST* body: 
        * `name=UserName` or `{name: 'User Name'}`
* `/user/delete/1` - *DELETE* user with id 1