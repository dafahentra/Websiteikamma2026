import DondoFoto from '../assets/DondoFoto.png';
import { departmentsData } from './departments';

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

// Data Pimpinan Inti (Chairman & Vice Chairmen)
export const CORE_LEADERS: TeamMember[] = [
  { 
    name: "Dondo D.D.", 
    role: "Vice Chairman", 
    img: departmentsData['hr-monitoring'].managerImg 
  },
  { 
    name: "Dondo D.D.", 
    role: "Chairman", 
    img: departmentsData['hrbb'].managerImg 
  },
  { 
    name: "Dondo D.D.", 
    role: "Vice Chairman", 
    img: departmentsData['internal'].managerImg 
  },
];

// Daftar Biro & Departemen untuk navigasi/list di About Page
export const ORGANIZATION_LIST = [
  { name: "Human Resources Birdept Buddy", type: "Bureau", href: "/departemen/hrbb", slug: "hrbb" },
  { name: "Human Resources Monitoring", type: "Bureau", href: "/departemen/hr-monitoring", slug: "hr-monitoring" },
  { name: "Administration & Finance", type: "Bureau", href: "/departemen/advance", slug: "advance" },
  { name: "Marketing & Media", type: "Bureau", href: "/departemen/mm", slug: "mm" },
  { name: "Internal", type: "Department", href: "/departemen/internal", slug: "internal" },
  { name: "External", type: "Department", href: "/departemen/external", slug: "external" },
  { name: "Intellectual & Development", type: "Department", href: "/departemen/indev", slug: "indev" },
  { name: "Entrepreneur", type: "Department", href: "/departemen/entre", slug: "entre" },
  { name: "Sport and Art Association", type: "Department", href: "/departemen/sparta", slug: "sparta" }
];
