var mongoose = require('mongoose');

// creating schema
var vacationSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  priceInCents: Number,
  tags: [String],
  inSeason: Boolean,
  available: Boolean,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
  packagesSold: Number,
});

// creating methods
// define Methods BEFORE creating MODEL
vacationSchema.methods.getDisplayPrice = function() {
  return '$' + (this.priceInCents / 100).toFixed(2);
};

// creating model using mongoose.model
var Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
