// src/types/prebook.ts
export interface PrebookRequest {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  mode: "wholesale" | "retail";
  quantity: number;
  message?: string;
  status: "pending" | "contacted" | "confirmed";
  createdAt: Date;
}

export interface PrebookFormData {
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  mode: "wholesale" | "retail";
  quantity: number;
  message?: string;
}
