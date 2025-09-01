import { toast } from "sonner";

// ======= Nested values for formik ===========
export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
export const getNestedErrors = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// ========== copy to clipboard ========
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copy clipboard to clipboard");
};

export function generateId() {
  const timestamp = Date.now();
  const randomText = Math.random().toString(36).substring(4, 8).toUpperCase();
  const id = `${timestamp}${randomText}`;
  return id;
}
