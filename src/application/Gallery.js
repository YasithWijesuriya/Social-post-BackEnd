import Gallery from "../infrastructure/DB/entities/Gallery.js"
import { CreateGalleryDTO } from "../domain/DTO/Gallery.js"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import S3 from "../infrastructure/s3.js";




const createGalleryItem = async (req, res) => {
  try {
    
    const parsed = CreateGalleryDTO.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: parsed.error.format(),
      });
    }
 
    const { description, images,createdBy } = parsed.data;
    console.log("Received gallery payload:", parsed.data);

    const galleryItem = await Gallery.create({
      description,
      images,
      createdAt: new Date(),
      createdBy 
    });

    res.status(201).json(galleryItem);
    console.log("Saved gallery item:", galleryItem);
  } catch (error) {
  console.error("Failed to create gallery item:", error);
  res.status(500).json({ message: "Failed to create gallery item", error: error.message });
}
};


const getGalleryItems = async (req,res) => {
  try {
    const galleryItems = await Gallery.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json(galleryItems);
    console.log( galleryItems)
  } catch (error) {
    console.log(error);
  }
};


const deleteGalleryItem = async (req,res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Gallery.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
}; 

       
const getSignedGalleryImageUrl = async (req,res) => {

  try {
    const { fileType } = req.body;
    if (!fileType) {
      return res.status(400).json({ message: "fileType is required" });
    }
          console.log("Generating signed URL with:", {
      bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      accessKey: process.env.CLOUDFLARE_ACCESS_KEY_ID?.slice(0, 4) + "...",
      fileType
    });
    const ext = fileType.split("/")[1] || "jpg";
    const key = `gallery/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(S3, command, { expiresIn: 60 });
    const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${key}`;

    res.json({ url, publicUrl });
  } catch (error) {
      console.error("Error generating signed URL:", error);
      return res.status(500).json({ message: "Failed to generate signed URL", error: error.message });
  }
};

export { createGalleryItem, getGalleryItems, deleteGalleryItem, getSignedGalleryImageUrl };
 