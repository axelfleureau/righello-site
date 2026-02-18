export const thumbnailMap: Record<string, string> = {
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_6534.mp4?alt=media&token=946280ac-3891-4a87-989a-d2804ad61080": "/thumbnails/thumb-c20222776a18.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8017.mp4?alt=media&token=0f46ee6d-5bcd-4bfc-b341-eb41aae609d1": "/thumbnails/thumb-be743295f416.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8537.mp4?alt=media&token=029ac90a-7f59-4577-9066-b22594257f31": "/thumbnails/thumb-0ff41fc20196.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8682.mp4?alt=media&token=a4376902-a831-4804-9817-cc6d5ce3cac2": "/thumbnails/thumb-d5090f6b247c.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/caterina_4.mp4?alt=media&token=82ca60f4-1a84-4682-9e90-c65a50421daa": "/thumbnails/thumb-c4a25a8e9b3d.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/ricci_scuolasci.mp4?alt=media&token=1456b789-c161-45e2-9414-23074ce7fd53": "/thumbnails/thumb-867948b42ce0.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/3r_fast_replace.mp4?alt=media&token=def7dcaa-231d-42ff-bf40-9ffef861a6ba": "/thumbnails/thumb-2794f24022e5.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/vendemmioPOCOvolentieri.mp4?alt=media&token=76867423-5c67-4676-ae0e-a151d3e56325": "/thumbnails/thumb-f89791b0c4c7.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/neura_final.mp4?alt=media&token=27642e9f-c14b-49eb-b8e3-e802f4abdcb4": "/thumbnails/thumb-d21d67febb70.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/copy_18236D6E-2553-4BF8-AC9F-112535ECB0E6%201.MOV?alt=media&token=3f1905cf-a165-424e-83d2-dde3b8c7841c": "/thumbnails/thumb-781bb2137745.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/MgGrill_1%201.mp4?alt=media&token=25f4eb3e-6b63-46de-916a-6eba1a9802a0": "/thumbnails/thumb-f41ba8250738.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/promo6dicembre%201.MOV?alt=media&token=96556913-1bc3-4e5d-9305-b62e64628f9a": "/thumbnails/thumb-fe97a7333488.jpg",
  "https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/quintodellaluna%201.mov?alt=media&token=9d2fea38-515a-44ee-b9d5-006fefdb7ada": "/thumbnails/thumb-6322be15ebae.jpg",
  "https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/viedo%20architetto.mp4?alt=media&token=a8a22a02-99d5-4d70-8991-654df9be3379": "/thumbnails/thumb-18c674dd5ccb.jpg",
  "https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/20.mp4?alt=media&token=5f0c2e7e-5086-4739-981e-b56083866e81": "/thumbnails/thumb-cd759b2f2273.jpg",
  "https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_1.mp4?alt=media&token=31325f81-6c72-4ae7-8b12-f9ab2d9a75ae": "/thumbnails/thumb-8424e05df0ca.jpg",
  "https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_2.mp4?alt=media&token=601d71c1-deac-41f5-b49a-68c986b700c6": "/thumbnails/thumb-ca926bab868e.jpg"
};

export function getThumbnailUrl(videoSrc: string): string {
  return thumbnailMap[videoSrc] || `/api/video-thumbnail?url=${encodeURIComponent(videoSrc)}`;
}
