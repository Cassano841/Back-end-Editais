const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EditalSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    label: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    checked: {
        type: Boolean
    },
    etapas: {
        type: Array,
        default: [Date]
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Editais', EditalSchema)