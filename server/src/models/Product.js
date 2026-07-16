import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
    },

    pricing: {
      mrp: {
        type: Number,
        required: true,
        min: 0,
      },

      sellingPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      discountPrice: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockAlert: {
      type: Number,
      default: 5,
    },

    images: {
      type: [imageSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
