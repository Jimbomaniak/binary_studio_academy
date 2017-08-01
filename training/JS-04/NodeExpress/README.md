### Routes

Route | Method | BODY | Description
--- | :---: | :---: | ---
`/api/users` | GET | - | List all users
`/api/users/1` | GET | - | Get user with ID 1
`/api/users/create` | POST | {"nickname": "Wader"} | Create new user  
`/api/users/delete/1` | DELETE | - | Delete user with ID 1
`/api/users/1` | PATCH | {"nickname": "Yoda"} | Change user 1 nickname
`/api/users/chatterers/1` | GET | - | Get list of users that user 1 chatted with
`/api/messages` | GET | - | List all messages
`/api/messages/text/force` | GET | - | Get all messages that includes word 'force'
`/api/messages/create` | POST | {"senderId": 1, "receiverId": 2, "text": "May the force be with you..." | Create new message
`/api/messages/1` | PATCH | {"text": "Through force i get wisdom"} | Edit message 1 text
`/api/messages/1` | DELETE | - | Delete message with ID 1
