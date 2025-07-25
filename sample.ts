// 📚 Books (TTL: 5–15 minutes):
// Endpoint	Key	TTL (sec)
// GET /books	books:all	900
// GET /books/:id	book:<id>	900
// GET /books/top-rated	books:top-rated	900
// GET /books?genre=:genreId	books:genre:<genreId>	900

// ✍️ Reviews (TTL: 2–5 minutes, clear on update):
// Endpoint	Key	TTL (sec)
// GET /books/:bookId/reviews	reviews:book:<bookId>	300
// GET /books/:bookId/average-rating	rating:book:<bookId>:average	300

// 👤 Users (Public profile - 10–30 minutes):
// Endpoint	Key	TTL (sec)
// GET /users/:id	user:<id>	1800

// docker system prune -a --volumes
// docker-compose down -v
// docker-compose up --build
// docker-compose down -v --remove-orphans
// docker-compose up -d

