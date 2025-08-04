import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
     },
  title: { 
    type: String, 
    required: true
 },
  date: { 
    type: Date,
     required: true 
    },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      done: { type: Boolean, default: false },
      note: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('Workout', workoutSchema);
