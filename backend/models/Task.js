import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

// Using standard text for simple variables: timestamps = true
export default model('Task', TaskSchema);