import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const dbConnect = () => {
  const mongoUri = process.env.MONGO_URI || '';

  mongoose.set('strictQuery', true);
  mongoose
    .connect(mongoUri, {
      retryWrites: true,
      w: 'majority'
    })
    .then(() => console.log('🏎️  connected to MongoDB\n'))
    .catch((err) => {
      console.log('error connecting to MongoDB');
      console.log(err);
    });
};
