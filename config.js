// =====================================================================
//  SETTINGS FILE
//  Colors, fonts, sizes, on-screen text, and database names all live here.
//  Change a value below and the whole site follows.
// =====================================================================

// ---------- 1. Design (colors, font, sizes) ----------
export const design = {
  colors: {
    primary: "#16a34a", // main green: button, highlights
    primaryHover: "#15803d", // button color when hovered
    primaryDark: "#166534", // dark green: "Achieved" badge text, reward label
    primarySoft: "#dcfce7", // light green: "Achieved" badge, reward box
    primaryFaint: "#f0fdf4", // very light green: icon circles, reward box

    // Top band of the main card (left color -> right color)
    headerStart: "#16a34a",
    headerEnd: "#0d9488",
    headerText: "#ffffff", // title on the green band
    headerSubText: "#dcfce7", // intro text on the green band

    // Page background (soft glow colors + base color)
    background: "#f4faf6",
    backgroundGlow1: "#d1fae5",
    backgroundGlow2: "#ccfbf1",

    card: "#ffffff", // card background
    text: "#1e293b", // main text (deep slate, softer than black)
    subText: "#64748b", // labels and helper text
    border: "#e2e8f0", // lines and input border

    // Small icons next to each result item
    iconGoal: "#0d9488",
    iconGoalBg: "#ccfbf1",
    iconDays: "#2563eb",
    iconDaysBg: "#dbeafe",
    iconStatus: "#16a34a",
    iconStatusBg: "#dcfce7",
    iconReward: "#d97706",
    iconRewardBg: "#fef3c7",

    grayBadgeBg: "#f1f5f9", // "Not Achieved" badge background
    grayBadgeText: "#475569", // "Not Achieved" badge text
    errorBg: "#fef2f2", // light red error box background
    errorText: "#b91c1c", // error text
    errorBorder: "#fecaca", // error box border
  },
  font: {
    family: "Inter",
    // Google Fonts address for the font above
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  },
  sizes: {
    title: "24px",
    body: "17px",
    input: "18px",
    button: "18px",
    label: "16px",
    value: "17px",
    reward: "32px", // Reward amount (bigger than others)
    badge: "14px",
    controlHeight: "56px", // height of input and button
    cardRadius: "24px",
    controlRadius: "14px",
    cardMaxWidth: "460px",
  },
  shadow: "0 10px 30px rgba(15, 23, 42, 0.06)", // very light card shadow
};

// ---------- 2. On-screen text ----------
export const text = {
  pageTitle: "Walkonnect Check-In Rewards Challenge", // browser tab title
  title: "Walkonnect Check-In Rewards Challenge",
  intro: "Enter your employee ID to check your challenge results.",
  inputPlaceholder: "Employee ID (e.g. 1234, A123)",
  button: "Check Results",
  buttonLoading: "Checking...",
  labels: {
    goal: "Your Goal",
    days: "Days Achieved",
    status: "Status",
    reward: "Reward",
  },
  goalUnit: "steps", // shown after a number-only goal: 8000 -> "8,000 steps"
  daySingular: "day",
  dayPlural: "days",
  statusAchieved: "Achieved",
  statusNotAchieved: "Not Achieved",
  errors: {
    empty: "Please enter your employee ID.",
    notFound: "No results found for this employee ID. Please check and try again.",
    general: "Something went wrong. Please try again later.",
  },
};

// ---------- 3. Database names (Supabase) ----------
export const db = {
  table: "walking_results",
  columns: {
    employeeId: "employee_id",
    goal: "goal",
    achievedDays: "achieved_days",
    status: "status",
    prize: "prize",
  },
  // How "status" is written in the database
  statusValues: {
    achieved: "달성",
    notAchieved: "미달성",
  },
};
