import PocketPlanPhone from "./PocketPlanPhone";
import NotesBoard from "./NotesBoard";
import LittleLemonScreen from "./LittleLemonScreen";

interface Props {
  id: string;
}

export default function ProjectHeroMock({ id }: Props) {
  if (id === "pocketplan") return <PocketPlanPhone screen="balance" />;
  if (id === "notes") return <NotesBoard />;
  if (id === "little-lemon") return <LittleLemonScreen />;
  return null;
}
