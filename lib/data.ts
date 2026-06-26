export const businessInfo = {
  name: "Fixaro",
  fullName: "Fixaro AC Service Company",
  tagline: "Clear price. Clean work. Written warranty.",
  city: "Bangalore",
  regionName: "Bengaluru",
  mainPhoneDisplay: "+91 91879 72801",
  secondPhoneDisplay: "+91 91879 72802",
  mainPhoneHref: "tel:+919187972801",
  secondPhoneHref: "tel:+919187972802",
  whatsappNumber: "919187972801",
} as const;

export const serviceCategories = ["AC Service", "AC Repair", "Gas Refilling", "Installation"] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type Service = {
  name: string;
  slug: string;
  category: ServiceCategory;
  price: string;
  warranty: string;
  duration: string;
  description: string;
  includes: string[];
  image: string;
  importantNote?: string;
  extraChargeNote?: string;
};

export const services: Service[] = [
  {
    name: "Essential AC Service",
    slug: "essential-ac-service",
    category: "AC Service",
    price: "₹499",
    warranty: "7 Days Service Warranty",
    duration: "60 mins",
    description: "Regular AC maintenance for better cooling and cleaner airflow.",
    includes: [
      "Filter and front panel cleaning",
      "Cooling and airflow check",
      "Basic indoor unit inspection",
      "Final function check",
    ],
    image: "/images/split-ac-service.svg",
  },
  {
    name: "Deep Cleaning Service",
    slug: "deep-cleaning-service",
    category: "AC Service",
    price: "₹649",
    warranty: "15 Days Service Warranty",
    duration: "60–75 mins",
    description: "Deep cleaning for dusty ACs, weak airflow, and smoother cooling.",
    includes: [
      "Indoor unit deep cleaning",
      "Coil and blower cleaning",
      "Drain tray cleaning",
      "Final cooling check",
    ],
    image: "/images/deep-cleaning.svg",
  },
  {
    name: "Water Leakage Service",
    slug: "water-leakage-service",
    category: "AC Service",
    price: "₹699",
    warranty: "10 Days Service Warranty",
    duration: "45–60 mins",
    description: "Diagnosis and service for water dripping or leakage from AC.",
    includes: ["Drain pipe check", "Drain tray cleaning", "Blockage inspection", "Leakage test after service"],
    image: "/images/water-leakage.svg",
  },
  {
    name: "Dust Removal Service",
    slug: "dust-removal-service",
    category: "AC Service",
    price: "₹399",
    warranty: "7 Days Service Warranty",
    duration: "40–50 mins",
    description: "Quick cleaning for dust buildup and low airflow.",
    includes: ["Filter cleaning", "Front panel cleaning", "Dust removal from accessible areas", "Airflow check"],
    image: "/images/dust-removal.svg",
  },
  {
    name: "AC Check-up / Inspection",
    slug: "ac-checkup-inspection",
    category: "AC Repair",
    price: "₹399",
    warranty: "No Warranty",
    duration: "30–45 mins",
    description: "Professional AC inspection and issue diagnosis before repair.",
    includes: ["AC condition check", "Cooling diagnosis", "Electrical and basic safety check", "Repair estimate before work"],
    image: "/images/technician-check.svg",
  },
  {
    name: "Power Issue Repair",
    slug: "power-issue-repair",
    category: "AC Repair",
    price: "₹399",
    warranty: "30 Days Service Warranty",
    duration: "45–90 mins",
    description: "Service for AC not turning on or electrical power issues.",
    includes: [
      "Power supply check",
      "Wiring and connection inspection",
      "Indoor/outdoor communication check",
      "Final power-on test",
    ],
    image: "/images/ac-repair.svg",
  },
  {
    name: "Stabilizer Fitting",
    slug: "stabilizer-fitting",
    category: "AC Repair",
    price: "₹399",
    warranty: "10 Days Service Warranty",
    duration: "30–45 mins",
    description: "Stabilizer installation/fitting support for safer AC operation.",
    includes: ["Stabilizer placement", "Connection check", "Voltage safety check", "Final operation check"],
    image: "/images/ac-repair.svg",
  },
  {
    name: "Less / No Cooling Repair",
    slug: "less-no-cooling-repair",
    category: "AC Repair",
    price: "₹299",
    warranty: "30 Days Service Warranty",
    duration: "45–90 mins",
    description: "Diagnosis and repair support for AC cooling problems.",
    includes: [
      "Cooling performance check",
      "Gas pressure indication check",
      "Coil and airflow inspection",
      "Repair quote before extra work",
    ],
    image: "/images/ac-repair.svg",
  },
  {
    name: "Complete Gas Charging",
    slug: "complete-gas-charging",
    category: "Gas Refilling",
    price: "₹2,799",
    warranty: "60 Days Warranty, leak-free system only",
    duration: "90–150 mins",
    description: "Complete AC gas charging after system checks.",
    includes: ["Pressure check", "Leak indication check", "Gas charging", "Cooling performance test"],
    importantNote: "Warranty applies only when the AC system is leak-free.",
    image: "/images/gas-refilling.svg",
  },
  {
    name: "Gas Top-up",
    slug: "gas-top-up",
    category: "Gas Refilling",
    price: "₹1,799",
    warranty: "30 Days Warranty, leak-free system only",
    duration: "60–90 mins",
    description: "Gas top-up for eligible ACs with low gas level.",
    includes: ["Pressure check", "Top-up gas filling", "Cooling check", "Technician recommendation"],
    importantNote: "Warranty applies only when the AC system is leak-free.",
    image: "/images/gas-refilling.svg",
  },
  {
    name: "Split AC Installation",
    slug: "split-ac-installation",
    category: "Installation",
    price: "₹1,799",
    warranty: "30 Days Workmanship Warranty",
    duration: "120–180 mins",
    description: "Split AC installation by trained technician with workmanship warranty.",
    includes: ["Indoor unit mounting", "Outdoor unit placement support", "Drain pipe setup", "Basic connection and testing"],
    extraChargeNote:
      "Copper pipe, stand, extra wire, drain pipe, core cutting, spare parts, and additional materials are charged extra after approval.",
    image: "/images/ac-installation.svg",
  },
  {
    name: "Split AC Uninstallation",
    slug: "split-ac-uninstallation",
    category: "Installation",
    price: "₹999",
    warranty: "7 Days Workmanship Warranty",
    duration: "60–90 mins",
    description: "Safe split AC uninstallation for shifting or replacement.",
    includes: ["Indoor and outdoor unit removal", "Gas lock support where possible", "Basic packing guidance", "Site cleanup"],
    image: "/images/ac-installation.svg",
  },
];

