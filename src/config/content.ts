// ═══════════════════════════════════════════════════════════════
//  SITE CONTENT — container-transport focused.
//  Services, industries, container types, process, stats, FAQs,
//  testimonials, certifications, coverage, promise and partners.
//  All editable website content lives here or in company.ts.
//  Components should contain layout/rendering only.
// ═══════════════════════════════════════════════════════════════

import { images } from "./images";

export type IconName =
  | "container"
  | "anchor"
  | "ship"
  | "truck"
  | "arrow-left-right"
  | "boxes"
  | "weight"
  | "building-2";

export interface Service {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  description: string;
  idealFor: string;
  whyTitan: string;
  typicalFreight: string[];
  process: string[];
  benefits: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "container-transport",
    title: "Container Transport",
    icon: "container",
    summary:
      "Laden and empty 20ft and 40ft container movement between the ports and your facility.",
    description:
      "Container transport is the core of what we do. We move laden and empty 20ft and 40ft boxes between Ports of Auckland, inland depots and your site on skeletal and tri-axle trailers, with dispatch tracking every leg so your containers arrive exactly when your operation needs them.",
    idealFor:
      "Importers, exporters and forwarders moving 20ft and 40ft containers between the Auckland ports and their facility.",
    whyTitan:
      "A dedicated skeletal and tri-axle fleet with live tracking on every unit — so you always know where your box is and when it will land.",
    typicalFreight: ["20ft & 40ft laden containers", "Empty containers", "High-cube boxes", "Palletised import cargo"],
    process: ["Confirm box size and weight", "Book pickup and delivery window", "Track cartage through dispatch", "Close out POD and empty return"],
    benefits: ["20ft & 40ft skeletal trailer fleet", "Laden and empty container movement", "Live GPS tracking on every unit", "Wharf-to-door scheduling"],
    image: images.containerTruck,
  },
  {
    slug: "port-cartage",
    title: "Port Cartage",
    icon: "anchor",
    summary:
      "Direct wharf-to-door and door-to-wharf runs across the Auckland port network.",
    description:
      "We run daily between the Auckland waterfront, MetroPort and surrounding depots. Whether it's a time-critical import off a vessel or an export that must make cut-off, our drivers know the port protocols, VBS bookings and terminal flows that keep your freight on schedule.",
    idealFor:
      "Businesses needing time-critical wharf-to-door and door-to-wharf runs across the Auckland port network.",
    whyTitan:
      "Drivers who know the terminal protocols, VBS bookings and cut-offs cold — your freight makes the window without you chasing it.",
    typicalFreight: ["Import off-wharf containers", "Export to-wharf containers", "MetroPort shuttles", "Time-critical vessel work"],
    process: ["Check vessel and slot timing", "Manage terminal booking", "Collect or deliver at port", "Update dispatch through completion"],
    benefits: ["VBS & terminal booking managed", "Import off-wharf & export to-wharf", "Cut-off deadline discipline", "MetroPort & depot connectivity"],
    image: images.cranesVessel,
  },
  {
    slug: "import-export-logistics",
    title: "Import & Export Logistics",
    icon: "arrow-left-right",
    summary:
      "End-to-end coordination synced to customs, MPI and shipping schedules.",
    description:
      "For importers and exporters, timing is everything. We coordinate the road leg around your customs clearance, MPI requirements and shipping line schedules — giving you one accountable partner from vessel to warehouse and back to the wharf.",
    idealFor:
      "Importers, exporters, customs brokers and freight forwarders who need the road leg aligned to clearance, vessel and warehouse timing.",
    whyTitan:
      "Our dispatch team coordinates around customs, MPI and shipping schedules so one accountable partner owns the container movement end to end.",
    typicalFreight: ["Import containers", "Export containers", "MPI-directed freight", "Transload and unpack work"],
    process: ["Align clearance status", "Plan road leg to schedule", "Coordinate site requirements", "Report completion promptly"],
    benefits: ["Customs & MPI-aware handling", "Shipping-line schedule alignment", "Transload & unpack coordination", "Single point of accountability"],
    image: images.portOperations,
  },
  {
    slug: "heavy-freight",
    title: "Heavy Freight",
    icon: "weight",
    summary:
      "Over-weight and out-of-gauge loads moved with the right trailers and permits.",
    description:
      "Heavy and out-of-gauge freight demands the right equipment and planning. We match your load to the correct trailer configuration, arrange permits and pilots where required, and move it safely — from heavy machinery to over-weight containers and industrial plant.",
    idealFor:
      "Construction, manufacturing and industrial clients moving machinery, plant, heavy containers or non-standard freight.",
    whyTitan:
      "We plan the equipment, permits and load restraint before the truck rolls, keeping heavy freight controlled, compliant and safe.",
    typicalFreight: ["Heavy containers", "Plant and machinery", "Industrial equipment", "Out-of-gauge loads"],
    process: ["Assess load dimensions", "Match trailer configuration", "Arrange permits if required", "Move under safety controls"],
    benefits: ["Heavy & out-of-gauge capability", "Permit & pilot coordination", "Correct trailer configuration", "Safety-first load engineering"],
    image: images.shipCrane,
  },
  {
    slug: "general-freight",
    title: "General Freight",
    icon: "boxes",
    summary:
      "Palletised and non-containerised freight moved on curtain-siders and flat-decks.",
    description:
      "When freight travels outside a container, our curtain-sider and flat-deck fleet takes over. From full loads to consolidated runs, we move general freight across the Auckland region and nationwide, secured to full load-restraint standards with proof of delivery on every job.",
    idealFor:
      "Businesses with palletised, packaged or non-containerised freight that still needs professional transport control.",
    whyTitan:
      "The same dispatch discipline we apply to containers carries into general freight — clear timing, secure loading and proof of delivery.",
    typicalFreight: ["Palletised cargo", "Packaged freight", "Full truck loads", "Flat-deck freight"],
    process: ["Confirm freight profile", "Allocate curtain-sider or flat-deck", "Secure to load code", "Deliver with POD"],
    benefits: ["Curtain-sider & flat-deck fleet", "Full and consolidated loads", "Certified load restraint", "Proof of delivery on every run"],
    image: images.motorwayTruck,
  },
  {
    slug: "container-cartage",
    title: "Container Cartage",
    icon: "truck",
    summary:
      "High-frequency wharf cartage timed to vessel windows and free-day deadlines.",
    description:
      "Our container cartage service keeps boxes flowing off the wharf and back again without idle demurrage. We plan pickups around vessel timings, port windows and your unpack capacity, so every container is collected, delivered and de-hired inside its free days.",
    idealFor:
      "High-volume importers, exporters and 3PL operators needing frequent container flows between wharf, depot and site.",
    whyTitan:
      "We track vessel windows, free days and empty returns so your containers keep moving instead of becoming port charges.",
    typicalFreight: ["Daily port cartage", "Empty de-hires", "Depot transfers", "Wharf-to-yard shuttles"],
    process: ["Plan against free days", "Secure wharf slots", "Deliver to unpack window", "Return or de-hire empties"],
    benefits: ["Demurrage & detention minimisation", "Vessel-window scheduling", "Empty de-hire coordination", "Priority wharf slots"],
    image: images.craneLift,
  },
  {
    slug: "container-movements",
    title: "Container Movements & Repositioning",
    icon: "boxes",
    summary:
      "Depot-to-depot repositioning, storage shuttles and empty park runs.",
    description:
      "Beyond the port run, we handle the container movements that keep your equipment where it needs to be — repositioning between depots, shuttling to storage yards, and returning empties to the right park. Efficient, tracked and scheduled around your fleet of boxes.",
    idealFor:
      "Forwarders, depots, shipping lines and freight operators needing boxes repositioned or balanced across the network.",
    whyTitan:
      "We manage the low-visibility movements that keep equipment available — tracked, scheduled and closed out properly.",
    typicalFreight: ["Empty containers", "Depot-to-depot boxes", "Storage shuttles", "Equipment balancing moves"],
    process: ["Confirm equipment location", "Allocate movement window", "Reposition via tracked truck", "Confirm park or depot receipt"],
    benefits: ["Depot-to-depot repositioning", "Empty park returns", "Storage yard shuttles", "Equipment balancing"],
    image: images.containersStacked,
  },
  {
    slug: "b2b-transport",
    title: "Dedicated B2B Transport",
    icon: "building-2",
    summary:
      "Contracted trucks and drivers assigned exclusively to your business.",
    description:
      "For businesses with regular container and freight volumes, we assign dedicated trucks and drivers that run as an extension of your team. Contracted to your schedule and service levels, with optional livery branding — the capacity of an in-house fleet without the overhead.",
    idealFor:
      "Enterprise logistics teams, manufacturers and importers with recurring freight volumes and service-level requirements.",
    whyTitan:
      "We allocate consistent drivers and trucks to your operation so Titan feels like your own fleet without the overhead.",
    typicalFreight: ["Contracted container runs", "Recurring freight lanes", "Dedicated fleet work", "High-volume B2B transport"],
    process: ["Define service levels", "Assign capacity and drivers", "Operate to schedule", "Review performance regularly"],
    benefits: ["Guaranteed dedicated capacity", "Consistent, familiar drivers", "SLA-backed performance", "Optional livery branding"],
    image: images.terminalSunset,
  },
];

