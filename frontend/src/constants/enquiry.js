export const CLIENT_TYPES = ["CPA / Accounting Firm", "Bookkeeping Firm", "Business", "Other"];
export const SUPPORT_AREAS = [
  ["Monthly Bookkeeping", "Monthly bookkeeping"], ["Reconciliations", "Reconciliations"],
  ["AP", "Accounts payable"], ["AR", "Accounts receivable"],
  ["Cleanup / Catch-Up", "Cleanup / catch-up"], ["Month-End", "Month-end close"],
  ["Financial Reporting", "Financial reporting"], ["Dedicated Bookkeeping Capacity", "Dedicated bookkeeping capacity"], ["Other", "Other"],
];
export const emptyEnquiry = { name: "", email: "", company: "", website: "", client_type: "", services: [], message: "", company_url: "" };
export const optionId = (value) => value.split(/[\s/]+/)[0].toLowerCase();