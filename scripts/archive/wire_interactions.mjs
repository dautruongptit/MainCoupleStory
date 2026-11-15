import fs from 'fs';

let content = fs.readFileSync('src/features/invitation/components/MinimalismBrown.tsx', 'utf8');

// Add states for modals and forms if not present
const stateInsertPoint = 'const [isPlayingMusic, setIsPlayingMusic] = useState(false);';
const newStates = `const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [wishName, setWishName] = useState("");
  const [wishMsg, setWishMsg] = useState("");
  const [wishesList, setWishesList] = useState(d.wishes && d.wishes.length > 0 ? d.wishes : [
    { name: "Mỹ Linh", msg: "Chúc hai bạn trăm năm hạnh phúc, vạn sự như ý, một đám cưới thật vui!", at: "21:20:27 14/7/2026" },
    { name: "Trọng Nhân", msg: "Chúc mừng hai bạn về chung một nhà! Chúc luôn vui vẻ và yêu thương nhau thật nhiều.", at: "21:19:15 14/7/2026" },
    { name: "Phương Vy", msg: "Chúc Nam và Vy mãi ngọt ngào như ngày đầu, hạnh phúc trọn đời bên nhau!", at: "21:18:40 14/7/2026" },
    { name: "Hải Đăng", msg: "Chúc mừng anh chị! Chúc hai người xây dựng tổ ấm thật hạnh phúc và bền lâu.", at: "21:17:22 14/7/2026" },
    { name: "Ngọc Diệp", msg: "Nhìn thiệp mà thấy ấm áp ghê. Chúc hai bạn một hôn lễ thật trọn vẹn và đáng nhớ!", at: "21:16:05 14/7/2026" },
    { name: "Đức Thịnh", msg: "Chúc cô dâu chú rể trăm năm hạnh phúc, gia đình êm ấm, con cái đủ đầy!", at: "21:15:30 14/7/2026" },
    { name: "Lan Anh", msg: "Chúc mừng hạnh phúc hai bạn nhé! Mong hai bạn luôn nắm tay nhau đi hết cuộc đời.", at: "21:14:12 14/7/2026" },
    { name: "Quốc Bảo", msg: "Mừng đám cưới của cậu mợ! Chúc hai bạn mãi yêu thương và thấu hiểu nhau.", at: "21:13:45 14/7/2026" },
    { name: "Thu Hà", msg: "Ôi tấm thiệp đẹp quá! Chúc hai đứa hạnh phúc viên mãn, sớm có tin vui.", at: "21:12:18 14/7/2026" },
    { name: "Minh Tuấn", msg: "Chúc mừng Hoàng Nam và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé!", at: "21:11:02 14/7/2026" }
  ]);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMsg.trim()) return;
    const now = new Date();
    const timeStr = \`\${String(now.getHours()).padStart(2, "0")}:\${String(now.getMinutes()).padStart(2, "0")}:\${String(now.getSeconds()).padStart(2, "0")} \${now.getDate()}/\${now.getMonth() + 1}/\${now.getFullYear()}\`;
    const newWish = { name: wishName.trim(), msg: wishMsg.trim(), at: timeStr };
    const updated = [newWish, ...wishesList];
    setWishesList(updated);
    set({ wishes: updated });
    setWishName("");
    setWishMsg("");
  };`;

content = content.replace(stateInsertPoint, newStates);

// Wire Giftbox button:
content = content.replace(
  'aria-label="Mở hộp mừng cưới" className="jsx-dd7f1ef62680a11c group relative cursor-pointer outline-none border-none bg-transparent "',
  'aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)} className="jsx-dd7f1ef62680a11c group relative cursor-pointer outline-none border-none bg-transparent "'
);

// Wire Gift Modal Dialog:
content = content.replace(
  '<dialog className="modal modal-bottom sm:modal-middle">',
  '<dialog className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`} open={giftModalOpen}>'
);

// Wire Gift Modal Close buttons:
content = content.replace(
  '<button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3',
  '<button type="button" onClick={() => setGiftModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3'
);
content = content.replace(
  '<form method="dialog" className="modal-backdrop"><button type="submit">close</button></form>',
  '<div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}><button type="button">close</button></div>'
);

// Wire Lightbox Dialog:
content = content.replace(
  '<dialog className="modal"><div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">',
  '<dialog className={`modal ${lightboxOpen ? "modal-open" : ""}`} open={lightboxOpen}><div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">'
);

// Wire Lightbox Close button:
content = content.replace(
  '<form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10"><button className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20" aria-label="Close lightbox">✕</button></form>',
  '<div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10"><button type="button" onClick={() => setLightboxOpen(false)} className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20" aria-label="Close lightbox">✕</button></div>'
);

// Wire Add to calendar:
content = content.replace(
  'href="https://calendar.google.com/calendar/render',
  'onClick={(e) => { e.preventDefault(); addToCalendar(); }} href="#calendar'
);

fs.writeFileSync('src/features/invitation/components/MinimalismBrown.tsx', content);
console.log('Updated interactive handlers in MinimalismBrown.tsx');
