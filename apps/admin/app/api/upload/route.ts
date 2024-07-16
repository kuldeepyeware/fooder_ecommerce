/* eslint-disable turbo/no-undeclared-env-vars */
import { NextResponse, type NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(request: NextRequest) {
  const accessKeyId = process.env.AWS_S3_KEY_ID;
  const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
  const s3Region = process.env.AWS_S3_REGION;
  if (!accessKeyId || !secretAccessKey || !s3BucketName || !s3Region) {
    return new Response(null, { status: 500 });
  }
  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get("fileName");
  const contentType = searchParams.get("contentType");
  if (!fileName || !contentType) {
    return new Response(null, { status: 500 });
  }
  const client = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: fileName,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  if (signedUrl) return NextResponse.json({ signedUrl });
  return new Response(null, { status: 500 });
}