export const globalPriceNote =
  "Spare parts, copper pipe, outdoor stand, drain pipe, electrical wire, gas leakage repair, core cutting, and any replaced parts are charged extra after customer approval.";

export const warrantyData = {
  "AC Service Warranty": {
    "AC Service": "7 Days Service Warranty",
    "Deep Cleaning": "15 Days Service Warranty",
    "Water Leakage Service": "10 Days Service Warranty",
    "Dust Removal Service": "7 Days Service Warranty",
  },
  "AC Repair Warranty": {
    "Check-up/Inspection": "No Warranty",
    "Power Issue Repair": "30 Days Service Warranty",
    "Stabilizer Fitting": "10 Days Service Warranty",
    "Less/No Cooling Repair": "30 Days Service Warranty",
  },
  "Gas Refilling Warranty": {
    "Gas Top-Up": "30 Days Warranty, leak-free system only",
    "Complete Gas Charging": "60 Days Warranty, leak-free system only",
  },
  "Installation Warranty": {
    "Split AC Installation": "30 Days Workmanship Warranty",
    "Split AC Uninstallation": "7 Days Workmanship Warranty",
    "Window AC Installation": "30 Days Workmanship Warranty",
    "Window AC Uninstallation": "7 Days Workmanship Warranty",
  },
} as const;

