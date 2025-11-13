// src/utils/cloudinaryUpload.js
export default async function uploadToCloudinary(file) {
  const cloud_name = "ds8jfvgu2";     
  const upload_preset = "muk6x381";    

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url;        
}
