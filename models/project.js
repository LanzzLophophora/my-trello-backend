const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  projectTitle: { type: String, trim: true, default: 'Default  Project Title' },
  userId: { type: String, required: true },
  lists: []
});

module.exports = mongoose.model('Project', ProjectSchema);
