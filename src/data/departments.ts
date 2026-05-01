import DondoFoto from '../assets/DondoFoto.png';
import AbedFoto from '../assets/AbedFoto.png';

export interface WorkProgram {
  id: number;
  title: string;
  img: string;
}

export interface DepartmentData {
  slug: string;
  name: string;
  manager: string;
  viceManager: string;
  description: string;
  managerImg: string;
  viceManagerImg: string;
  groupImg: string;
  programs: WorkProgram[];
}

export const departmentsData: Record<string, DepartmentData> = {
  'hr-monitoring': {
    slug: 'hr-monitoring',
    name: "Human Resources Monitoring",
    manager: "Dondo D.D.",
    viceManager: "Abednego S.",
    description: "Biro Human Resource (HR) Monitoring adalah biro baru di IKAMMA yang merupakan hasil pemekaran dari Biro Human Resource, dengan tugas utama memastikan kinerja pengurus serta pelaksanaan program kerja tetap selaras dengan visi dan misi IKAMMA.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 1, title: "Internal Evaluation", img: "/program_thumbnail_1777615687215.png" },
      { id: 2, title: "Performance Review", img: "/program_thumbnail_1777615687215.png" },
      { id: 3, title: "Organizational Audit", img: "/program_thumbnail_1777615687215.png" },
      { id: 4, title: "SOP Development", img: "/program_thumbnail_1777615687215.png" },
      { id: 5, title: "Member Growth Tracking", img: "/program_thumbnail_1777615687215.png" },
      { id: 6, title: "Conflict Resolution", img: "/program_thumbnail_1777615687215.png" },
      { id: 7, title: "Strategic Planning", img: "/program_thumbnail_1777615687215.png" },
      { id: 8, title: "Transparency Report", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  // Placeholder for other departments - the user can add them here
  'hrbb': {
    slug: 'hrbb',
    name: "Human Resource Branding & Bonding",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of HRBB department goes here...",
    managerImg: DondoFoto, // Fallback for now
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 1, title: "Program 1", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'mm': {
    slug: 'mm',
    name: "Media & Marketing",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of MM department goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'advance': {
    slug: 'advance',
    name: "Advance & Development",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Advance goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'internal': {
    slug: 'internal',
    name: "Internal Department",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Internal goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'external': {
    slug: 'external',
    name: "External Department",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of External goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'indev': {
    slug: 'indev',
    name: "Intellectual & Development",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Indev goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'entre': {
    slug: 'entre',
    name: "Entrepreneur Department",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Entrepreneur goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  },
  'sparta': {
    slug: 'sparta',
    name: "Sport and Art Association",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Sparta goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: []
  }
};
