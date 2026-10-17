export type Card = {
  id: string;
  name: string;
  template: string;
  color: string;
  status: "draft" | "published";
  created: string;
  tplId?: string;
};