export type WarrantyBadge = "none" | "service" | "repair" | "gas" | "workmanship";

export type WarrantyGroup = {
  title: string;
  description?: string;
  items: {
    service: string;
    warranty: string;
    badge?: WarrantyBadge;
    note?: string;
  }[];
};

export const warrantyGroups: WarrantyGroup[] = [
  {
    title: "AC Service Warranty",
    description: "Routine cleaning and service-related workmanship coverage.",
    items: [
      { service: "AC Service", warranty: warrantyData["AC Service Warranty"]["AC Service"], badge: "service" },
      { service: "Deep Cleaning", warranty: warrantyData["AC Service Warranty"]["Deep Cleaning"], badge: "service" },
      {
        service: "Water Leakage Service",
        warranty: warrantyData["AC Service Warranty"]["Water Leakage Service"],
        badge: "service",
      },
      { service: "Dust Removal Service", warranty: warrantyData["AC Service Warranty"]["Dust Removal Service"], badge: "service" },
    ],
  },
  {
    title: "AC Repair Warranty",
    description: "Repair service warranty depends on the issue diagnosed and service performed.",
    items: [
      { service: "Check-up/Inspection", warranty: warrantyData["AC Repair Warranty"]["Check-up/Inspection"], badge: "none" },
      { service: "Power Issue Repair", warranty: warrantyData["AC Repair Warranty"]["Power Issue Repair"], badge: "repair" },
      { service: "Stabilizer Fitting", warranty: warrantyData["AC Repair Warranty"]["Stabilizer Fitting"], badge: "repair" },
      {
        service: "Less/No Cooling Repair",
        warranty: warrantyData["AC Repair Warranty"]["Less/No Cooling Repair"],
        badge: "repair",
      },
    ],
  },
  {
    title: "Gas Refilling Warranty",
    description: "Gas warranty applies only when the AC system is leak-free.",
    items: [
      {
        service: "Gas Top-Up",
        warranty: warrantyData["Gas Refilling Warranty"]["Gas Top-Up"],
        badge: "gas",
        note: "Leak-free system only",
      },
      {
        service: "Complete Gas Charging",
        warranty: warrantyData["Gas Refilling Warranty"]["Complete Gas Charging"],
        badge: "gas",
        note: "Leak-free system only",
      },
    ],
  },
  {
    title: "Installation Warranty",
    description: "Workmanship warranty for installation and uninstallation support.",
    items: [
      {
        service: "Split AC Installation",
        warranty: warrantyData["Installation Warranty"]["Split AC Installation"],
        badge: "workmanship",
      },
      {
        service: "Split AC Uninstallation",
        warranty: warrantyData["Installation Warranty"]["Split AC Uninstallation"],
        badge: "workmanship",
      },
      {
        service: "Window AC Installation",
        warranty: warrantyData["Installation Warranty"]["Window AC Installation"],
        badge: "workmanship",
      },
      {
        service: "Window AC Uninstallation",
        warranty: warrantyData["Installation Warranty"]["Window AC Uninstallation"],
        badge: "workmanship",
      },
    ],
  },
];

export const warrantyHighlights = [
  "Written warranty terms before booking",
  "Service workmanship coverage",
  "Gas warranty on leak-free systems only",
  "No warranty on inspection/check-up",
  "Spare parts are not covered unless separately mentioned",
] as const;

export const warrantyExclusion =
  "Warranty covers service workmanship only. Spare parts, physical damage, voltage fluctuations, rodent damage, misuse, and customer-side installation changes are not covered under warranty.";

export const trustBarItems = [
  {
    title: "Transparent Pricing",
    description: "Service charges are shown before booking.",
  },
  {
    title: "Pre-Service Checks",
    description: "Technician checks the issue before extra work.",
  },
  {
    title: "Post-Service Cleanup",
    description: "Clean work process after service.",
  },
  {
    title: "Written Warranty Terms",
    description: "Warranty duration is clearly mentioned.",
  },
  {
    title: "Direct Support",
    description: "Call or WhatsApp Fixaro directly.",
  },
] as const;

