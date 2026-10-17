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
  cardBg: string;
  cardBorder: string;
  imgs: CoverImage[];
  particleType: "xi" | "xi-gold" | "petal" | "blossom" | "confetti" | "stars" | "heart";
  sealType: "xi" | "heart" | "none";
  sealBg: string;
  sealColor: string;
  nameFont: string;
  accentColor: string;
  textColor: string;
  rgb: string;
  btnBg: string;
  btnTextColor: string;
}
