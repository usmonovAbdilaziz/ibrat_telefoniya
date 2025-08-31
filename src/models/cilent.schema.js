import { Schema, Types, model } from "mongoose";

const cilentSchema = new Schema(
  {
    full_name: { type: String },
    phone_number: { type: String, required: true },
    email: { type: String },
    from_lead: { type: Types.ObjectId, ref: "Lead" }, // qaysi leaddan chiqqan
    assigned_to: { type: Types.ObjectId, ref: "User" }, // operator/admin
    address: { type: String,required:true },
  },
  { timestamps: true }
);

const Cilent = model("Cilent", cilentSchema);
export default Cilent;
