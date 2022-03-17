require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/Product');

const jsonProducts = require('./products.json');

(async () => {
	try {
		await connectDB();
		await Product.deleteMany();
		const products = await Product.create(jsonProducts);
		if (products.length) console.log('Data inserted successfully');
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
})();
