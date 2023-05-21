import { api } from "./api";

type UploadUserPicture = {
  success: boolean;
  pictureUrl: string | null;
};

export async function uploadAvatar(
  picture: File,

): Promise<UploadUserPicture> {
  const formData = new FormData();
  formData.append("file", picture);
  const response = await api.post("/users/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  
  });

  if(response.data.success){
    return {
      ...response.data,
      success: true
    }
  }

  return {
   success: false,
   pictureUrl:null
  }

}