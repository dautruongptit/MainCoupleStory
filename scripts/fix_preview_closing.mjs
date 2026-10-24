import fs from "fs";

let code = fs.readFileSync("src/features/invitation/components/Preview.tsx", "utf-8");

// Remove the erroneous ) at the very end
code = code.replace(
  '        </div>\r\n        )\r\n      )}\r\n    </div>\r\n  );\r\n}',
  '        </div>\r\n      )}\r\n    </div>\r\n  );\r\n}'
);

// Put the closing paren right after line 1053 (after the closing div of songphung-template)
const target = '          <div className="sp-brand-bottom">\r\n            <span>ChungDoi · Tạo thiệp cưới online miễn phí</span>\r\n          </div>\r\n        </div>\r\n      )}';

const replacement = '          <div className="sp-brand-bottom">\r\n            <span>ChungDoi · Tạo thiệp cưới online miễn phí</span>\r\n          </div>\r\n        </div>\r\n        )\r\n      )}';

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync("src/features/invitation/components/Preview.tsx", code, "utf-8");
  console.log("Fixed Preview.tsx closing parenthesis!");
} else {
  console.log("Target not found!");
}
