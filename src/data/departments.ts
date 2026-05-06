// ── Foto Pengurus (Managers & Vice Managers) ────────────────────────
import HRMManager from '../assets/FotoPengurus/HRMManager.png';
import HRMViceManager from '../assets/FotoPengurus/HRMViceManager.png';
import HRBBManager from '../assets/FotoPengurus/HRBBManager.png';
import HRBBViceManager from '../assets/FotoPengurus/HRBBViceManager.png';
import AdvanceManager from '../assets/FotoPengurus/AdvanceManager.png';
import AdvanceViceManager from '../assets/FotoPengurus/AdvanceViceManager.png';
import MMManager from '../assets/FotoPengurus/MMManager.png';
import MMViceManager from '../assets/FotoPengurus/MMViceManager.png';
import IntManager from '../assets/FotoPengurus/IntManager.png';
import IntViceManager from '../assets/FotoPengurus/IntViceManager.png';
import ExtManager from '../assets/FotoPengurus/ExtManager.png';
import ExtViceManager from '../assets/FotoPengurus/ExtViceManager.png';
import IndevManager from '../assets/FotoPengurus/IndevManager.png';
import IndevViceManager from '../assets/FotoPengurus/IndevViceManager.png';
import EntreManager from '../assets/FotoPengurus/EntreManager.png';
import EntreViceManager from '../assets/FotoPengurus/EntreViceManager.png';
import SpartaManager from '../assets/FotoPengurus/SpartaManager.png';
import SpartaViceManager from '../assets/FotoPengurus/SpartaViceManager.png';

// ── Group Photos ────────────────────────────────────────────────────
import GroupHRM from '../assets/BirDepDetail/Group/HRMGroup.JPG';
import GroupHRBB from '../assets/BirDepDetail/Group/HRBBGroup.jpg';
import GroupAdvance from '../assets/BirDepDetail/Group/AdvanceGroup.JPG';
import GroupMM from '../assets/BirDepDetail/Group/MMGroup.jpeg';
import GroupInternal from '../assets/BirDepDetail/Group/IntGroup.JPG';
import GroupExternal from '../assets/BirDepDetail/Group/ExtGroup.jpg';
import GroupIndev from '../assets/BirDepDetail/Group/IndevGroup.jpeg';
import GroupEntre from '../assets/BirDepDetail/Group/EntreGroup.jpeg';
import GroupSparta from '../assets/BirDepDetail/Group/SpartaGroup.jpeg';

// ── Meeting Photos ──────────────────────────────────────────────────
import MeetingHRM from '../assets/BirDepDetail/Meeting/HRMMeeting.jpg';
import MeetingHRBB from '../assets/BirDepDetail/Meeting/HRBBMeeting.jpg';
import MeetingAdvance from '../assets/BirDepDetail/Meeting/AdvanceMeeting.jpg';
import MeetingMM from '../assets/BirDepDetail/Meeting/MMMeeting.jpeg';
import MeetingInternal from '../assets/BirDepDetail/Meeting/IntMeeting.JPG';
import MeetingExternal from '../assets/BirDepDetail/Meeting/ExtMeeting.jpg';
import MeetingIndev from '../assets/BirDepDetail/Meeting/IndevMeeting.jpeg';
import MeetingEntre from '../assets/BirDepDetail/Meeting/EntreMeeting.jpeg';
import MeetingSparta from '../assets/BirDepDetail/Meeting/SpartaMeeting.JPEG';

// ── Activity Photos ─────────────────────────────────────────────────
import ActivityHRM from '../assets/BirDepDetail/Activity/HRMActivity.JPG';
import ActivityHRBB from '../assets/BirDepDetail/Activity/HRBBActivity.jpg';
import ActivityAdvance from '../assets/BirDepDetail/Activity/AdvanceActivity.jpg';
import ActivityMM from '../assets/BirDepDetail/Activity/MMActivity.jpeg';
import ActivityInternal from '../assets/BirDepDetail/Activity/IntActivity.JPG';
import ActivityExternal from '../assets/BirDepDetail/Activity/ExtActivity.jpeg';
import ActivityIndev from '../assets/BirDepDetail/Activity/IndevActivty.jpeg';
import ActivityEntre from '../assets/BirDepDetail/Activity/EntreActivity.jpeg';
import ActivitySparta from '../assets/BirDepDetail/Activity/SpartaActivity.jpg';

