import mongoose, { Document, Query, Schema, Types } from 'mongoose';
import { IEvent, ISession } from '../models/sports.models';

export interface ISessionModel extends Omit<ISession, 'id'>, Document {}
export interface IEventModel extends Omit<IEvent, 'id'>, Document {}

export interface IAPISession extends ISessionModel {
  _id: Types.ObjectId;
}
export interface IAPIEvent extends IEventModel {
  _id: Types.ObjectId;
}

export type IMongooseSession = Document<unknown, {}, ISessionModel> &
  IAPISession;
export type IMongooseEvent = Document<unknown, {}, IEventModel> & IAPIEvent;

export type ISessionQuery<T extends string = 'find'> = Query<
  IMongooseSession[],
  IMongooseSession,
  {},
  ISessionModel,
  T
>;
export type IEventQuery<T extends string = 'find'> = Query<
  IMongooseEvent[],
  IMongooseEvent,
  {},
  IEventModel,
  T
>;

const SessionSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
    sport: { type: String, required: true },
    championship: { type: String, required: true },
    type: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  { versionKey: false, timestamps: false }
);

export const Session = mongoose.model<ISessionModel>('sessions', SessionSchema);

const EventSchema = new Schema(
  {
    sport: { type: String, required: true },
    championship: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
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
    country: {
      code: { type: String, required: true },
      flag: { type: String, required: true }
    },
    location: {
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
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      },
      track: { type: String }
    }
  },
  { versionKey: false, timestamps: false }
);

export const Event = mongoose.model<IEventModel>('events', EventSchema);