export interface ContainerType {
  code: string;
  name: string;
  detail: string;
}

export const containerTypes: ContainerType[] = [
  { code: "20ft", name: "Standard Dry", detail: "General cargo, palletised goods and dry freight." },
  { code: "40ft", name: "Standard & High Cube", detail: "High-volume freight and consolidated loads." },
  { code: "20ft", name: "Heavy / Payload", detail: "Dense, over-weight cargo on rated trailers." },
  { code: "40ft", name: "High Cube", detail: "Extra internal height for bulky freight." },
  { code: "Reefer", name: "Refrigerated", detail: "Temperature-controlled boxes handled with priority." },
  { code: "Empty", name: "Empty Repositioning", detail: "De-hire and park returns coordinated end to end." },
];

export interface Industry {
  slug: string;
  title: string;
  icon: string;
  description: string;
}

export const industries: Industry[] = [
  { slug: "import-export", title: "Import & Export", icon: "Ship", description: "Container movement synced to vessels, customs and MPI for smooth trade both ways." },
  { slug: "freight-forwarding", title: "Freight Forwarding", icon: "Container", description: "Reliable road cartage that forwarders can build their service promises on." },
  { slug: "manufacturing", title: "Manufacturing", icon: "Factory", description: "Inbound raw materials and outbound containers timed to protect your production line." },
  { slug: "wholesale-distribution", title: "Wholesale & Distribution", icon: "Network", description: "High-volume container and freight runs feeding distribution networks nationwide." },
  { slug: "construction", title: "Construction", icon: "HardHat", description: "Heavy materials, plant and out-of-gauge loads coordinated around build programmes." },
  { slug: "retail-supply-chain", title: "Retail Supply Chain", icon: "ShoppingBag", description: "Container-to-DC cartage that keeps seasonal and everyday stock flowing." },
  { slug: "food-beverage", title: "Food & Beverage", icon: "Wheat", description: "Careful, timely handling for reefer and dry freight where timing matters." },
  { slug: "agriculture-primary", title: "Agriculture & Primary", icon: "Tractor", description: "Export container cartage connecting growers and processors to the wharf." },
  { slug: "warehousing-3pl", title: "Warehousing & 3PL", icon: "Warehouse", description: "Transload, unpack and container shuttle services that extend your operation." },
];

