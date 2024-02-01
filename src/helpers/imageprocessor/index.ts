import request from "request";
import gm from "gm";

export const getMetadata = async (url: string) : Promise<gm.ImageInfo>=> {
  return new Promise((resolve, reject) => {
    const imageUrl = request(url);
    gm(imageUrl).identify((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


export default { getMetadata };