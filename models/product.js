const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {type: String, required: [true, 'Name field is required']},
	price: {type: Number, required: [true, 'Price field is required']},
	featured: {type: Boolean, default: false},
	rating: {type: Number, default: 4.5},
	createdAt: {type: Date, default: Date.now()}, // company: {type: String, enum: ['ikea', 'liddy', 'caressa']}
	company: {
		type: String, enum: {
			values: ['ikea', 'liddy', 'caressa', 'marcos'], message: '{VALUE} is not valid'
		}
	}
});

module.exports = mongoose.model('Product', productSchema);