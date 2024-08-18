import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  postedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export const UserModel = mongoose.model("User", UserSchema);

//NOTE:  User Actions

//NOTE: Register user:
export const register_user = (value: Record<string, any>) =>
  UserModel.create(value);

//NOTE: get a user by their email:

export const get_user_by_email = (email: string) =>
  UserModel.findOne({ email });

//NOTE: get a user by their id:
export const get_user_by_id = (id: string) => UserModel.findById(id);

//NOTE: Get a user by their username:
export const get_user_by_username = (username: string) =>
  UserModel.findOne({ username });

//NOTE: Delete a user by their id:
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

//NOTE: Update a user by their id:
export const updateUserById = (id: string, value: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, value);
