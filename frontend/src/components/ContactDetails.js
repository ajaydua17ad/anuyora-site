import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/constants/site";

export const ContactDetails = ({ id, light = false }) => (
  <address className={`space-y-5 not-italic text-sm ${light ? "text-slate-300" : "text-inksoft"}`} data-testid={`${id}-contact-details`}>
    <a href={`mailto:${CONTACT.email}`} data-testid={`${id}-email`} className="contact-detail-link">
      <Mail size={17} aria-hidden="true" strokeWidth={1.5} /><span>{CONTACT.email}</span>
    </a>
    <a href={`tel:${CONTACT.phone}`} data-testid={`${id}-phone`} className="contact-detail-link">
      <Phone size={17} aria-hidden="true" strokeWidth={1.5} /><span>{CONTACT.phoneLabel}</span>
    </a>
    <p data-testid={`${id}-address`} className="flex items-center gap-3">
      <MapPin size={17} aria-hidden="true" strokeWidth={1.5} /><span>{CONTACT.address}</span>
    </p>
  </address>
);