export const processSteps = [
  {
    title: "Choose Service",
    description: "Select AC service, repair, gas refilling, installation or uninstallation based on your need.",
  },
  {
    title: "Book Slot",
    description: "Call Fixaro or book on WhatsApp with your area, AC type and preferred time.",
  },
  {
    title: "Technician Visit",
    description: "Our technician checks your AC and confirms any extra charges before additional work.",
  },
  {
    title: "Service + Final Check",
    description: "We complete the service, clean the work area and test cooling or function before leaving.",
  },
  {
    title: "Warranty Support",
    description: "Eligible services are covered as per Fixaro's written warranty terms.",
  },
] as const;

export const serviceAreas = [
  "Whitefield",
  "HSR Layout",
  "Koramangala",
  "Indiranagar",
  "Marathahalli",
  "Electronic City",
  "Bellandur",
  "Hebbal",
  "Jayanagar",
  "JP Nagar",
  "Banaswadi",
  "Frazer Town",
  "Lingarajapuram",
  "Kammanahalli",
  "Kalyan Nagar",
  "HBR Layout",
  "HRBR Layout",
  "Cox Town",
  "Cooke Town",
  "Richards Town",
  "Hennur",
  "Horamavu",
  "Ramamurthy Nagar",
  "RT Nagar",
  "Shivajinagar",
  "Malleshwaram",
  "Rajajinagar",
  "Banashankari",
  "Brookefield",
  "Mahadevapura",
  "Domlur",
  "Sarjapur Road",
  "Yelahanka",
  "BTM Layout",
  "KR Puram",
] as const;

export const featuredServiceAreas = [
  "Whitefield",
  "HSR Layout",
  "Koramangala",
  "Indiranagar",
  "Marathahalli",
  "Electronic City",
  "Bellandur",
  "Hebbal",
  "Jayanagar",
  "JP Nagar",
  "Banaswadi",
  "Frazer Town",
] as const;

export const serviceAreaAliases: Record<string, string[]> = {
  "Frazer Town": ["Fraser Town"],
  Lingarajapuram: ["Lingaraj Puram"],
};

export const acBrands = [
  "Voltas",
  "LG",
  "Samsung",
  "Daikin",
  "Blue Star",
  "Hitachi",
  "Carrier",
  "Lloyd",
  "Panasonic",
  "Whirlpool",
  "Haier",
  "Godrej",
  "Onida",
  "O General",
  "Mitsubishi",
  "Toshiba",
] as const;

export const faqCategories = ["All", "Pricing", "Warranty", "Repair", "Gas", "Installation", "Booking", "Areas"] as const;

export type FAQCategory = Exclude<(typeof faqCategories)[number], "All">;

export type FAQItem = {
  question: string;
  answer: string;
  categories: FAQCategory[];
};