export const industryCapabilities = [
  { icon: "Timer", title: "Time-Critical Port Windows", description: "Cut-offs, VBS slots and free days planned to the hour so nothing sits on demurrage." },
  { icon: "Weight", title: "Heavy & Out-of-Gauge", description: "Rated trailers, permits and pilots for over-weight containers, plant and machinery." },
  { icon: "Container", title: "Reefer & Specialised Boxes", description: "Priority handling for temperature-controlled, high-cube and non-standard equipment." },
  { icon: "Radar", title: "Live Tracked Visibility", description: "GPS on every unit and a dispatch team that answers, so you always know where your freight is." },
  { icon: "ShieldCheck", title: "Compliant, Safe Handling", description: "Full load-restraint discipline and documented H&S aligned to your governance standards." },
  { icon: "Building2", title: "Dedicated Fleet Allocation", description: "Contracted trucks and drivers assigned to high-volume sectors as an extension of your team." },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "12,000+", label: "Containers Moved" },
  { value: "98.6%", label: "On-Time Rate" },
  { value: "24/7", label: "Dispatch & Support" },
  { value: "15+", label: "Years On The Road" },
];

export const whyTitan = [
  { icon: "Container", title: "Container Specialists", description: "Container transport and cartage is our core discipline — not a sideline. We know the ports, the boxes and the schedules." },
  { icon: "Timer", title: "On-Time, On-Schedule", description: "Vessel windows and free-day deadlines drive our planning, so demurrage stays off your invoice." },
  { icon: "Truck", title: "Modern, Compliant Fleet", description: "Skeletal, tri-axle, curtain-sider and flat-deck units, maintained to a high standard and RUC-compliant." },
  { icon: "Radar", title: "Live Tracking", description: "GPS visibility on every unit and a dispatch team that answers the phone, day or night." },
  { icon: "ShieldCheck", title: "Safety & Compliance", description: "Full load-restraint discipline, trained drivers and a safety culture that protects your freight and our roads." },
  { icon: "MapPinned", title: "Auckland & Nationwide", description: "Deep Auckland port strength paired with line-haul reach across both islands." },
];

