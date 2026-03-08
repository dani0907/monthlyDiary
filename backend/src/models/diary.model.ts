import mongoose, { Schema } from 'mongoose';

const DiarySchema = new Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: [{ type: String }]
}, {
  timestamps: true  // createdAt, updatedAt 자동 추가
});

export const DiaryModel = mongoose.model('Diary', DiarySchema);