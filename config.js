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
    primarySoft: "#dcfce7", // light green: "Achieved" badge background
    primaryText: "#166534", // dark green: "Achieved" badge text
    background: "#f0fdf4", // very light page background
    card: "#ffffff", // card background
    text: "#1f2937", // main text
    subText: "#6b7280", // labels and helper text
    border: "#e5e7eb", // lines and input border
    grayBadgeBg: "#f3f4f6", // "Not Achieved" badge background
    grayBadgeText: "#4b5563", // "Not Achieved" badge text
    errorBg: "#fef2f2", // light red error box background
    errorText: "#b91c1c", // error text
    errorBorder: "#fecaca", // error box border
  },
  font: {
    family: "Inter",
    // Google Fonts address for the font above
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  sizes: {
    title: "26px",
    body: "17px",
    input: "18px",
    button: "18px",
    label: "16px",
    value: "17px",
    reward: "28px", // Reward amount (bigger than others)
    badge: "14px",
    controlHeight: "54px", // height of input and button
    cardRadius: "20px",
    controlRadius: "12px",
    cardMaxWidth: "460px",
  },
  shadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // very light card shadow
};

// ---------- 2. On-screen text ----------
export const text = {
  pageTitle: "Walkonnect Check-In Rewards Challenge", // browser tab title
  title: "Walkonnect Check-In Rewards Challenge",
  intro: "Enter your employee ID to check your challenge results.",
  inputPlaceholder: "Employee ID",
  button: "Check Results",
  buttonLoading: "Checking...",
  labels: {
    goal: "Your Goal",
    days: "Days Achieved",
    status: "Status",
    reward: "Reward",
  },
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
