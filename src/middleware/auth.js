const jwt = require("jsonwebtoken");

function auth(request, response, next) {
  // Get the token from the authorization header
  // bearer token format: `Bearer`
  let token = request.get("authorization");
  token = token?.split(" ")?.[1];
  // Check if token exists
  if (!token) {
    return response.status(401).json({ data: "Unauthenticated" });
  }
  // Verify the token using the secret key
  try {
    const payload = jwt.verify(token, "secret");
    request.userId = payload.id;
    next();
  } catch (err) {
    console.log(err);
    return response.status(401).json({ data: "Unauthenticated" });
  }
  // Put the payload(id) in the request for other functions to use
}

module.exports = auth;
