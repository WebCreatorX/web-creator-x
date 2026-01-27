import { WcxNode } from "@repo/ui/types/nodes";

export interface ComponentRecordRequest {
  page_id: string | number;
  type: WcxNode['type'];
  parent_id: string | null;
  position: number;
}

export interface ComponentRecordResponse extends ComponentRecordRequest {
  id: string;
  created_at: string;
}
