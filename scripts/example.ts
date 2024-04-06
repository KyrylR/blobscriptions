import fs from "fs";
import path from "path";
import cbor from "cbor";
import { fromBlobs, parseGwei, toBlobs } from "viem";

import { kzg } from "./kzg";
import { client, publicClient } from "./client";

import * as dotenv from "dotenv";
dotenv.config();

function createBlobTransaction() {
  const imagePath = path.resolve(process.env.PATH_TO_FILE ?? "scripts/data/shark.gif");
  const imageData = fs.readFileSync(imagePath);

  const dataObject = {
    contentType: process.env.CONTENT_TYPE ?? "image/gif",
    content: imageData,
  };

  const cborData = cbor.encode(dataObject);
  const blobs = toBlobs({ data: cborData });

  // Ensure the blobs can be decoded
  cbor.decode(fromBlobs({ blobs: blobs }));

  return blobs;
}

async function sendBlobTransaction() {
  const blobs = createBlobTransaction();

  const hash = await client.sendTransaction({
    blobs,
    kzg,
    maxFeePerBlobGas: parseGwei("50"),
    to: process.env.BLOBSCRIPTION_OWNER as any,
    data: "0x646174613a3b72756c653d65736970362c", // data:;rule=esip6, <- metadata
  });

  console.log("Transaction hash:", hash);

  const transaction = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Transaction:", transaction);
}

sendBlobTransaction()
  .then(() => {
    console.log("Transaction sent");
  })
  .catch((error) => {
    console.error("Error sending transaction:", error);
  });
