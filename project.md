<!-- folder structure
-Model->  class
-repository (db) -> abstract class (inMemory - mongodb)
-controller -> js logic for the routes (usually one liner + validation)
-routes -> req res related logic (invoke controller)
* (dry) for the route name & middleware
-middleware (isAuthenticated) should apply to all routes except /auth
-utils -> verifyToken()
-mongoose schema (inside /repository/mongodb)
? how to pass the data from middleware to functions
<!-- abstract crud users -->

-->

- Rename classes inside repository/inmemory to be directly chat.ts, user.ts etc..., same with mongoChat.ts => chat.ts, same mongoDBConnection => mongoDb
- db env var is not needed
- inMemoryMessageRepository => messageRepository
- "/auth" => "/"
- routes names should be all either singular or plural, convention leans towards model naming (singular) but still optional.
- lets create /middleware(s) folder with isAuthenticated and errorHandler inside
- AuthenticatedRequest is not needed, same as `req.user = `
- Since we only use the id from the app.locals, we can change user => userId (same with the value)
- in all repository's functions, take care not to return more than you need (ex: password)
- chatId.toString() => chatId
- POST /messages (we dont need to send senderId)
- GET /chat/:id => /chatr/:userId",
- PUT /chat/:id we can change the functions here to be updateChatUsers => on a second thought, it can be removed :D
- UserController => getUsers: when can we have the `if (!users)` ? since it's always an array , same for getUserById
- vertical spacing between functions inside classes
- incase of user not found in delete/put/get, error should be from the repository level (since it didn't do the function's job correctly)
- message.setId(generateRandomNumber(10)) should be in the InmemoryRepo
- In general (for manual validation specifically) it's best practice to know where is the error exaclty
- getMessageById -> X

- Add return types for all function
