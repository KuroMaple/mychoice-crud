import api from "@/util/api";

export interface Item {
  id: number;
  name: string;
  group: "Primary" | "Secondary";
  created_at: string;
  updated_at: string;
}

// GET all items
export const fetchItems = async (): Promise<Item[]> => {
  const response = await api.get("/items/");
  return response.data;
};

// POST new item
export const createItem = async (item: Partial<Item>): Promise<Item> => {
  const response = await api.post("/items/", item);
  return response.data;
};

// GET item by ID
export const getItem = async (id: number): Promise<Item> => {
  const response = await api.get(`/items/${id}/`);
  return response.data;
};

// PATCH item
export const updateItem = async (id: number, item: Partial<Item>): Promise<Item> => {
  const response = await api.patch(`/items/${id}/`, item);
  return response.data;
};
