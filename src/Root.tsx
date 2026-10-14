import { useEffect } from "react";
import App from "./App";
import TopNav from "./TopNav";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Templates from "./pages/Templates";
import Demo from "./pages/Demo";
import { navigate, usePath } from "./router";

function Redirect({ to }: { to: string }) {
  useEffect(() => navigate(to), [to]);
  return null;
}

function Stub({ title }: { title: string }) {
  return (
    <div className="page narrow">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">Trang này chưa nằm trong phạm vi clone.</p>
    </div>
  );
}

export default function Root() {
  const path = usePath().replace(/\/+$/, "") || "/";

  // The editor renders its own TopNav + header.
  if (path.startsWith("/edit/")) return <App />;

  const demoMatch = path.match(/^\/vi\/mau-thiep\/(.+)\/demo$/);
  let page;
  if (path === "/") page = <Redirect to="/vi" />;
  else if (path === "/vi") page = <Home />;
  else if (demoMatch) page = <Demo slug={demoMatch[1]} />;
  else if (path === "/vi/mau-thiep") page = <Templates />;
  else if (path === "/vi/bang-gia") page = <Pricing />;
  else if (path === "/dashboard") page = <Dashboard />;
  else if (path === "/account") page = <Account />;
  else page = <Stub title="Sắp có" />;

  return (
    <div className="site">
      <TopNav />
      {page}
    </div>
  );
}