export const processSteps = [
  { step: "01", title: "Booking & Quote", description: "Share your container or freight details and we return a clear, competitive quote built around your vessel window." },
  { step: "02", title: "Port & VBS Planning", description: "We secure terminal slots and VBS bookings, and schedule the run around cut-offs and free days." },
  { step: "03", title: "Cartage & Tracking", description: "A compliant unit collects your container under live GPS oversight, with our dispatch team monitoring every leg." },
  { step: "04", title: "Delivery & De-hire", description: "Freight is delivered on schedule and empties returned or de-hired — closing the loop without demurrage." },
];

export const coverage = [
  { region: "Auckland Metro", detail: "Daily wharf, MetroPort and depot cartage across the region." },
  { region: "Upper North Island", detail: "Hamilton, Tauranga and the Waikato/BOP freight corridors." },
  { region: "Lower North Island", detail: "Line-haul connections through to Palmerston North and Wellington." },
  { region: "South Island", detail: "Christchurch and key South Island centres via managed line-haul." },
];

export const certifications = [
  { title: "NZTA Operator Rating", detail: "Licensed transport operator held to NZTA safety and compliance standards." },
  { title: "Load-Restraint Compliant", detail: "Every load secured to the NZ Truck Loading Code." },
  { title: "Port Access Accredited", detail: "Approved for terminal and VBS operations across the Auckland port network." },
  { title: "Health & Safety Assured", detail: "Documented H&S system aligned to NZ workplace safety obligations." },
];

