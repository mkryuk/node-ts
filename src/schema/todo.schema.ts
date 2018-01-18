import { Schema } from 'mongoose';
export let todoSchema: Schema = new Schema({
  completed: Boolean,
  title: String,
  userId: String,
});
