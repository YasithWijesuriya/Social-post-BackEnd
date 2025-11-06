import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String, 
    required: true 
  }],
  createdAt: { 
    type: Date,   
    default: Date.now 
  },
  createdBy: {
    id: String,
    name: String,
    email: String,
    imageUrl: String,
  }
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;


