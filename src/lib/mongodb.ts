import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 중 핫리로드 때마다 연결이 새로 생기지 않도록 전역에 보관
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export const DB_NAME = process.env.MONGODB_DB ?? "linknamu";
