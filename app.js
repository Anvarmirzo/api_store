require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
const api = '/api/v1';
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// products route
app.use(`${api}/products`, productRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

(async () => {
	await connectDB();
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
})();

