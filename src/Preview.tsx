import { useState } from "react";
import { Inv, brideShown, groomShown, WEEKDAYS_FULL, WEEKDAYS_SHORT, buildIcs, formatTime, monthGrid, parseDate } from "./data";

export default function Preview({ d, set }: { d: Inv; set: (p: Partial<Inv>) => void }) {
  const dt = parseDate(d.date);
  const gName = groomShown(d);
  const bName = brideShown(d);
  const brideFirst = d.order === "bride";
  const [n1, n2] = brideFirst ? [bName, gName] : [gName, bName];
  const [r1, r2] = brideFirst ? [d.brideRole, d.groomRole] : [d.groomRole, d.brideRole];
  const fams = [
    { t: d.groomFamTitle, f: d.groomFather, m: d.groomMother },
    { t: d.brideFamTitle, f: d.brideFather, m: d.brideMother },
  ];
  if (brideFirst) fams.reverse();
  const g = monthGrid(d.date);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const days = Math.max(0, Math.ceil((dt.getTime() - Date.now()) / 86400000));

  const addToCalendar = () => {
    const blob = new Blob([buildIcs(d)], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "wedding.ics";
    a.click();
  };
  const send = () => {
    if (!name.trim() || !msg.trim()) return;
    set({ wishes: [{ name, msg, at: new Date().toLocaleDateString("vi-VN") }, ...d.wishes] });
    setName("");
    setMsg("");
  };

  return (
    <div className="pv-scroll">
      <div className="inv">
        {/* decorative layer (placeholders — replace with your own template art) */}
        <div className="deco deco-a" />
        <div className="deco deco-b" />

        <header className="hero">
          <div className="hero-names">
            <div>{n1}</div>
            <div>{n2}</div>
          </div>
          <div className="art art-1">Template art</div>
          <div className="art art-2" />
        </header>

        <section className="sec1">
          {d.familyOn && (
            <>
              {d.ceremonyTitle && <h2 className="t-title">{d.ceremonyTitle}</h2>}
              <div className="families">
                {fams.map((x, i) => (
                  <div key={i}>
                    <p className="f-title">{x.t}</p>
                    <p className="f-name">{x.f}</p>
                    <p className="f-name">{x.m}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {d.announceOn && d.announce && <p className="announce">{d.announce}</p>}

          <div className="person">{n1}</div>
          <div className="role">{r1}</div>
          <div className="amp">&amp;</div>
          <div className="person">{n2}</div>
          <div className="role">{r2}</div>

          {d.ceremonies.map((c, i) => (
            <div className="block" key={i}>
              {c.title && <h2 className="t-title">{c.title}</h2>}
              <p className="lead">{[c.date && parseDate(c.date).toLocaleDateString("vi-VN"), formatTime(c.time, d.clock)].filter(Boolean).join(" · ")}</p>
              {c.place && <p className="lead sm">{c.place}</p>}
            </div>
          ))}

{d.partyOn && (<>
          {d.banquetTitle && <h2 className="t-title mt">{d.banquetTitle}</h2>}
          <p className="lead">Tiệc cưới được tổ chức vào:</p>
          <div className="date-row">
            <span className="wd">{WEEKDAYS_FULL[dt.getDay()]}</span>
            <span className="dn">{dt.getDate()}</span>
            <span className="wd">Tháng {dt.getMonth() + 1}</span>
          </div>
          {d.time && <p className="lead sm">{formatTime(d.time, d.clock)}</p>}
          {!d.hideWelcomeTimes && (d.welcomeTime || d.startTime) && (
            <p className="lead sm">
              {d.welcomeTime && <>Đón khách {formatTime(d.welcomeTime, d.clock)}</>}
              {d.welcomeTime && d.startTime && " · "}
              {d.startTime && <>Khai tiệc {formatTime(d.startTime, d.clock)}</>}
            </p>
          )}
          {d.locTitle && d.address && <h2 className="t-title">{d.locTitle}</h2>}
          {d.address && <p className="lead sm">{d.address}</p>}
          {d.showMap && (d.address || d.mapUrl) && (
            <a className="link" target="_blank" rel="noreferrer" href={d.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`}>Xem bản đồ</a>
          )}

          {d.countdown && d.date && <p className="lead">Còn <b>{days}</b> ngày</p>}

          {d.date && <div className="cal">
            <div className="cal-h">Tháng {g.m + 1}, {g.y}</div>
            <div className="cal-g">
              {WEEKDAYS_SHORT.map((w) => <span key={w} className="cal-w">{w}</span>)}
              {g.cells.map((c, i) => (
                <span key={i} className={"cal-d" + (c === g.selected ? " sel" : "")}>{c ?? ""}</span>
              ))}
            </div>
          </div>
          }
          {d.date && <button className="link" onClick={addToCalendar}>Thêm vào lịch</button>}

</>)}

          {d.dressOn && d.dressText && (<div className="block"><h2 className="t-title">Trang phục</h2><p className="lead sm">{d.dressText}</p></div>)}
          {d.schedOn && (
            <div className="block">
              <h2 className="t-title">Lịch trình</h2>
              {d.sched.map((s, i) => <p key={i} className="lead sm">{formatTime(s.time, d.clock)} — {s.text}</p>)}
            </div>
          )}

          {d.rsvpOn && d.rsvpDisplay === "button" && <button className="rsvp">Xác nhận tham dự</button>}

          {d.giftOn && d.gifts.length > 0 && (
            <div className="block">
              <h2 className="t-title">{d.giftTitle}</h2>
              {d.gifts.map((x, i) => <p key={i} className="lead sm"><b>{x.kind}</b>: {x.account}</p>)}
            </div>
          )}
        </section>

        {d.guestOn && (
          <section className="sec2">
            <h2 className="gb-title">Lời chúc của khách</h2>
            <div className="gb-form">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" />
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Gửi lời chúc đến cô dâu chú rể" />
              <button className="gb-send" disabled={!name.trim() || !msg.trim()} onClick={send}>Gửi lời chúc</button>
            </div>
            {d.wishes.length === 0 ? (
              <p className="empty">Chưa có lời chúc nào, hãy là người đầu tiên!</p>
            ) : (
              d.wishes.map((w, i) => (
                <div className="wish" key={i}><b>{w.name}</b><span>{w.msg}</span><small>{w.at}</small></div>
              ))
            )}
          </section>
        )}

        {d.thanksOn && <footer className="inv-footer">{d.thanks}</footer>}
        <div className="brand">♡ Your brand</div>
      </div>
    </div>
  );
}
