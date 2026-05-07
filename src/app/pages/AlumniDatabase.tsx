import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, Filter, Download, ChevronRight, ChevronLeft, Mail, Linkedin } from 'lucide-react';

interface Alumni {
  id: number;
  name: string;
  batch: string;
  major: string;
  company: string;
  position: string;
  location: string;
  linkedin?: string;
  email?: string;
}

const ALUMNI_DATA: Alumni[] = [
  { id: 1, name: "Aditya Pratama", batch: "2018", major: "Manajemen", company: "Google Indonesia", position: "Product Manager", location: "Jakarta", linkedin: "#", email: "aditya@example.com" },
  { id: 2, name: "Bunga Citra", batch: "2017", major: "Manajemen", company: "Unilever", position: "Brand Manager", location: "Jakarta", linkedin: "#" },
  { id: 3, name: "Chandra Wijaya", batch: "2019", major: "Manajemen", company: "Shopee", position: "Data Analyst", location: "Singapore", linkedin: "#", email: "chandra@example.com" },
  { id: 4, name: "Dina Lorenza", batch: "2016", major: "Manajemen", company: "Gojek", position: "Operations Manager", location: "Jakarta", linkedin: "#" },
  { id: 5, name: "Eka Putra", batch: "2020", major: "Manajemen", company: "Boston Consulting Group", position: "Associate Consultant", location: "Jakarta", linkedin: "#" },
  { id: 6, name: "Fajar Nugraha", batch: "2015", major: "Manajemen", company: "Bank Indonesia", position: "Economist", location: "Jakarta", linkedin: "#" },
  { id: 7, name: "Gita Permata", batch: "2018", major: "Manajemen", company: "Tokopedia", position: "Marketing Specialist", location: "Jakarta", linkedin: "#" },
  { id: 8, name: "Hadi Saputra", batch: "2017", major: "Manajemen", company: "McKinsey & Company", position: "Engagement Manager", location: "Jakarta", linkedin: "#" },
  { id: 9, name: "Indah Sari", batch: "2019", major: "Manajemen", company: "Traveloka", position: "UX Researcher", location: "Jakarta", linkedin: "#" },
  { id: 10, name: "Joko Susilo", batch: "2016", major: "Manajemen", company: "Pertamina", position: "Business Development", location: "Balikpapan", linkedin: "#" },
  { id: 11, name: "Kartika Sari", batch: "2020", major: "Manajemen", company: "P&G", position: "Key Account Manager", location: "Jakarta", linkedin: "#" },
  { id: 12, name: "Luthfi Aziz", batch: "2018", major: "Manajemen", company: "Bain & Company", position: "Senior Associate", location: "Jakarta", linkedin: "#" },
  { id: 13, name: "Mira Santika", batch: "2017", major: "Manajemen", company: "Danone", position: "Supply Chain Manager", location: "Jakarta", linkedin: "#" },
  { id: 14, name: "Naufal Abdi", batch: "2019", major: "Manajemen", company: "Grab", position: "Growth Lead", location: "Kuala Lumpur", linkedin: "#" },
  { id: 15, name: "Olla Ramlan", batch: "2016", major: "Manajemen", company: "L'Oreal", position: "Social Media Manager", location: "Jakarta", linkedin: "#" },
  { id: 16, name: "Putra Bangsa", batch: "2020", major: "Manajemen", company: "Amazon Web Services", position: "Solutions Architect", location: "Sydney", linkedin: "#" },
  { id: 17, name: "Qory Sandi", batch: "2018", major: "Manajemen", company: "Deloitte", position: "Audit Senior", location: "Jakarta", linkedin: "#" },
  { id: 18, name: "Rina Melati", batch: "2017", major: "Manajemen", company: "Nestle", position: "Quality Assurance", location: "Pasuruan", linkedin: "#" },
  { id: 19, name: "Sutan Syahrir", batch: "2019", major: "Manajemen", company: "Microsoft", position: "Account Executive", location: "Jakarta", linkedin: "#" },
  { id: 20, name: "Tania Putri", batch: "2016", major: "Manajemen", company: "Astra International", position: "Management Trainee", location: "Jakarta", linkedin: "#" },
  { id: 21, name: "Umar Bakri", batch: "2020", major: "Manajemen", company: "KPMG", position: "Tax Consultant", location: "Jakarta", linkedin: "#" },
  { id: 22, name: "Vina Panduwinata", batch: "2018", major: "Manajemen", company: "Telkomsel", position: "Digital Strategy", location: "Jakarta", linkedin: "#" },
  { id: 23, name: "Wawan Hermawan", batch: "2017", major: "Manajemen", company: "PwC", position: "Deals Manager", location: "Jakarta", linkedin: "#" },
  { id: 24, name: "Xena War", batch: "2019", major: "Manajemen", company: "TikTok", position: "Creator Strategist", location: "Jakarta", linkedin: "#" },
  { id: 25, name: "Yulia Rahman", batch: "2016", major: "Manajemen", company: "Indofood", position: "Area Sales Manager", location: "Medan", linkedin: "#" },
  { id: 26, name: "Zaskia Gothic", batch: "2020", major: "Manajemen", company: "Blibli", position: "Category Manager", location: "Jakarta", linkedin: "#" },
  { id: 27, name: "Anang Hermansyah", batch: "2018", major: "Manajemen", company: "EY Indonesia", position: "Strategy Consultant", location: "Jakarta", linkedin: "#" },
  { id: 28, name: "Bunga Citra", batch: "2017", major: "Manajemen", company: "HM Sampoerna", position: "Financial Analyst", location: "Surabaya", linkedin: "#" },
  { id: 29, name: "Cakra Khan", batch: "2019", major: "Manajemen", company: "Bukalapak", position: "Product Designer", location: "Jakarta", linkedin: "#" },
  { id: 30, name: "Dina Lorenza", batch: "2016", major: "Manajemen", company: "CIMB Niaga", position: "Relationship Manager", location: "Jakarta", linkedin: "#" },
  { id: 31, name: "Edo Kondologit", batch: "2020", major: "Manajemen", company: "DBS Bank", position: "Wealth Management", location: "Jakarta", linkedin: "#" },
  { id: 32, name: "Ferry Irawan", batch: "2018", major: "Manajemen", company: "Standard Chartered", position: "Risk Compliance", location: "Jakarta", linkedin: "#" },
  { id: 33, name: "Gading Marten", batch: "2017", major: "Manajemen", company: "OVO", position: "Partnership Lead", location: "Jakarta", linkedin: "#" },
  { id: 34, name: "Hesti Purwadinata", batch: "2019", major: "Manajemen", company: "LinkAja", position: "Product Lead", location: "Jakarta", linkedin: "#" },
  { id: 35, name: "Ivan Gunawan", batch: "2016", major: "Manajemen", company: "Sinar Mas Land", position: "Real Estate Manager", location: "Tangerang", linkedin: "#" },
  { id: 36, name: "Jajang C Noer", batch: "2020", major: "Manajemen", company: "Agoda", position: "Market Manager", location: "Bangkok", linkedin: "#" },
  { id: 37, name: "Katon Bagaskara", batch: "2018", major: "Manajemen", company: "Visa Indonesia", position: "Client Support", location: "Jakarta", linkedin: "#" },
  { id: 38, name: "Lia Waode", batch: "2017", major: "Manajemen", company: "Mastercard", position: "Account Manager", location: "Jakarta", linkedin: "#" },
  { id: 39, name: "Mucle", batch: "2019", major: "Manajemen", company: "AirAsia", position: "Revenue Management", location: "Jakarta", linkedin: "#" },
  { id: 40, name: "Nagita Slavina", batch: "2016", major: "Manajemen", company: "Rans Entertainment", position: "CEO", location: "Jakarta", linkedin: "#" },
  { id: 41, name: "Olla Ramlan", batch: "2020", major: "Manajemen", company: "Zilingo", position: "Sourcing Manager", location: "Jakarta", linkedin: "#" },
  { id: 42, name: "Prilly Latuconsina", batch: "2018", major: "Manajemen", company: "Bellyto", position: "Founder", location: "Jakarta", linkedin: "#" },
  { id: 43, name: "Raffi Ahmad", batch: "2017", major: "Manajemen", company: "Rans Corp", position: "Chairman", location: "Jakarta", linkedin: "#" },
  { id: 44, name: "Syahrini", batch: "2019", major: "Manajemen", company: "Princess Syahrini Ent.", position: "Owner", location: "Jakarta", linkedin: "#" },
  { id: 45, name: "Titi DJ", batch: "2016", major: "Manajemen", company: "Music Bank", position: "Talent Manager", location: "Jakarta", linkedin: "#" },
  { id: 46, name: "Ussy Sulistiawaty", batch: "2020", major: "Manajemen", company: "Ussy Cosmetics", position: "Director", location: "Jakarta", linkedin: "#" },
  { id: 47, name: "Vidi Aldiano", batch: "2018", major: "Manajemen", company: "VA Management", position: "Manager", location: "Jakarta", linkedin: "#" },
  { id: 48, name: "Widyawati", batch: "2017", major: "Manajemen", company: "Senior Living", position: "Consultant", location: "Jakarta", linkedin: "#" },
  { id: 49, name: "Yuni Shara", batch: "2019", major: "Manajemen", company: "Yuni Corp", position: "Principal", location: "Jakarta", linkedin: "#" },
  { id: 50, name: "Zidan Ibrahim", batch: "2016", major: "Manajemen", company: "Tako", position: "Social Media Specialist", location: "Jakarta", linkedin: "#" },
];

