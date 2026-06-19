import DesktopApp from "@/components/layout/DesktopApp";
import MobileApp from "@/components/mobile/MobileApp";

export default function Home() {
  return (
    <>
      <div className="desktop-experience">
        <DesktopApp />
      </div>
      <div className="mobile-experience">
        <MobileApp />
      </div>
    </>
  );
}
