import serviceCaller from "./service-caller";

function extractPublicURL(url: string) {
  const parsedURL = new URL(url);
  return `${parsedURL.origin}${parsedURL.pathname}`;
}

export default async function uploadToS3(files: FileList, namespace: string) {
  if (!files) {
    return "";
  }

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], {
    type: file.type,
  });
  const signedURL = await serviceCaller("/s3/signed-url", {
    method: "GET",
    query: {
      fileName: file.name,
      fileType: file.type,
      namespace: namespace,
    },
  });

  const response = await fetch(signedURL.url, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": file.type,
    },
  });
  if (response.ok) {
    return extractPublicURL(signedURL.url);
  }
  throw new Error("Upload failed");
}
