import AWS from "aws-sdk";
// import env from "../../config/dev.json";
import { v4 } from "uuid";

const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");
const wasabi = new AWS.S3({
  endpoint: wasabiEndpoint,
  accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY
});

type Url = string;
export const getObjectUrl = (key: string) : Url => {
  const url = wasabi.getSignedUrl("getObject", {
    Bucket: process.env.WASABI_BUCKET_NAME,
    Key: key,
    Expires: 3600,
  });
  return url;
};

type Base64 = string;
type uploadParams = {
  content : Base64,
  contentType : string
}
export const uploadFile = async (params: uploadParams): Promise<{ key : string, location: string }> => {
    const data = await wasabi.upload({
      Bucket : process.env.WASABI_BUCKET_NAME,
      "Key": v4(),
      "Body" : Buffer.from(params.content),
      ContentEncoding: "base64",
      ContentType: params.contentType ?? "image/png"
    }).promise();
    return { key : data.Key, location: data.Location };
};

export default { instance : wasabi, getObjectUrl, uploadFile};
