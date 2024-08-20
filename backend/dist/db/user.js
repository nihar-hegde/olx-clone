"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postedProductUpdate = exports.updateUserById = exports.deleteUserById = exports.getUserByUsername = exports.getUserById = exports.getUserByEmail = exports.registerUser = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    postedProducts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
    purchasedProducts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
//NOTE:  User Actions
//NOTE: Register user:
const registerUser = (value) => exports.UserModel.create(value);
exports.registerUser = registerUser;
//NOTE: get a user by their email:
const getUserByEmail = (email) => exports.UserModel.findOne({ email }).select("+password");
exports.getUserByEmail = getUserByEmail;
//NOTE: get a user by their id:
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
//NOTE: Get a user by their username:
const getUserByUsername = (username) => exports.UserModel.findOne({ username });
exports.getUserByUsername = getUserByUsername;
//NOTE: Delete a user by their id:
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
//NOTE: Update a user by their id:
const updateUserById = (id, value) => exports.UserModel.findByIdAndUpdate(id, value);
exports.updateUserById = updateUserById;
const postedProductUpdate = (id, productId) => exports.UserModel.findByIdAndUpdate(id, {
    $push: { postedProducts: productId },
});
exports.postedProductUpdate = postedProductUpdate;
