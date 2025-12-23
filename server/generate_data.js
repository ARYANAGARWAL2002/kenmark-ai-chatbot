const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const faqs = [
    { Category: "General", Question: "What services does Kenmark ITan Solutions provide?", Answer: "We provide a full suite of IT services including Web and Mobile App Development, Cloud Hosting (Shared, VPS, Dedicated), Digital Marketing, UI/UX Design, and IT Consultancy." },
    { Category: "Contact", Question: "How can I contact sales or support?", Answer: "You can call us at +91 98202 83097 or email us at tan@kenmark.in. You can also visit our office in Goregaon West, Mumbai." },
    { Category: "Support", Question: "Do you offer 24/7 support?", Answer: "Yes, we provide 24/7 dedicated support to ensure your business and hosting services run smoothly at all times." },
    { Category: "Services", Question: "Can you handle custom software projects?", Answer: "Absolutely. We specialize in custom development projects, including ERP solutions, Blockchain, and tailor-made accounting systems." },
    { Category: "Industries", Question: "What industries do you work with?", Answer: "We serve a wide range of industries including Real Estate, Health & Fitness, Food & Beverages, Marine, and the Public Sector." },
    { Category: "Careers", Question: "Do you provide internship or career opportunities?", Answer: "Yes, we have a Summer Internship Program, KiTS Classroom, and KiTS Hackathon initiatives. Check our 'Careers' section for more." },
    { Category: "General", Question: "What is your turnaround time for projects?", Answer: "We pride ourselves on fast turnaround times, delivering projects within agreed budgets and deadlines without compromising quality." },
    { Category: "Location", Question: "Where is your office located?", Answer: "Our office is located at 601-604, Chaitanya CHS LTD, Near Ram Mandir Signal, Goregaon West, Mumbai - 400104." }
];

const services = [
    { Category: "Development", Question: "Web & App Development", Answer: "Includes Web Development, Mobile Apps (Flutter), eCommerce, and Web App Development." },
    { Category: "Development", Question: "Specialized Solutions", Answer: "Blockchain Solutions, ERP Solutions, and Custom Development Projects." },
    { Category: "Hosting", Question: "Web Hosting", Answer: "Shared Hosting, VPS, Dedicated Servers, and Private Cloud Storage." },
    { Category: "Email", Question: "Communication", Answer: "Private Email and Google Workspace setup." },
    { Category: "Design", Question: "UI/UX & Graphics", Answer: "Landing Page Development, Portfolio Website Design, and Branding solutions." },
    { Category: "Marketing", Question: "Digital Marketing", Answer: "SEO (Search Engine Optimization), SMM (Social Media Marketing), and offline marketing." },
    { Category: "Consultancy", Question: "IT Advisory", Answer: "Third-party guidance, feedback, and technical advice for business infrastructure." },
    { Category: "Systems", Question: "Finance", Answer: "Accounting & Finance Systems development." },
    { Category: "Tech Stack", Question: "Our Toolkit", Answer: "NodeJS, ExpressJS, Bootstrap, MySQL, Flutter, Angular, Next.js, React.js, Tailwind CSS, MongoDB, WordPress, and Figma." }
];

const about = [
    { Category: "Company Info", Question: "Company Name", Answer: "Kenmark ITan Solutions (KiTS)" },
    { Category: "Company Info", Question: "Tagline", Answer: "One Stop Shop for all your IT Solutions." },
    { Category: "Company Info", Question: "Mission", Answer: "Delivering comprehensive IT services with cutting-edge technology and exceptional support to drive business forward." },
    { Category: "Company Info", Question: "Address", Answer: "601-604, Chaitanya CHS LTD, Near Ram Mandir Signal, Goregaon West, Mumbai - 400104." },
    { Category: "Company Info", Question: "Phone", Answer: "+91 98202 83097" },
    { Category: "Company Info", Question: "Email", Answer: "tan@kenmark.in" },
    { Category: "Company Info", Question: "Core Values", Answer: "Exceptional customer service, 24/7 support, clear communication, and tailor-made solutions." },
    { Category: "Company Info", Question: "Industries Served", Answer: "IT, Arts, Food & Beverages, Health & Fitness, Real Estate, Security, Public Sector, and Marine." }
];

function createSheet(data, fileName) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, path.join(dataDir, fileName));
    console.log(`Created ${fileName}`);
}

createSheet(faqs, 'faq.xlsx');
createSheet(services, 'services.xlsx');
createSheet(about, 'about.xlsx');
