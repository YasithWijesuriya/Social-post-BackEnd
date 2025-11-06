import { createGalleryItem, getGalleryItems, deleteGalleryItem,getSignedGalleryImageUrl } from "../application/Gallery.js";
import express from "express";
const galleryRouter = express.Router();

galleryRouter.route("/")
.post(createGalleryItem)
.get( getGalleryItems);
galleryRouter.route("/:id")
.delete(deleteGalleryItem)
galleryRouter.route("/images")
.post( getSignedGalleryImageUrl);

export default galleryRouter;
 