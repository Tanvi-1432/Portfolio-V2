import PocketPlanPhone from "./PocketPlanPhone";
import NotesBoard from "./NotesBoard";
import LittleLemonScreen from "./LittleLemonScreen";

interface Props {
  id: string;
  thumbnail?: boolean;
}

export default function ProjectHeroMock({ id, thumbnail }: Props) {
  if (id === "pocketplan") return <PocketPlanPhone screen="balance" variant={thumbnail ? "thumbnail" : "full"} />;
  if (id === "notes") return <NotesBoard />;
  if (id === "little-lemon") return <LittleLemonScreen />;
  return null;
}