// ── Logos ───────────────────────────────────────────────────────────
import LogoHRM from '../assets/LogoBirDept/HRM.svg';
import LogoHRBB from '../assets/LogoBirDept/HRBB.svg';
import LogoAdvance from '../assets/LogoBirDept/ADVANCE.svg';
import LogoMM from '../assets/LogoBirDept/MM.svg';
import LogoInternal from '../assets/LogoBirDept/INTERNAL.svg';
import LogoExternal from '../assets/LogoBirDept/EXTERNAL.svg';
import LogoIndev from '../assets/LogoBirDept/INDEV.svg';
import LogoEntre from '../assets/LogoBirDept/ENTRE.svg';
import LogoSparta from '../assets/LogoBirDept/SPARTA.svg';

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
    managerImg: HRBBManager,
    viceManagerImg: HRBBViceManager,
    groupImg: GroupHRBB,
    logo: LogoHRBB,
    meetingImg: MeetingHRBB,
    activityImg: ActivityHRBB,
    programs: [
      { id: 1, title: "School Of IKAMMA", img: GroupHRBB },
      { id: 2, title: "Open Recruitment", img: GroupHRBB },
      { id: 3, title: "Sertijab X IKAMMA Orientation Day", img: GroupHRBB },
      { id: 4, title: "Internal Upgrading", img: GroupHRBB },
      { id: 5, title: "IKAMMA Upgrading Program", img: GroupHRBB },
      { id: 6, title: "Magang IKAMMA", img: GroupHRBB },
      { id: 7, title: "IKAMMA Connect", img: GroupHRBB },
      { id: 8, title: "Monthly Appreciation Post", img: GroupHRBB },
      { id: 9, title: "Birthday Calendar", img: GroupHRBB },
      { id: 10, title: "Farewell IKAMMA", img: GroupHRBB },
    ]
  },
  'hr-monitoring': {
    slug: 'hr-monitoring',
    name: "HR Monitoring",
    manager: "Meila Andini",
    viceManager: "Nisrinatsani Daffa",
    description: "Biro Human Resource (HR) Monitoring adalah **biro baru** di IKAMMA yang merupakan hasil **pemekaran dari Biro Human Resource**, dengan tugas utama **memastikan** kinerja pengurus serta pelaksanaan program kerja tetap **selaras dengan visi dan misi IKAMMA**.",
    managerImg: HRMManager,
    viceManagerImg: HRMViceManager,
    groupImg: GroupHRM,
    logo: LogoHRM,
    meetingImg: MeetingHRM,
    activityImg: ActivityHRM,
    programs: [
      { id: 11, title: "Appraisal Form", img: GroupHRM },
      { id: 12, title: "IKAMMA Evaluation & Appreciation Day", img: GroupHRM },
      { id: 13, title: "Staff of The Month", img: GroupHRM },
    ]
  },
  'mm': {
    slug: 'mm',
    name: "Marketing Media",
    manager: "Winonazwetta",
    viceManager: "Keisha Naila",
    description: "Biro Marketing Media merupakan biro yang berfungsi untuk **membangun citra dan wajah IKAMMA** serta memperkenalkannya kepada publik dengan **penyampaian informasi** dan **digitalisasi** melalui berbagai media.",
    managerImg: MMManager,
    viceManagerImg: MMViceManager,
    groupImg: GroupMM,
    logo: LogoMM,
    meetingImg: MeetingMM,
    activityImg: ActivityMM,
    programs: [
      { id: 14, title: "School of MM", img: GroupMM },
      { id: 15, title: "Social Media", img: GroupMM },
      { id: 16, title: "Creative Production", img: GroupMM },
      { id: 17, title: "Website IKAMMA", img: GroupMM },
    ]
  },
  'advance': {
    slug: 'advance',
    name: "Administration & Finance",
    manager: "Belat Puspa",
    viceManager: "Fikri Akbar",
    description: "Biro Administration and Finance (Advance) adalah biro yang berperan untuk **mengelola administrasi dan keuangan** di IKAMMA serta memastikan semua kegiatan organisasi berjalan dengan **tertib**, **efisien**, dan **transparan**. Advance bertanggung jawab terhadap seluruh proses administrasi, pengelolaan keuangan, serta inventarisasi aset organisasi yang berguna untuk **mendukung kelancaran program kerja di IKAMMA**.",
    managerImg: AdvanceManager,
    viceManagerImg: AdvanceViceManager,
    groupImg: GroupAdvance,
    logo: LogoAdvance,
    meetingImg: MeetingAdvance,
    activityImg: ActivityAdvance,
    programs: [
      { id: 18, title: "Kesekretariatan", img: GroupAdvance },
      { id: 19, title: "Kebendaharaan", img: GroupAdvance },
      { id: 20, title: "Kerumahtanggaan", img: GroupAdvance },
    ]
  },
  'internal': {
    slug: 'internal',
    name: "Internal",
    manager: "Bachtiar Rizki",
    viceManager: "Darrel Raditya",
    description: "Internal adalah departemen yang bertugas membangun **rasa saling memiliki**, menumbuhkan **nilai kekeluargaan**, serta **meningkatkan solidaritas** di antara mahasiswa Manajemen FEB UGM. Melalui berbagai program dan kegiatan, Internal berperan dalam menciptakan **lingkungan yang inklusif**, **suportif**, dan **nyaman** sebagai wadah pengembangan relasi serta kebersamaan antar mahasiswa.",
    managerImg: IntManager,
    viceManagerImg: IntViceManager,
    groupImg: GroupInternal,
    logo: LogoInternal,
    meetingImg: MeetingInternal,
    activityImg: ActivityInternal,
    programs: [
      { id: 21, title: "SOERTI", img: GroupInternal },
      { id: 22, title: "PAAM", img: GroupInternal },
      { id: 23, title: "Debat Internal", img: GroupInternal },
      { id: 24, title: "I-CARE Volunteer", img: GroupInternal },
      { id: 25, title: "M-WEEK", img: GroupInternal },
    ]
  },
  'external': {
    slug: 'external',
    name: "External",
    manager: "Made Raditya",
    viceManager: "Glorio Gracias",
    description: "Departemen External adalah salah satu departemen IKAMMA FEB UGM yang bertujuan untuk **menjadi lini terdepan** dan **representasi organisasi** dalam **menjalin serta mengelola hubungan eksternal.** Departemen ini berfokus pada diplomasi dan profesionalisme dalam membangun kolaborasi strategis dengan perusahaan, organisasi eksternal, serta alumni Manajemen FEB UGM dengan upaya **menciptakan networking yang luas** dan **membuka career pathways bagi mahasiswa Manajemen FEB UGM.**",
    managerImg: ExtManager,
    viceManagerImg: ExtViceManager,
    groupImg: GroupExternal,
    logo: LogoExternal,
    meetingImg: MeetingExternal,
    activityImg: ActivityExternal,
    programs: [
      { id: 26, title: "Partnership", img: GroupExternal },
      { id: 27, title: "Terima Kunjungan", img: GroupExternal },
      { id: 28, title: "Company Visit", img: GroupExternal },
      { id: 29, title: "iNEXT", img: GroupExternal },
      { id: 30, title: "IKVIS", img: GroupExternal },
      { id: 31, title: "IKAMMA Alumni Database", img: GroupExternal },
    ]
  },
  'indev': {
    slug: 'indev',
    name: "Intellectual & Development",
    manager: "Dionisia Clarisa",
    viceManager: "Timoti Pasaribu",
    description: "Departemen Intellectual and Development (Indev) merupakan departemen yang menjadi **wadah pengembangan kapasitas anggota** serta **mendukung seluruh mahasiswa Manajemen FEB UGM** untuk **memaksimalkan potensi diri** dalam bidang akademik, nonakademik, dan persiapan karier jangka panjang melalui berbagai program dan fasilitas. Departemen ini berperan sebagai **fasilitator pengembangan** yang sesuai dengan kebutuhan mahasiswa serta menghadirkan kebermanfaatan nyata IKAMMA bagi mahasiswa Manajemen.",
    managerImg: IndevManager,
    viceManagerImg: IndevViceManager,
    groupImg: GroupIndev,
    logo: LogoIndev,
    meetingImg: MeetingIndev,
    activityImg: ActivityIndev,
    programs: [
      { id: 32, title: "Management Facilitator", img: GroupIndev },
      { id: 33, title: "Career Insight", img: GroupIndev },
      { id: 34, title: "Ready", img: GroupIndev },
    ]
  },
  'entre': {
    slug: 'entre',
    name: "Entrepreneurship",
    manager: "Rafif Imtiyaaz",
    viceManager: "Ivan Tanzil",
    description: "Departemen Entrepreneurship merupakan departemen yang berfokus pada **membangun jiwa kewirausahaan** di lingkungan manajemen FEB UGM. Departemen Entrepreneurship juga **mengembangkan potensi serta minat** mahasiswa Manajemen FEB UGM terhadap **bidang kewirausahaan**.",
    managerImg: EntreManager,
    viceManagerImg: EntreViceManager,
    groupImg: GroupEntre,
    logo: LogoEntre,
    meetingImg: MeetingEntre,
    activityImg: ActivityEntre,
    programs: [
      { id: 35, title: "YES!", img: GroupEntre },
      { id: 36, title: "E-Club", img: GroupEntre },
    ]
  },
  'sparta': {
    slug: 'sparta',
    name: "Sport and Art Association",
    manager: "Nodas Natalleo",
    viceManager: "Sulthan Fairuz",
    description: "Sport and Art Association Departement (SPARTA) adalah departemen yang hadir untuk **memberikan ruang** kepada teman-teman dalam **mengembangkan minat dan bakat di bidang olahraga dan seni**. SPARTA bertujuan untuk menciptakan keseimbangan antara kegiatan akademis dan non akademis, berfungsi sebagai wadah untuk mengintegrasikan aktivitas fisik dan kreativitas, serta menciptakan keseimbangan antara kehidupan akademik dan non akademik.",
    managerImg: SpartaManager,
    viceManagerImg: SpartaViceManager,
    groupImg: GroupSparta,
    logo: LogoSparta,
    meetingImg: MeetingSparta,
    activityImg: ActivitySparta,
    programs: [
      { id: 37, title: "SPRITE", img: GroupSparta },
      { id: 38, title: "POSKAM", img: GroupSparta },
      { id: 39, title: "Management's Festival", img: GroupSparta },
      { id: 40, title: "Gadjah Mada Super Cup", img: GroupSparta },
    ]
  }
};
