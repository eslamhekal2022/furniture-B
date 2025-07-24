import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(

    {
    name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },

  description: {
    en: { type: String },
    ar: { type: String },
  },   
    
  category: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    isTrending: { type: Boolean, default: false },

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true }, 
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    averageRating: { type: Number, default: 0 }, 
  },
  { timestamps: true }

);
export const ProductModel = mongoose.model("Product", ProductSchema);
