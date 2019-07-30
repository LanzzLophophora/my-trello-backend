const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
  _id: { type: String, required: true },
  cardTitle: { type: String, trim: true, default: 'Default Card Title' },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'ListSchema'
  }
});

const ListSchema = new Schema({
  listTitle: { type: String, trim: true, default: 'Default List Title' },
  cardList: [CardSchema],
  projectId: { type: String, required: true }
});

module.exports = mongoose.model('List', ListSchema);
