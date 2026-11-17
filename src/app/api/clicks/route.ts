import { NextResponse } from "next/server";
import { getMongoClient, DB_NAME } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const validIds = new Set(profile.links.map((l) => l.id));

// 링크 클릭 1회 기록
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const client = await clientPromise;
    await client
      .db(DB_NAME)
      .collection("clicks")
      .updateOne(
        { linkId },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection("clicks")
      .find({}, { projection: { _id: 0, linkId: 1, count: 1 } })
      .toArray();
    return NextResponse.json({ clicks: docs });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "조회에 실패했습니다." }, { status: 500 });
  }
}
