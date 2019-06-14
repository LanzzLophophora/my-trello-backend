const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
  cardTitle: {type: String, trim: true, default: 'Default Card Title'},
  listId: {type: String, required: true},
});

const ListSchema = new Schema({
  listTitle: {type: String, trim: true, default: 'Default List Title'},
  cardList: [CardSchema]
});

const ProjectSchema = new Schema({
  projectTitle: {type: String, trim: true, default: 'Default  Project Title'},
  userId: {type: String, required: true},
  lists: [ListSchema],
});

module.exports =  mongoose.model('Project', ProjectSchema);
