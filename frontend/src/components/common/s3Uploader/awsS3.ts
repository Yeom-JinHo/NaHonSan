import AWS from "aws-sdk";
import { v1 } from "uuid";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
});

export const uploadFile = (file: File) => {
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: process.env.REACT_APP_AWS_BUCKET as string,
      Key: `${v1()}.png`,
      Body: file
    }
  });
  const promise = upload.promise();

  return promise.then(res => res.Location);
};

export const deleteFile = (url: string) => {
  const fileUrl = url.split("amazonaws.com/").pop();
  const del = new AWS.S3();
  del.deleteObject(
    {
      Bucket: process.env.REACT_APP_AWS_BUCKET as string,
      Key: fileUrl as string
    },
    function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }
  );
};

export default {};
