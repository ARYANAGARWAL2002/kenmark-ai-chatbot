const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// 1. about.xlsx
const aboutData = [
    { "Field": "Company Name", "Content": "Kenmark ITan Solutions (KiTS)" },
    { "Field": "Tagline", "Content": "One Stop Shop for all your IT Solutions." },
    { "Field": "Mission", "Content": "Delivering comprehensive IT services with cutting-edge technology and exceptional support to drive business forward." },
    { "Field": "Address", "Content": "601-604, Chaitanya CHS LTD, Near Ram Mandir Signal, Goregaon West, Mumbai - 400104." },
    { "Field": "Phone", "Content": "+91 98202 83097" },
    { "Field": "Email", "Content": "tan@kenmark.in" },
    { "Field": "Core Values", "Content": "Exceptional customer service, 24/7 support, clear communication, and tailor-made solutions." },
    { "Field": "Industries Served", "Content": "IT, Arts, Food & Beverages, Health & Fitness, Real Estate, Security, Public Sector, and Marine." }
];

// 2. services.xlsx
// Note: "Details/Description" mapped to "Details" for simpler key access
const servicesData = [
    { "Category": "Development", "Service Name": "Web & App Development", "Details": "Includes Web Development, Mobile Apps (Flutter), eCommerce, and Web App Development." },
    { "Category": "Development", "Service Name": "Specialized Solutions", "Details": "Blockchain Solutions, ERP Solutions, and Custom Development Projects." },
    { "Category": "Hosting", "Service Name": "Web Hosting", "Details": "Shared Hosting, VPS, Dedicated Servers, and Private Cloud Storage." },
    { "Category": "Email", "Service Name": "Communication", "Details": "Private Email and Google Workspace setup." },
    { "Category": "Design", "Service Name": "UI/UX & Graphics", "Details": "Landing Page Development, Portfolio Website Design, and Branding solutions." },
    { "Category": "Marketing", "Service Name": "Digital Marketing", "Details": "SEO (Search Engine Optimization), SMM (Social Media Marketing), and offline marketing." },
    { "Category": "Consultancy", "Service Name": "IT Advisory", "Details": "Third-party guidance, feedback, and technical advice for business infrastructure." },
    { "Category": "Systems", "Service Name": "Finance", "Details": "Accounting & Finance Systems development." },
    { "Category": "Tech Stack", "Service Name": "Our Toolkit", "Details": "NodeJS, ExpressJS, Bootstrap, MySQL, Flutter, Angular, Next.js, React.js, Tailwind CSS, MongoDB, WordPress, and Figma." }
];

// 3. faq.xlsx
const faqData = [
    { "Question": "What services does Kenmark ITan Solutions provide?", "Answer": "We provide a full suite of IT services including Web and Mobile App Development, Cloud Hosting (Shared, VPS, Dedicated), Digital Marketing, UI/UX Design, and IT Consultancy." },
    { "Question": "How can I contact sales or support?", "Answer": "You can call us at +91 98202 83097 or email us at tan@kenmark.in. You can also visit our office in Goregaon West, Mumbai." },
    { "Question": "Do you offer 24/7 support?", "Answer": "Yes, we provide 24/7 dedicated support to ensure your business and hosting services run smoothly at all times." },
    { "Question": "Can you handle custom software projects?", "Answer": "Absolutely. We specialize in custom development projects, including ERP solutions, Blockchain, and tailor-made accounting systems." },
    { "Question": "What industries do you work with?", "Answer": "We serve a wide range of industries including Real Estate, Health & Fitness, Food & Beverages, Marine, and the Public Sector." },
    { "Question": "Do you provide internship or career opportunities?", "Answer": "Yes, we have a Summer Internship Program, KiTS Classroom, and KiTS Hackathon initiatives. Check our \"Careers\" section for more." },
    { "Question": "What is your turnaround time for projects?", "Answer": "We pride ourselves on fast turnaround times, delivering projects within agreed budgets and deadlines without compromising quality." },
    { "Question": "Where is your office located?", "Answer": "Our office is located at 601-604, Chaitanya CHS LTD, Near Ram Mandir Signal, Goregaon West, Mumbai - 400104." }
];

function writeExcel(filename, data) {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    const filePath = path.join(dataDir, filename);
    xlsx.writeFile(wb, filePath);
    console.log(`Created ${filename} with ${data.length} entries.`);
}

try {
    writeExcel('about.xlsx', aboutData);
    writeExcel('services.xlsx', servicesData);
    writeExcel('faq.xlsx', faqData);
    console.log("✅ All data files created successfully.");
} catch (error) {
    console.error("❌ Error creating files:", error);
}