export const faqItems: FAQItem[] = [
  {
    question: "What is the AC service charge?",
    answer:
      "Fixaro AC Service starts from ₹499. Deep Cleaning starts from ₹649, Dust Removal starts from ₹399, and Water Leakage Service starts from ₹699. Final charges may vary if spare parts, gas leakage repair, copper pipe, stand, core cutting, extra wire, drain pipe or other materials are required.",
    categories: ["Pricing"],
  },
  {
    question: "Do you provide service warranty?",
    answer:
      "Yes. Warranty depends on the service. AC Service has 7 Days Service Warranty, Deep Cleaning has 15 Days Service Warranty, Water Leakage Service has 10 Days Service Warranty, selected repair services have up to 30 Days Service Warranty, and Complete Gas Charging has 60 Days Warranty on leak-free systems.",
    categories: ["Warranty"],
  },
  {
    question: "What is not covered under warranty?",
    answer:
      "Warranty covers service workmanship only. Spare parts, physical damage, voltage fluctuations, rodent damage, misuse, customer-side installation changes and tampering are not covered under warranty.",
    categories: ["Warranty"],
  },
  {
    question: "Is AC check-up or inspection covered under warranty?",
    answer:
      "No. AC Check-up / Inspection has no warranty because it is a diagnosis visit. Any repair or service performed after inspection will follow the warranty terms of that specific service.",
    categories: ["Warranty"],
  },
  {
    question: "Are spare parts included in the service price?",
    answer:
      "No. Spare parts and extra materials are charged separately after customer approval. Fixaro does not replace parts without confirming the extra charge with the customer.",
    categories: ["Pricing"],
  },
  {
    question: "Is inspection charge adjusted in repair?",
    answer:
      "Inspection charges are separate unless Fixaro confirms an adjustment at the time of booking or before the repair work starts.",
    categories: ["Pricing"],
  },
  {
    question: "Does gas refilling come with warranty?",
    answer:
      "Yes, but only on leak-free systems. Gas Top-up has 30 Days Warranty on a leak-free system, and Complete Gas Charging has 60 Days Warranty on a leak-free system. If the AC has leakage or the system is not leak-free, leakage repair may be required first.",
    categories: ["Warranty", "Gas"],
  },
  {
    question: "My AC is not cooling. Which service should I book?",
    answer:
      "You can book Less / No Cooling Repair starting from ₹299, or book AC Check-up / Inspection if the issue is unclear. The technician will check airflow, cooling performance, gas pressure indication and other possible causes before suggesting extra work.",
    categories: ["Repair"],
  },
  {
    question: "My AC is leaking water. Which service should I choose?",
    answer:
      "Choose Water Leakage Service starting from ₹699. It includes drain pipe check, drain tray cleaning, blockage inspection and leakage test after service.",
    categories: ["Repair"],
  },
  {
    question: "Do you service both split AC and window AC?",
    answer:
      "Yes. Fixaro supports split and window AC service, repair, installation and uninstallation. Window AC installation and uninstallation warranty terms are also mentioned in the Fixaro warranty section.",
    categories: ["Installation"],
  },
  {
    question: "What is included in Split AC Installation?",
    answer:
      "Split AC Installation starts from ₹1,799 and includes indoor unit mounting, outdoor unit placement support, drain pipe setup, basic connection and testing. Copper pipe, outdoor stand, extra wire, drain pipe, core cutting, spare parts and additional materials are charged extra after approval.",
    categories: ["Installation"],
  },
  {
    question: "Which AC brands do you service?",
    answer:
      "Fixaro services popular AC brands such as Voltas, LG, Samsung, Daikin, Blue Star, Hitachi, Carrier, Lloyd, Panasonic, Whirlpool, Haier, Godrej, Onida, O General, Mitsubishi and Toshiba. Brand names are shown only to indicate service compatibility, not official partnership.",
    categories: ["Areas"],
  },
  {
    question: "Which areas in Bangalore do you serve?",
    answer:
      "Fixaro serves major Bangalore localities including Whitefield, HSR Layout, Koramangala, Indiranagar, Marathahalli, Electronic City, Bellandur, Hebbal, Jayanagar, JP Nagar, Banaswadi, Frazer Town and nearby areas. Availability depends on technician slots and exact location.",
    categories: ["Areas"],
  },
  {
    question: "Do you provide same-day AC service?",
    answer:
      "Same-day slots may be available depending on your area, technician availability and service type. Please call or message Fixaro on WhatsApp to confirm the available slots.",
    categories: ["Booking"],
  },
  {
    question: "How do I book Fixaro AC service?",
    answer:
      "You can book through the website form, call +91 91879 72801, call the second number +91 91879 72802, or message Fixaro on WhatsApp. Fixaro will confirm service availability before the visit.",
    categories: ["Booking"],
  },
  {
    question: "Will the technician clean the work area after service?",
    answer:
      "Fixaro follows a clean work process. After service, the technician performs a final function check and basic cleanup of the service area. Full home cleaning or wall repair is not included.",
    categories: ["Booking"],
  },
];