export const promises = [
  { title: "On-Time, Every Time", description: "We plan around your vessel windows and cut-offs so your containers move to schedule — not ours." },
  { title: "No Hidden Demurrage", description: "Disciplined free-day tracking and empty de-hire keep avoidable port charges off your invoice." },
  { title: "One Accountable Partner", description: "A single dispatch team owns your freight end to end — no finger-pointing, no dropped handovers." },
  { title: "Freight Handled With Care", description: "Trained drivers and full load-restraint discipline protect your cargo from wharf to door." },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  { quote: "Titan clears our containers off the wharf inside the free days, every time. Since moving our cartage to them our demurrage charges have effectively disappeared.", name: "Marcus Reid", role: "Operations Manager · Import Distributor" },
  { quote: "Their dispatch team lives and breathes the port schedule. Export cut-offs we used to stress about are now just handled — we get the container on the vessel without the drama.", name: "Priya Nair", role: "Supply Chain Lead · Exporter" },
  { quote: "We run a dedicated Titan fleet for our container movements. It's the capacity and consistency of our own trucks without any of the overhead. Genuinely a partner, not a supplier.", name: "James Whitfield", role: "Logistics Director · Manufacturing" },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  { q: "Do you move both laden and empty containers?", a: "Yes. We handle laden import and export containers as well as empty repositioning and de-hire, coordinating the full cycle so your equipment ends up where it needs to be." },
  { q: "Which ports and terminals do you service?", a: "We run daily across the Auckland port network — the waterfront terminals, MetroPort and surrounding container depots — and manage the VBS and terminal bookings on your behalf." },
  { q: "Can you help us avoid demurrage and detention?", a: "That's a core part of our service. We schedule cartage around vessel windows and free days and coordinate prompt empty de-hire, keeping avoidable port charges off your invoice." },
  { q: "Do you handle heavy or over-weight containers?", a: "Yes. We match heavy and out-of-gauge loads to the correct rated trailer configuration and arrange any permits or pilots required to move them safely and legally." },
  { q: "Can you provide dedicated trucks for our volumes?", a: "We do. Our dedicated B2B transport assigns trucks and drivers exclusively to your operation, contracted to your schedule and service levels, with optional livery branding." },
  { q: "How quickly can I get a quote?", a: "Send us your pickup, delivery and container details through the quote form and our team responds promptly — usually within one business day, and faster for time-critical port work." },
];

export const timeline = [
  { year: "The Start", title: "Built at the wharf", description: "Titan began with a handful of skeletal trailers and a simple promise — clear containers off the Auckland wharf on time, every time." },
  { year: "Growth", title: "A specialist fleet", description: "We invested in modern skeletal, tri-axle and heavy-freight equipment, becoming a go-to name for container cartage and port deliveries." },
  { year: "Trust", title: "Enterprise partnerships", description: "Importers, exporters, forwarders and manufacturers moved their container volumes to Titan and stayed — reliability earned, not claimed." },
  { year: "Today", title: "Moving New Zealand forward", description: "Now a full container-transport and heavy-freight partner, we combine a compliant fleet, live tracking and a 24/7 dispatch mindset." },
];

export const coreValues = [
  { title: "Reliability", description: "Every container window is a commitment. Consistent, on-time cartage is the foundation of our reputation." },
  { title: "Integrity", description: "Transparent pricing and honest scheduling — you always know exactly where your freight stands." },
  { title: "Safety", description: "Rigorous load restraint, maintained equipment and trained drivers keep your cargo and our roads safe." },
  { title: "Accountability", description: "One team owns your freight end to end, from wharf booking to final de-hire." },
  { title: "Precision", description: "Vessel windows, VBS slots and free days planned to the hour — because timing is the whole job." },
];

export const partners = ["Ports of Auckland", "MetroPort", "NZTA Licensed", "Road Transport Forum", "MPI Aware", "National Road Carriers"];

