import type { Inv } from "@/types/invitation";

export interface CoverProps {
  d: Inv;
  onOpen: () => void;
}

export interface CoverImage {
  src: string;
  className: string;
  style?: React.CSSProperties;
}

export interface CoverConfig {
  slug: string;
  templateId: string;
  templateName: string;
  sig: string;
  bg: string;
  imgs: CoverImage[];
  particleType: "xi" | "petal" | "blossom" | "confetti";
  sealType: "xi" | "heart" | "none";
  nameFont: string;
  accentColor: string;
  rgb: string;
  btnBg: string;
  btnTextColor: string;
}
