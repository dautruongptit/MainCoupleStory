import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const { d, albumPhotos, activePhotoIdx, setActivePhotoIdx } = ctx;
  const [ratios, setRatios] = React.useState<Record<number, number>>({});  return (
    d.albumOn && d.photos.length > 0 && (<div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px] z-10 flex w-full flex-col items-center overflow-x-clip px-[12.1%] pb-[18px] pt-[0px]">{albumPhotos.map((_, i) => (<button key={i} type="button" aria-label={"Go to photo " + (i + 1)} onClick={() => setActivePhotoIdx(i)} className={"rounded-full transition-all duration-300 " + (i === activePhotoIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25 hover:opacity-40")}></button>))}</div>)
  );
}
