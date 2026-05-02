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
  'hrbb': {
    slug: 'hr-bb',
    name: "Human Resources Birdept Buddy",
    manager: "Dondo D.D.",
    viceManager: "Abednego S.",
    description: "Human Resources Birdept Buddy (HRBB) merupakan biro yang berperan dalam **pengembangan sumber daya manusia** yang ada pada kepengurusan IKAMMA, khususnya pada pendampingan program kerja, pengembangan kompetensi, serta apresiasi kinerja. Biro HR Birdept Buddy akan memastikan setiap biro/departemen merasa didukung dan didengar, sehingga kesejahteraan dan produktivitas di IKAMMA tetap terjaga.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 1, title: "School Of IKAMMA", img: "/program_thumbnail_1777615687215.png" },
      { id: 2, title: "Open Recruitment", img: "/program_thumbnail_1777615687215.png" },
      { id: 3, title: "Sertijab X IKAMMA Orientation Day", img: "/program_thumbnail_1777615687215.png" },
      { id: 4, title: "Internal Upgrading", img: "/program_thumbnail_1777615687215.png" },
      { id: 5, title: "IKAMMA Upgrading Program", img: "/program_thumbnail_1777615687215.png" },
      { id: 6, title: "Magang IKAMMA", img: "/program_thumbnail_1777615687215.png" },
      { id: 7, title: "IKAMMA Connect", img: "/program_thumbnail_1777615687215.png" },
      { id: 8, title: "Monthly Appreciation Post", img: "/program_thumbnail_1777615687215.png" },
      { id: 9, title: "Birthday Calendar", img: "/program_thumbnail_1777615687215.png" },
      { id: 10, title: "Farewell IKAMMA", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  // Placeholder for other departments - the user can add them here
  'hr-monitoring': {
    slug: 'hr-monitoring',
    name: "Human Resource Monitoring",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Biro Human Resource (HR) Monitoring adalah biro baru di IKAMMA yang merupakan hasil pemekaran dari Biro Human Resource, dengan tugas utama memastikan kinerja pengurus serta pelaksanaan program kerja tetap selaras dengan visi dan misi IKAMMA.",
    managerImg: DondoFoto, // Fallback for now
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 11, title: "Appraisal Form", img: "/program_thumbnail_1777615687215.png" },
      { id: 12, title: "IKAMMA Evaluation & Appreciation Day", img: "/program_thumbnail_1777615687215.png" },
      { id: 13, title: "Staff of The Month", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'mm': {
    slug: 'mm',
    name: "Marketing Media",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Biro Marketing Media merupakan biro yang berfungsi untuk membangun citra dan wajah IKAMMA serta memperkenalkannya kepada publik dengan penyampaian informasi dan digitalisasi melalui berbagai media.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 14, title: "School of MM", img: "/program_thumbnail_1777615687215.png" },
      { id: 15, title: "Social Media", img: "/program_thumbnail_1777615687215.png" },
      { id: 16, title: "Creative Production", img: "/program_thumbnail_1777615687215.png" },
      { id: 17, title: "Website IKAMMA", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'advance': {
    slug: 'advance',
    name: "Administration & Finance",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Biro Administration and Finance (Advance) adalah biro yang berperan untuk mengelola administrasi dan keuangan di IKAMMA serta memastikan semua kegiatan organisasi berjalan dengan tertib, efisien, dan transparan. Advance bertanggung jawab terhadap seluruh proses administrasi, pengelolaan keuangan, serta inventarisasi aset organisasi yang berguna untuk mendukung kelancaran program kerja di IKAMMA.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 18, title: "Kesekretariatan", img: "/program_thumbnail_1777615687215.png" },
      { id: 19, title: "Kebendaharaan", img: "/program_thumbnail_1777615687215.png" },
      { id: 20, title: "Kerumahtanggaan", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'internal': {
    slug: 'internal',
    name: "Internal",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Internal adalah departemen yang bertugas membangun rasa saling memiliki, menumbuhkan nilai kekeluargaan, serta meningkatkan solidaritas di antara mahasiswa Manajemen FEB UGM. Melalui berbagai program dan kegiatan, Internal berperan dalam menciptakan lingkungan yang inklusif, suportif, dan nyaman sebagai wadah pengembangan relasi serta kebersamaan antar mahasiswa.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 21, title: "SOERTI", img: "/program_thumbnail_1777615687215.png" },
      { id: 22, title: "PAAM", img: "/program_thumbnail_1777615687215.png" },
      { id: 23, title: "Debat Internal", img: "/program_thumbnail_1777615687215.png" },
      { id: 24, title: "I-CARE Volunteer", img: "/program_thumbnail_1777615687215.png" },
      { id: 25, title: "M-WEEK", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'external': {
    slug: 'external',
    name: "External",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of External goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 26, title: "Partnership", img: "/program_thumbnail_1777615687215.png" },
      { id: 27, title: "Terima Kunjungan", img: "/program_thumbnail_1777615687215.png" },
      { id: 28, title: "Company Visit", img: "/program_thumbnail_1777615687215.png" },
      { id: 29, title: "iNEXT", img: "/program_thumbnail_1777615687215.png" },
      { id: 30, title: "IKVIS", img: "/program_thumbnail_1777615687215.png" },
      { id: 31, title: "IKAMMA Alumni Database", img: "/program_thumbnail_1777615687215.png" },
    ]
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
    programs: [
      { id: 32, title: "Management Facilitator", img: "/program_thumbnail_1777615687215.png" },
      { id: 33, title: "Career Insight", img: "/program_thumbnail_1777615687215.png" },
      { id: 34, title: "Ready", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'entre': {
    slug: 'entre',
    name: "Entrepreneurship",
    manager: "Manager Name",
    viceManager: "Vice Manager Name",
    description: "Description of Entrepreneur goes here...",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    programs: [
      { id: 35, title: "YES!", img: "/program_thumbnail_1777615687215.png" },
      { id: 36, title: "E-Club", img: "/program_thumbnail_1777615687215.png" },
    ]
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
    programs: [
      { id: 37, title: "SPRITE", img: "/program_thumbnail_1777615687215.png" },
      { id: 38, title: "POSKAM", img: "/program_thumbnail_1777615687215.png" },
      { id: 39, title: "Management's Festival", img: "/program_thumbnail_1777615687215.png" },
      { id: 32, title: "Gadjah Mada Super Cup", img: "/program_thumbnail_1777615687215.png" },
    ]
  }
};