export function AlumniDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredAlumni = ALUMNI_DATA.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === "All" || alumni.batch === filterBatch;
    return matchesSearch && matchesBatch;
  });

  // Pagination Logic
  const totalItems = filteredAlumni.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBatch, itemsPerPage]);

  const exportToCSV = () => {
    if (filteredAlumni.length === 0) return;

    // CSV Headers
    const headers = ["ID", "Name", "Batch", "Major", "Company", "Position", "Location", "Email", "LinkedIn"];
    
    // CSV Rows
    const rows = filteredAlumni.map(alumni => [
      alumni.id,
      alumni.name,
      alumni.batch,
      alumni.major,
      alumni.company,
      alumni.position,
      alumni.location,
      alumni.email || "",
      alumni.linkedin || ""
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Alumni_Database_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-[#081C36] text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 font-inter uppercase tracking-[0.3em] text-xs mb-4"
          >
            IKAMMA FEB UGM
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-inter font-bold tracking-tighter"
          >
            Alumni Database
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/70 max-w-2xl mx-auto text-lg font-inter"
          >
            Menghubungkan generasi alumni Manajemen FEB UGM untuk membangun jaringan profesional yang kuat dan berkelanjutan.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 lg:px-12 border-b border-[#081C36]/10 bg-white">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#081C36]/40 group-focus-within:text-[#081C36] transition-colors" />
              <input 
                type="text" 
                placeholder="Cari nama atau perusahaan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-[#081C36]/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#081C36]/10 focus:bg-white transition-all font-inter"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-[#f8fafc] px-4 py-4 rounded-2xl border border-[#081C36]/5">
              <span className="text-xs font-bold text-[#081C36]/40 uppercase tracking-widest pl-2">Show</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-transparent focus:outline-none font-inter text-sm font-semibold text-[#081C36] cursor-pointer px-2"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#f8fafc] px-4 py-4 rounded-2xl border border-[#081C36]/5">
              <Filter className="w-4 h-4 text-[#081C36]/40" />
              <select 
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="bg-transparent focus:outline-none font-inter text-sm font-semibold text-[#081C36] cursor-pointer"
              >
                <option value="All">Semua Angkatan</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
              </select>
            </div>
            
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-[#081C36] text-white px-6 py-4 rounded-2xl hover:bg-[#081C36]/90 transition-all shadow-lg shadow-[#081C36]/10 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="font-semibold text-sm font-inter">Export</span>
            </button>
          </div>
        </div>
      </section>

      {/* Database Table */}
      <section className="py-12 px-6 lg:px-12 bg-[#fcfdfe]">
        <div className="max-w-[1400px] mx-auto overflow-hidden bg-white border border-[#081C36]/10 rounded-[2rem] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#081C36]/10">
                  <th className="px-8 py-6 text-xs uppercase tracking-[0.2em] font-bold text-[#081C36]/50 font-inter">Alumni</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-[0.2em] font-bold text-[#081C36]/50 font-inter">Angkatan</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-[0.2em] font-bold text-[#081C36]/50 font-inter">Perusahaan & Posisi</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-[0.2em] font-bold text-[#081C36]/50 font-inter text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#081C36]/5">
                {currentItems.map((alumni) => (
                  <motion.tr 
                    key={alumni.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hover:bg-[#f8fafc]/50 transition-colors group cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#081C36]/10 to-[#081C36]/5 flex items-center justify-center font-bold text-[#081C36] font-inter text-lg">
                          {alumni.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#081C36] font-inter">{alumni.name}</h3>
                          <p className="text-[#081C36]/40 text-xs font-inter">{alumni.major}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-[#081C36]/5 text-[#081C36] rounded-full text-xs font-bold font-inter">
                        {alumni.batch}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#081C36] font-inter">{alumni.company}</span>
                        <span className="text-[#081C36]/60 text-sm font-inter">{alumni.position} • {alumni.location}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        {alumni.linkedin && (
                          <a 
                            href={alumni.linkedin} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[#081C36]/40 hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-all duration-300"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                          </a>
                        )}
                        {alumni.email && (
                          <a 
                            href={`mailto:${alumni.email}`} 
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[#081C36]/40 hover:text-[#081C36] hover:bg-[#081C36]/5 transition-all duration-300"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" strokeWidth={1.5} />
                          </a>
                        )}
                        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#081C36]/40 hover:text-[#081C36] hover:bg-[#081C36]/5 transition-all duration-300 opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {filteredAlumni.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[#081C36]/40 font-inter italic">Tidak ada alumni yang sesuai dengan pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="max-w-[1400px] mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#081C36]/40 font-inter font-medium">
            Showing <span className="text-[#081C36] font-bold">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}</span> of <span className="text-[#081C36] font-bold">{totalItems}</span> alumni
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-2xl border border-[#081C36]/10 flex items-center justify-center text-[#081C36] hover:bg-[#f8fafc] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Only show current, first, last, and pages around current
                  if (
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-12 h-12 rounded-2xl font-bold font-inter text-sm transition-all ${
                          currentPage === page 
                            ? "bg-[#081C36] text-white shadow-lg shadow-[#081C36]/20" 
                            : "text-[#081C36] hover:bg-[#f8fafc]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 || 
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-1 text-[#081C36]/20">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-2xl border border-[#081C36]/10 flex items-center justify-center text-[#081C36] hover:bg-[#f8fafc] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