export const pageContent = {
  about: {
    seo: {
      title: "About Us",
      description: "Titan Global Transport is an Auckland container transport and cartage specialist built on reliability, safety and long-term partnerships — moving import, export and heavy freight across New Zealand.",
    },
    hero: {
      eyebrow: "About Titan Global Transport",
      title: "Container specialists, moving New Zealand forward",
      description: "We are an Auckland-based container transport and cartage company with a single obsession — clearing freight off the wharf and to your door, dependably and on time.",
      breadcrumb: "About",
      image: images.portOperations,
    },
    story: {
      eyebrow: "Our Story",
      title: "Built at the wharf, proven on the road",
      paragraphs: [
        "Titan Global Transport began with a handful of skeletal trailers and a simple promise: clear containers off the Auckland wharf on time, every time. That promise struck a chord with importers and exporters tired of demurrage charges and missed cut-offs.",
        "As demand grew, so did our fleet and our discipline. We invested in modern skeletal, tri-axle and heavy-freight equipment, built a dispatch team that lives and breathes the port schedule, and put live tracking on every unit. Container transport and cartage became our specialism — not a sideline.",
        "Today, operating under Titan Global Enterprises Limited, we move laden and empty containers, heavy and general freight, and run dedicated fleets for businesses that need capacity they can rely on. The trailers have multiplied; the promise hasn't changed.",
      ],
      image: images.craneLift,
      imageAlt: "Gantry crane lifting a shipping container at a terminal",
      badgeTitle: "On-time",
      badgeText: "Every container window",
    },
    missionVision: [
      { icon: "target", title: "Our Mission", description: "To move our clients' containers and freight with unwavering reliability — clearing the wharf on time, protecting them from demurrage, and giving New Zealand businesses total confidence in their supply chain." },
      { icon: "eye", title: "Our Vision", description: "To be recognised as New Zealand's most trusted container transport partner — the first name enterprises think of when freight has to move off the wharf and arrive on schedule." },
    ],
    valuesHeading: { eyebrow: "Core Values", title: "The principles behind every container", description: "Five values shape how we plan, how we drive and how we build partnerships that last." },
    timelineHeading: { eyebrow: "Our Journey", title: "Growth built on kept promises" },
    certificationsHeading: { eyebrow: "Compliance & Accreditation", title: "Standards enterprise clients can rely on", description: "We hold our operation to the safety and compliance standards your own governance demands." },
    cta: { title: "Let's build a container supply chain you can rely on", description: "Discover why New Zealand importers, exporters and manufacturers trust Titan to keep their freight moving." },
  },
  services: {
    seo: {
      title: "Services",
      description: "Titan Global Transport services: container transport, container cartage, port deliveries, import & export logistics, container movements, general freight, heavy freight and dedicated B2B transport across New Zealand.",
    },
    hero: { eyebrow: "Our Services", title: "Freight solutions built around the box", description: "From wharf cartage to heavy and out-of-gauge loads, every service is engineered around the ports, the containers and your schedule.", image: images.containersStacked, breadcrumb: "Services" },
    cardLabels: { servicePrefix: "Service", benefits: "Key Benefits", idealFor: "Who it's for", whyTitan: "Why choose Titan", typicalFreight: "Typical freight", process: "Service process", cta: "Request Quote" },
    cta: { title: "Not sure which service fits your freight?", description: "Tell us what you're moving and our dispatch team will recommend the most reliable, cost-effective plan." },
  },
  industries: {
    seo: {
      title: "Industries",
      description: "Titan Global Transport moves container and heavy freight for import & export, freight forwarding, manufacturing, distribution, construction, retail, food & beverage, agriculture and 3PL across New Zealand.",
    },
    hero: { eyebrow: "Industries We Serve", title: "Container expertise across every sector", description: "Different industries move differently. We bring specialised understanding to the container and freight demands of the sectors that power New Zealand's economy.", image: images.cranesVessel, breadcrumb: "Industries" },
    sectorsHeading: { eyebrow: "Sectors We Move", title: "One dependable container partner", description: "From export produce to heavy construction materials, our fleet and dispatch adapt to what each sector demands." },
    capabilitiesHeading: { eyebrow: "Sector Capabilities", title: "Built for what your industry demands", description: "Whatever the freight profile, we bring the equipment, compliance and planning each sector relies on." },
    cardCta: "Request a quote",
    cta: { title: "Your industry. Our container expertise.", description: "Tell us about your sector's freight needs and we'll tailor a container transport solution that fits." },
  },
  contact: {
    seo: { title: "Contact", description: "Contact Titan Global Transport in Auckland, New Zealand. Call, email or send an enquiry for dependable container transport, cartage and port deliveries — we respond promptly." },
    hero: { eyebrow: "Contact Us", title: "Let's get your containers moving", description: "Our Auckland dispatch team is ready to help. Reach out for a quote, a booking or a conversation about your container and freight needs — we respond quickly.", image: images.portOperations, breadcrumb: "Contact" },
    cards: { call: "Call Us", email: "Email Us", visit: "Visit" },
    formIntro: { eyebrow: "Send an Enquiry", title: "Tell us about your freight", description: "Complete the form and our team will be in touch. Prefer to talk? Call dispatch directly — we're happy to help." },
    sidebar: { hoursTitle: "Business Hours", companyTitle: "Company Information", tradingName: "Trading Name", registeredEntity: "Registered Entity", address: "Address", phone: "Phone", email: "Email" },
  },
  quote: {
    seo: { title: "Request a Quote", description: "Request a free, no-obligation container transport quote from Titan Global Transport. Share your pickup, delivery and timing and our Auckland dispatch team will respond promptly." },
    hero: { eyebrow: "Request a Quote", title: "Get your free container quote", description: "Give us the details of your container or freight movement and we'll return a clear, competitive quote built around your vessel window and timeline.", image: images.terminalSunset, breadcrumb: "Quote" },
    intro: { eyebrow: "Why request with Titan", title: "A quote you can act on with confidence", description: "Every quote is prepared by our dispatch team — not an automated guess. We consider your route, vessel timing and free days so the price we give is the price that works." },
    assurances: [
      { icon: "banknote", title: "No-obligation", text: "A free, transparent quote with no hidden costs." },
      { icon: "clock", title: "Fast turnaround", text: "A response typically within one business day." },
      { icon: "shield", title: "Fully compliant", text: "Safe, insured and load-restraint compliant transport." },
    ],
    phonePrompt: "Prefer to talk it through?",
    loading: "Loading form…",
  },
  legal: {
    eyebrow: "Legal",
    descriptionPrefix: "Please read this ",
    descriptionSuffix: " carefully. It explains how we operate and what you can expect when working with us.",
    lastUpdatedPrefix: "Last updated: ",
    privacy: {
      title: "Privacy Policy",
      breadcrumb: "Privacy Policy",
      updated: "July 2026",
    },
    terms: {
      title: "Terms of Service",
      breadcrumb: "Terms",
      updated: "July 2026",
    },
  },
} as const;

