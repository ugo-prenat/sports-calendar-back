import mongoose, { Document, Schema } from 'mongoose';
import { ISession } from '../models/sports.models';

interface ISessionModel extends Omit<ISession, 'id'>, Document {}

const SessionSchema = new Schema(
  {
    // eventId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
    sport: { type: String, required: true },
    championship: { type: String, required: true },
    regionalized: {
      en: {
        name: { type: String, required: true },
        shortName: { type: String }
      },
      fr: {
        name: { type: String },
        shortName: { type: String }
      }
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Session = mongoose.model<ISessionModel>('sessions', SessionSchema);
