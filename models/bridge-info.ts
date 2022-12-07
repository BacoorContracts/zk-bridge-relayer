import mongoose from "mongoose";

const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

export interface IBridgeInfo {
  commitment: string;
  token: string;
  value: string;
  fee: string;
  relayer: string;
}

const Model = new Schema(
  {
    commitment: { type: String, index: true, unique: true },
    token: { type: String },
    value: { type: String },
    fee: { type: String },
    relayer: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BridgeInfo = mongoose.model("bridge-info", Model);