export const homeSections = {
  partners: { eyebrow: "Trusted across New Zealand's port and freight network" },
  whyChoose: { eyebrow: "Why Titan", title: "Container specialists, not generalists", description: "Titan is built around one discipline done exceptionally well: moving containers between the port and your business. That focus is why importers, exporters and manufacturers trust us with their most time-critical freight.", image: images.craneLift, imageAlt: "Gantry crane lifting a shipping container above a stacked yard", badgeTitle: "Wharf to door", badgeText: "One accountable partner", link: { label: "More about our approach", href: "/about" } },
  servicesPreview: { eyebrow: "What We Move", title: "Container-focused freight services", description: "From wharf cartage to heavy freight, every service is engineered around the ports, the boxes and your schedule.", cta: { label: "All Services", href: "/services" } },
  containerTypes: { eyebrow: "Container Types", title: "Every box, on the right equipment", description: "Dry, high-cube, heavy, reefer or empty — we match each container to the correct trailer and handle it to schedule." },
  process: { eyebrow: "Our Process", title: "From booking to de-hire, handled", description: "Four disciplined steps take your container from first booking to a closed loop — with you informed at every stage." },
  industries: { eyebrow: "Industries We Serve", title: "Built for the businesses that import, export and build", description: "Our container and freight experience spans the sectors that keep New Zealand trading — each with demands we understand intimately.", cta: { label: "Explore Industries", href: "/industries" } },
  coverage: { eyebrow: "Nationwide Coverage", title: "Auckland strength, national reach", description: "We run daily container cartage across the Auckland port network and connect it to line-haul corridors that reach the length of the country — one partner from the wharf to the far end of the map.", image: images.motorwayTruck, imageAlt: "Line-haul freight truck travelling a New Zealand motorway", badgeTitle: "Both Islands", badgeText: "Managed line-haul network" },
  safety: { eyebrow: "Safety & Compliance", title: "Certified, compliant, accountable", description: "Enterprise clients need more than a truck — they need a partner that meets the standards their own governance demands.", image: images.containerTruck, imageAlt: "Container truck loaded at a freight terminal", badgeTitle: "Safety First", promiseEyebrow: "Our Promise", promiseTitle: "What every client can count on" },
  testimonials: { eyebrow: "Client Testimonials", title: "The businesses we keep moving", description: "Reliability is best measured by the partners who keep choosing us, season after season.", previousLabel: "Previous testimonial", nextLabel: "Next testimonial", showLabel: "Show testimonial" },
  fleet: { eyebrow: "Fleet & Operations", title: "On the wharf, on the road, on schedule", description: "A capable, well-presented fleet and disciplined operations moving containers and freight across New Zealand every day." },
  faqs: { eyebrow: "FAQs", title: "Answers before you ask", description: "The details businesses most often want to know before moving their container freight to a new partner." },
} as const;

