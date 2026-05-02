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
  logo: string;
  meetingImg: string;
  activityImg: string;
  programs: WorkProgram[];
}

export const departmentsData: Record<string, DepartmentData> = {
  'hrbb': {
    slug: 'hr-bb',
    name: "HR Birdept Buddy",
    manager: "Rafeyfa Ammara",
    viceManager: "Kireina Nayla",
    description: "Human Resources Birdept Buddy (HRBB) merupakan biro yang berperan dalam **pengembangan sumber daya manusia** yang ada pada kepengurusan IKAMMA, khususnya pada **pendampingan program kerja, pengembangan kompetensi**, serta **apresiasi kinerja**. Biro HR Birdept Buddy akan memastikan setiap biro/departemen merasa didukung dan didengar, sehingga kesejahteraan dan produktivitas di IKAMMA tetap terjaga.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
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
    name: "HR Monitoring",
    manager: "Meila Andini",
    viceManager: "Nisrinatsani Daffa",
    description: "Biro Human Resource (HR) Monitoring adalah **biro baru** di IKAMMA yang merupakan hasil **pemekaran dari Biro Human Resource**, dengan tugas utama **memastikan** kinerja pengurus serta pelaksanaan program kerja tetap **selaras dengan visi dan misi IKAMMA**.",
    managerImg: DondoFoto, // Fallback for now
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
    programs: [
      { id: 11, title: "Appraisal Form", img: "/program_thumbnail_1777615687215.png" },
      { id: 12, title: "IKAMMA Evaluation & Appreciation Day", img: "/program_thumbnail_1777615687215.png" },
      { id: 13, title: "Staff of The Month", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'mm': {
    slug: 'mm',
    name: "Marketing Media",
    manager: "Winonazwetta",
    viceManager: "Keisha Naila",
    description: "Biro Marketing Media merupakan biro yang berfungsi untuk **membangun citra dan wajah IKAMMA** serta memperkenalkannya kepada publik dengan **penyampaian informasi** dan **digitalisasi** melalui berbagai media.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
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
    manager: "Belat Puspa",
    viceManager: "Fikri Akbar",
    description: "Biro Administration and Finance (Advance) adalah biro yang berperan untuk **mengelola administrasi dan keuangan** di IKAMMA serta memastikan semua kegiatan organisasi berjalan dengan **tertib**, **efisien**, dan **transparan**. Advance bertanggung jawab terhadap seluruh proses administrasi, pengelolaan keuangan, serta inventarisasi aset organisasi yang berguna untuk **mendukung kelancaran program kerja di IKAMMA**.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
    programs: [
      { id: 18, title: "Kesekretariatan", img: "/program_thumbnail_1777615687215.png" },
      { id: 19, title: "Kebendaharaan", img: "/program_thumbnail_1777615687215.png" },
      { id: 20, title: "Kerumahtanggaan", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'internal': {
    slug: 'internal',
    name: "Internal",
    manager: "Bachtiar Rizki",
    viceManager: "Darrel Raditya",
    description: "Internal adalah departemen yang bertugas membangun **rasa saling memiliki**, menumbuhkan **nilai kekeluargaan**, serta **meningkatkan solidaritas** di antara mahasiswa Manajemen FEB UGM. Melalui berbagai program dan kegiatan, Internal berperan dalam menciptakan **lingkungan yang inklusif**, **suportif**, dan **nyaman** sebagai wadah pengembangan relasi serta kebersamaan antar mahasiswa.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
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
    manager: "Glorio Gracias",
    viceManager: "Made Raditya",
    description: "Departemen External adalah salah satu departemen IKAMMA FEB UGM yang bertujuan untuk **menjadi lini terdepan** dan **representasi organisasi** dalam **menjalin serta mengelola hubungan eksternal.** Departemen ini berfokus pada diplomasi dan profesionalisme dalam membangun kolaborasi strategis dengan perusahaan, organisasi eksternal, serta alumni Manajemen FEB UGM dengan upaya **menciptakan networking yang luas** dan **membuka career pathways bagi mahasiswa Manajemen FEB UGM.**",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
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
    manager: "Dionisia Clarisa",
    viceManager: "Timoti Pasaribu",
    description: "Departemen Intellectual and Development (Indev) merupakan departemen yang menjadi **wadah pengembangan kapasitas anggota** serta **mendukung seluruh mahasiswa Manajemen FEB UGM** untuk **memaksimalkan potensi diri** dalam bidang akademik, nonakademik, dan persiapan karier jangka panjang melalui berbagai program dan fasilitas. Departemen ini berperan sebagai **fasilitator pengembangan** yang sesuai dengan kebutuhan mahasiswa serta menghadirkan kebermanfaatan nyata IKAMMA bagi mahasiswa Manajemen.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
    programs: [
      { id: 32, title: "Management Facilitator", img: "/program_thumbnail_1777615687215.png" },
      { id: 33, title: "Career Insight", img: "/program_thumbnail_1777615687215.png" },
      { id: 34, title: "Ready", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'entre': {
    slug: 'entre',
    name: "Entrepreneurship",
    manager: "Rafif Imtiyaaz",
    viceManager: "Ivan Tanzil",
    description: "Departemen Entrepreneurship merupakan departemen yang berfokus pada **membangun jiwa kewirausahaan** di lingkungan manajemen FEB UGM. Departemen Entrepreneurship juga **mengembangkan potensi serta minat** mahasiswa Manajemen FEB UGM terhadap **bidang kewirausahaan**.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
    programs: [
      { id: 35, title: "YES!", img: "/program_thumbnail_1777615687215.png" },
      { id: 36, title: "E-Club", img: "/program_thumbnail_1777615687215.png" },
    ]
  },
  'sparta': {
    slug: 'sparta',
    name: "Sport and Art Association",
    manager: "Nodas Natalleo",
    viceManager: "Sulthan Fairuz",
    description: "Sport and Art Association Departement (SPARTA) adalah departemen yang hadir untuk **memberikan ruang** kepada teman-teman dalam **mengembangkan minat dan bakat di bidang olahraga dan seni**. SPARTA bertujuan untuk menciptakan keseimbangan antara kegiatan akademis dan non akademis, berfungsi sebagai wadah untuk mengintegrasikan aktivitas fisik dan kreativitas, serta menciptakan keseimbangan antara kehidupan akademik dan non akademik.",
    managerImg: DondoFoto,
    viceManagerImg: AbedFoto,
    groupImg: "/team_group_photo_1777615655077.png",
    logo: "/assets/LogoPutih.svg",
    meetingImg: "/meeting_placeholder.jpg",
    activityImg: "/activity_placeholder.jpg",
    programs: [
      { id: 37, title: "SPRITE", img: "/program_thumbnail_1777615687215.png" },
      { id: 38, title: "POSKAM", img: "/program_thumbnail_1777615687215.png" },
      { id: 39, title: "Management's Festival", img: "/program_thumbnail_1777615687215.png" },
      { id: 32, title: "Gadjah Mada Super Cup", img: "/program_thumbnail_1777615687215.png" },
    ]
  }
};
