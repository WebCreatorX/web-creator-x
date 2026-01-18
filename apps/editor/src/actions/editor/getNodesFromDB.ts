"use server";

import { WcxNode } from "types";

const BASE_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

export default async function getNodesFromDB(
  pageId: number,
): Promise<WcxNode[]> {
  try {
    const res = await fetch(`${BASE_URL}/nodes?page_id=${pageId}`, {
      cache: "no-store", //FIXME-캐시 설정을 Tag기반으로 수정해야함!!
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch nodes from JSON-Server:${res.status}`);
    }

    const data = await res.json();

    return data as WcxNode[];
  } catch (error) {
    console.error("❌ Error fetching nodes:", error);
    return [];
  }
}