export const fleetGallery = [
  { src: images.terminalSunset, alt: "Container loaded on a truck at a terminal under gantry cranes at sunset", span: "lg:col-span-2 lg:row-span-2" },
  { src: images.cranesVessel, alt: "Ship-to-shore cranes loading containers onto a vessel", span: "" },
  { src: images.containerTruck, alt: "Container truck in front of stacked shipping containers", span: "" },
  { src: images.motorwayTruck, alt: "Line-haul truck travelling a New Zealand motorway", span: "lg:col-span-2" },
  { src: images.portOperations, alt: "Container ship loading with cranes and forklift at port", span: "" },
];

export const formContent = {
  contact: {
    successDefault: "Thank you! We'll contact you shortly.",
    successText: "Your enquiry has landed with our team. We aim to respond within one business day — often much sooner.",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      phone: { label: "Phone Number", placeholder: "+64 …" },
      email: { label: "Email", placeholder: "you@company.co.nz" },
      pickup: { label: "Pickup Location", placeholder: "e.g. Ports of Auckland" },
      delivery: { label: "Delivery Location", placeholder: "e.g. Penrose, Auckland" },
      preferredDate: { label: "Preferred Date" },
      message: { label: "Message", placeholder: "Tell us what you need moved, from where, and when…" },
    },
    submit: { idle: "Send Message", pending: "Sending…" },
  },
  quote: {
    successDefault: "Thank you! We'll contact you shortly.",
    successText: "Your quote request is with our dispatch team. We'll review the details and come back to you promptly — typically within one business day.",
    legends: { contact: "Your Details", freight: "Movement Details" },
    fields: {
      name: { label: "Name", placeholder: "Full name" },
      company: { label: "Company", placeholder: "Company name" },
      phone: { label: "Phone", placeholder: "+64 …" },
      email: { label: "Email", placeholder: "you@company.co.nz" },
      pickup: { label: "Pickup Location", placeholder: "Port / Suburb / City" },
      delivery: { label: "Delivery Location", placeholder: "Suburb / City" },
      preferredDate: { label: "Preferred Date" },
      service: { prefix: "Service of interest" },
      industry: { prefix: "Industry" },
      message: { label: "Message", placeholder: "Tell us about your containers or freight — number of boxes, size, timing, special handling…" },
    },
    submit: { idle: "Submit Quote Request", pending: "Submitting…" },
    privacy: "We respect your privacy. Your details are used only to prepare your quote.",
  },
} as const;
