import ChairmanImg from '../assets/FotoPengurus/Chairman.webp';
import ViceChair1Img from '../assets/FotoPengurus/ViceChair1.webp';
import ViceChair2Img from '../assets/FotoPengurus/ViceChair2.webp';

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

// Data Pimpinan Inti (Chairman & Vice Chairmen)
export const CORE_LEADERS: TeamMember[] = [
  {
    name: "Arwanda Darin",
    role: "Vice Chairman",
    img: ViceChair1Img
  },
  {
    name: "Aurellia Lysandra",
    role: "Chairman",
    img: ChairmanImg
  },
  {
    name: "Felita Sabila",
    role: "Vice Chairman",
    img: ViceChair2Img
  },
];

// Daftar Biro & Departemen untuk navigasi/list di About Page
export const ORGANIZATION_LIST = [
  { name: "Human Resources Birdept Buddy", type: "Bureau", href: "/departemen/hrbb", slug: "hrbb" },
  { name: "Human Resources Monitoring", type: "Bureau", href: "/departemen/hr-monitoring", slug: "hr-monitoring" },
  { name: "Administration and Finance", type: "Bureau", href: "/departemen/advance", slug: "advance" },
  { name: "Marketing Media", type: "Bureau", href: "/departemen/mm", slug: "mm" },
  { name: "Internal", type: "Department", href: "/departemen/internal", slug: "internal" },
  { name: "External Affairs", type: "Department", href: "/departemen/external", slug: "external" },
  { name: "Intellectual and Development", type: "Department", href: "/departemen/indev", slug: "indev" },
  { name: "Entrepreneurship", type: "Department", href: "/departemen/entre", slug: "entre" },
  { name: "Sport and Art Association", type: "Department", href: "/departemen/sparta", slug: "sparta" }
];
