export interface NavSection {
  id: string;
  label: string;
  idx: string;
}

export const navSections: NavSection[] = [
  { id: "intro",        label: "Home",         idx: "00" },
  { id: "manifesto",    label: "Approach",     idx: "01" },
  { id: "works",        label: "Projects",     idx: "02" },
  { id: "capabilities", label: "Capabilities", idx: "03" },
  { id: "about",        label: "About",        idx: "04" },
  { id: "index",        label: "Index",        idx: "05" },
  { id: "contact",      label: "Contact",      idx: "06" },
];

export const mobileNavSections: NavSection[] = [
  { id: "intro",        label: "Home",         idx: "00" },
  { id: "manifesto",    label: "Approach",     idx: "01" },
  { id: "works",        label: "Projects",     idx: "02" },
  { id: "capabilities", label: "Capabilities", idx: "03" },
  { id: "about",        label: "About",        idx: "04" },
  { id: "contact",      label: "Contact",      idx: "05" },
];

export const socials = [
  { label: "GitHub",   handle: "@Tanvi-1432",  href: "https://github.com/Tanvi-1432" },
  { label: "Read.cv",  handle: "/tanvi",    href: "https://read.cv/tanvi" },
  { label: "LinkedIn", handle: "/in/tanvich", href: "https://www.linkedin.com/in/tanvich" },
];

export const email = "tanvirahman678@gmail.com";
