import fs from "fs";

let code = fs.readFileSync("src/features/invitation/components/covers/BaseCoverCard.tsx", "utf8");
code = code.replace('className="absolute left-1/2 relative block"', 'className="absolute left-1/2"');
code = code.replace('className="block w-full text-center text-lg leading-none sm:text-xl my-1 opacity-75 italic font-normal"', 'className="block w-full text-center text-lg leading-none sm:text-xl"');
fs.writeFileSync("src/features/invitation/components/covers/BaseCoverCard.tsx", code);
console.log("Updated BaseCoverCard.tsx!");
