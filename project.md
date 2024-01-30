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
