import { businessInfo } from "@/lib/data";

const whatsappBaseUrl = `https://wa.me/${businessInfo.whatsappNumber}`;

export function createWhatsAppUrl(message: string): string {
  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function serviceBookingMessage(serviceName: string, price?: string, warranty?: string): string {
  return [
    `Hi Fixaro, I want to book ${serviceName}.`,
    `Price shown: ${price || ""}`,
    `Warranty: ${warranty || ""}`,
    "My area:",
    "Preferred time:",
    "",
    "Please confirm availability.",
  ].join("\n");
}

export type FormBookingData = {
  name?: string;
  phone?: string;
  area?: string;
  fullAddress?: string;
  landmark?: string;
  pincode?: string;
  mapsLink?: string;
  serviceCategory?: string;
  service?: string;
  acType?: string;
  brand?: string;
  preferredDate?: string;
  preferredTime?: string;
  issue?: string;
};

export function formBookingMessage(data: FormBookingData): string {
  return [
    "Hi Fixaro, I want to book an AC service.",
    "",
    `Name: ${data.name || ""}`,
    `Phone: ${data.phone || ""}`,
    `Area: ${data.area || ""}`,
    `Full address: ${data.fullAddress || ""}`,
    `Landmark: ${data.landmark || ""}`,
    `Pincode: ${data.pincode || ""}`,
    `Google Maps location: ${data.mapsLink || ""}`,
    `Service category: ${data.serviceCategory || ""}`,
    `Service: ${data.service || ""}`,
    `AC type: ${data.acType || ""}`,
    `Brand: ${data.brand || ""}`,
    `Preferred date: ${data.preferredDate || ""}`,
    `Preferred time: ${data.preferredTime || ""}`,
    `Issue: ${data.issue || ""}`,
    "",
    "Please confirm availability.",
  ].join("\n");
}

export type BookingFormMessageData = {
  name: string;
  phone: string;
  area: string;
  fullAddress?: string;
  landmark?: string;
  pincode?: string;
  mapsLink?: string;
  capturedLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  category: string;
  service: string;
  price?: string;
  warranty?: string;
  acType: string;
  brand?: string;
  preferredDate?: string;
  preferredTime?: string;
  issue?: string;
  importantNote?: string;
  extraChargeNote?: string;
};

export function bookingFormMessage(data: BookingFormMessageData): string {
  const noteLines = [
    data.importantNote ? `Important note: ${data.importantNote}` : null,
    data.extraChargeNote ? `Extra charge note: ${data.extraChargeNote}` : null,
  ].filter(Boolean);
  const capturedLocationLines = data.capturedLocation
    ? [
        `Captured coordinates: ${data.capturedLocation.latitude}, ${data.capturedLocation.longitude}`,
        `Accuracy: Around ${Math.round(data.capturedLocation.accuracy)} meters`,
      ]
    : [];

  return [
    "Hi Fixaro, I want to book an AC service.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    "",
    "Location Details:",
    `Area: ${data.area}`,
    `Full address: ${data.fullAddress || ""}`,
    `Landmark: ${data.landmark || "Not specified"}`,
    `Pincode: ${data.pincode || "Not specified"}`,
    `Google Maps location: ${data.mapsLink || "Not provided"}`,
    ...capturedLocationLines,
    "",
    "Service Details:",
    `Service category: ${data.category}`,
    `Service: ${data.service}`,
    `Price shown: ${data.price || ""}`,
    `Warranty: ${data.warranty || ""}`,
    `AC type: ${data.acType}`,
    `Brand: ${data.brand || "Not specified"}`,
    "",
    "Preferred Slot:",
    `Date: ${data.preferredDate || "Flexible"}`,
    `Time: ${data.preferredTime || "Flexible"}`,
    "",
    "Issue:",
    data.issue || "Not specified",
    ...(noteLines.length > 0 ? ["", ...noteLines] : []),
    "",
    "Please confirm availability.",
  ].join("\n");
}

export function warrantySupportMessage(): string {
  return [
    "Hi Fixaro, I need warranty support for my AC service.",
    "",
    "Name:",
    "Area:",
    "Service taken:",
    "Service date:",
    "Issue:",
    "",
    "Please check and confirm warranty support.",
  ].join("\n");
}

export function processBookingMessage(): string {
  return [
    "Hi Fixaro, I want to book an AC service. My area is:",
    "",
    "Please share available slots.",
  ].join("\n");
}

export function brandSupportMessage(): string {
  return [
    "Hi Fixaro, I want to check if you service my AC brand.",
    "",
    "Brand:",
    "AC type:",
    "Area:",
  ].join("\n");
}

export function areaAvailabilityMessage(area?: string): string {
  if (area) {
    return [
      `Hi Fixaro, I want to book AC service in ${area}.`,
      "",
      "Service needed:",
      "AC type:",
      "Preferred time:",
      "",
      "Please confirm availability.",
    ].join("\n");
  }

  return [
    "Hi Fixaro, I want to check AC service availability in my area.",
    "",
    "Area:",
    "Service needed:",
    "",
    "Please confirm.",
  ].join("\n");
}
