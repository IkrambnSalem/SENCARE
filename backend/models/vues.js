const mongoose = require('mongoose');

const vueSchema = mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Vue = mongoose.model('Vue', vueSchema);

module.exports = Vue;
