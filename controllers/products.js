const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json({count: products.length, products});
};

const getAllProducts = async (req, res) => {
	const {featured, company, name, sort, fields, numericFilters} = req.query;
	const query = {};

	if (featured) query.featured = featured === 'true';
	if (company) query.company = {$regex: company, $options: 'i'};
	if (name) query.name = {$regex: name, $options: 'i'};

	if (numericFilters) {
		const operatorMap = {
			'<': '$lt', '<=': '$lte', '=': '$eq', '>': '$gt', '>=': '$gte'
		};
		const regex = /\b(<|<=|=|>|>=)\b/g;
		let filters = numericFilters.replace(regex, (match) => `-${operatorMap[match]}-`);
		const options = ['price', 'rating'];
		filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) query[field] = {[operator]: +value};
		});
	}

	let result = Product.find(query);

	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}

	const page = +req.query.page || 1;
	const limit = +req.query.limit || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({count: products.length, products});
};

module.exports = {
	getAllProductsStatic, getAllProducts
};