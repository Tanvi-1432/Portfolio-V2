// Little Lemon restaurant reservation site mockup

export default function LittleLemonScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", height: "100%", background: "#0E0B0A", border: "1px solid rgba(232,223,211,0.12)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        {/* browser chrome */}
        <div style={{ height: 40, display: "flex", alignItems: "center", gap: 14, padding: "0 16px", borderBottom: "1px solid rgba(232,223,211,0.08)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 7 }}>
            {["#C8412B", "#D9A452", "#7A8C5C"].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ flex: 1, height: 22, borderRadius: 6, background: "rgba(232,223,211,0.06)", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-soft)" }}>
            littlelemon.com
          </div>
        </div>

        {/* site content */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#EFE4CC 0%,#E3CE9E 100%)", color: "#1A1410" }}>
          {/* nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "#7A3520" }}>
              Little Lemon
            </span>
            <div style={{ display: "flex", gap: 18, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,20,16,0.7)" }}>
              <span>Menu</span>
              <span>About</span>
              <span style={{ color: "#7A3520" }}>Reserve</span>
            </div>
          </div>

          {/* hero + reservation card */}
          <div style={{ padding: "14px 28px 0", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95, margin: 0, color: "#1A1410" }}>
                Mediterranean,<br />
                <span style={{ color: "#7A3520" }}>in season.</span>
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: "rgba(26,20,16,0.72)", maxWidth: 320, marginTop: 14 }}>
                A neighbourhood table in Chicago. Citrus, salt, and a short menu that changes with the market.
              </p>
            </div>

            {/* reservation card */}
            <div style={{ background: "#FBF6EA", borderRadius: 10, padding: 18, boxShadow: "0 20px 50px rgba(26,20,16,0.18)" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,20,16,0.55)", marginBottom: 12 }}>
                Reserve a table
              </div>
              {[["Date", "Fri, May 30"], ["Time", "7:30 PM"], ["Guests", "2 people"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", border: "1px solid rgba(26,20,16,0.16)", borderRadius: 7, marginBottom: 8, fontFamily: "var(--font-ui)", fontSize: 12.5 }}>
                  <span style={{ color: "rgba(26,20,16,0.55)" }}>{k}</span>
                  <span style={{ color: "#1A1410" }}>{v}</span>
                </div>
              ))}
              <div style={{ width: "100%", marginTop: 6, padding: "11px", border: "none", borderRadius: 7, background: "#7A3520", color: "#FBF6EA", fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>
                Find a table
              </div>
            </div>
          </div>

          {/* menu strip */}
          <div style={{ position: "absolute", left: 28, right: 28, bottom: 22, paddingTop: 14, borderTop: "1px solid rgba(26,20,16,0.2)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 13, color: "rgba(26,20,16,0.78)" }}>
            <span>Crudo of bream · 22</span>
            <span>Saffron tagliolini · 26</span>
            <span>Citrus tart · 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
