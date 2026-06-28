"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headphones,
  IndianRupee,
  Info,
  LocateFixed,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import {
  acBrands,
  businessInfo,
  featuredServiceAreas,
  globalPriceNote,
  serviceAreaAliases,
  serviceAreas,
  serviceCategories,
  services,
} from "@/lib/data";
import type { ServiceCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { bookingFormMessage, createWhatsAppUrl } from "@/lib/whatsapp";

type BookingFormState = {
  name: string;
  phone: string;
  area: string;
  customArea: string;
  fullAddress: string;
  landmark: string;
  pincode: string;
  mapsLink: string;
  category: ServiceCategory | "";
  serviceSlug: string;
  acType: string;
  brand: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
};

type BookingErrors = Partial<Record<keyof BookingFormState, string>>;
type AreaMode = "known" | "other";
type CapturedLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};
type LocationFeedback = {
  type: "success" | "error";
  message: string;
};

const initialFormState: BookingFormState = {
  name: "",
  phone: "",
  area: "",
  customArea: "",
  fullAddress: "",
  landmark: "",
  pincode: "",
  mapsLink: "",
  category: "",
  serviceSlug: "",
  acType: "",
  brand: "",
  preferredDate: "",
  preferredTime: "",
  issue: "",
};

const acTypes = ["Split AC", "Window AC", "Not sure"] as const;

const preferredTimes = ["Morning, 9 AM – 12 PM", "Afternoon, 12 PM – 3 PM", "Evening, 3 PM – 6 PM", "Flexible"] as const;

const quickChips = [
  {
    label: "AC Service",
    category: "AC Service",
    serviceName: "Essential AC Service",
    issue: "I want to book regular AC service.",
  },
  {
    label: "Deep Cleaning",
    category: "AC Service",
    serviceName: "Deep Cleaning Service",
    issue: "I want to book deep cleaning for my AC.",
  },
  {
    label: "AC Not Cooling",
    category: "AC Repair",
    serviceName: "Less / No Cooling Repair",
    issue: "My AC is not cooling properly.",
  },
  {
    label: "Water Leakage",
    category: "AC Service",
    serviceName: "Water Leakage Service",
    issue: "Water is leaking from my AC indoor unit.",
  },
  {
    label: "Gas Refilling",
    category: "Gas Refilling",
    serviceName: "Complete Gas Charging",
    issue: "I want to check gas level or book gas charging.",
  },
  {
    label: "Installation",
    category: "Installation",
    serviceName: "Split AC Installation",
    issue: "I need split AC installation support.",
  },
] satisfies {
  label: string;
  category: ServiceCategory;
  serviceName: string;
  issue: string;
}[];

const supportMessage = "Hi Fixaro, I want to book an AC service. Please share available slots.";
const otherAreaOption = "Other";

// TODO(launch-safe refactor): Split this form into booking subcomponents after a dedicated mobile booking regression pass.
function todayInputValue() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function normalizeAreaQuery(value: string) {
  return value.trim().toLowerCase();
}

function areaMatches(area: string, query: string) {
  if (!query) return true;

  const aliases = serviceAreaAliases[area] || [];
  return [area, ...aliases].some((value) => normalizeAreaQuery(value).includes(query));
}

export function BookingForm() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState<BookingFormState>(initialFormState);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [activeChip, setActiveChip] = useState<string>("");
  const [areaMode, setAreaMode] = useState<AreaMode>("known");
  const [areaSearch, setAreaSearch] = useState("");
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [successNote, setSuccessNote] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [capturedLocation, setCapturedLocation] = useState<CapturedLocation | null>(null);
  const [locationFeedback, setLocationFeedback] = useState<LocationFeedback | null>(null);
  const areaSelectorRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useRef<Partial<Record<keyof BookingFormState, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>(
    {},
  );

  const today = useMemo(() => todayInputValue(), []);
  const filteredServices = useMemo(
    () => services.filter((service) => (form.category ? service.category === form.category : false)),
    [form.category],
  );
  const selectedService = useMemo(() => services.find((service) => service.slug === form.serviceSlug), [form.serviceSlug]);
  const areaQuery = normalizeAreaQuery(areaSearch);
  const areaOptions = useMemo(() => {
    const baseAreas = areaQuery ? serviceAreas : featuredServiceAreas;
    return baseAreas.filter((area) => areaMatches(area, areaQuery));
  }, [areaQuery]);
  const finalArea = areaMode === "other" ? form.customArea.trim() : form.area.trim();

  useEffect(() => {
    if (!isAreaDropdownOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (areaSelectorRef.current?.contains(event.target as Node)) return;
      setIsAreaDropdownOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsAreaDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAreaDropdownOpen]);

  const revealProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-90px" },
          transition: { duration: 0.45, delay, ease: "easeOut" as const },
        };

  function updateField<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((current) => {
      if (key === "category") {
        return { ...current, category: value as BookingFormState["category"], serviceSlug: "" };
      }

      return { ...current, [key]: value };
    });
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSuccessNote(false);
  }

  function validateForm() {
    const nextErrors: BookingErrors = {};
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (phoneDigits.length < 10) nextErrors.phone = "Please enter a valid mobile number.";
    if (areaMode === "other") {
      if (form.customArea.trim().length < 2) nextErrors.customArea = "Please enter your area or locality.";
    } else if (!form.area.trim()) {
      nextErrors.area = "Please enter your area or locality.";
    }
    if (!form.fullAddress.trim()) nextErrors.fullAddress = "Please enter your full address.";
    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) nextErrors.pincode = "Please enter a valid 6-digit pincode.";
    if (!form.category) nextErrors.category = "Please select a service category.";
    if (!form.serviceSlug || !selectedService) nextErrors.serviceSlug = "Please select a service.";
    if (!form.acType) nextErrors.acType = "Please select your AC type.";
    if (form.preferredDate && form.preferredDate < today) nextErrors.preferredDate = "Please select today or a future date.";
    if (form.issue.length > 500) nextErrors.issue = "Maximum 500 characters.";

    return nextErrors;
  }

  function focusFirstError(nextErrors: BookingErrors) {
    const firstInvalid = (
      [
        "name",
        "phone",
        "area",
        "customArea",
        "fullAddress",
        "pincode",
        "category",
        "serviceSlug",
        "acType",
        "preferredDate",
        "issue",
      ] as (keyof BookingFormState)[]
    ).find((key) => nextErrors[key]);

    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
    }
  }

  function handleQuickChip(chip: (typeof quickChips)[number]) {
    const service = services.find((item) => item.name === chip.serviceName);

    setActiveChip(chip.label);
    setForm((current) => ({
      ...current,
      category: chip.category,
      serviceSlug: service?.slug || "",
      issue: chip.issue,
    }));
    setErrors((current) => ({ ...current, category: undefined, serviceSlug: undefined, issue: undefined }));
    setSuccessNote(false);
  }

  function handleAreaSearchChange(value: string) {
    setAreaSearch(value);
    setAreaMode("known");
    setIsAreaDropdownOpen(true);
    setForm((current) => ({ ...current, area: "", customArea: "" }));
    setErrors((current) => ({ ...current, area: undefined, customArea: undefined }));
    setSuccessNote(false);
  }

  function selectKnownArea(area: string) {
    setAreaMode("known");
    setAreaSearch(area);
    setIsAreaDropdownOpen(false);
    setForm((current) => ({ ...current, area, customArea: "" }));
    setErrors((current) => ({ ...current, area: undefined, customArea: undefined }));
    setSuccessNote(false);
  }

  function selectOtherArea() {
    setAreaMode("other");
    setAreaSearch(otherAreaOption);
    setIsAreaDropdownOpen(false);
    setForm((current) => ({ ...current, area: otherAreaOption, customArea: "" }));
    setErrors((current) => ({ ...current, area: undefined }));
    setSuccessNote(false);
  }

  function handleMapsLinkChange(value: string) {
    updateField("mapsLink", value);
    setCapturedLocation(null);
    setLocationFeedback(null);
  }

  function useCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setLocationFeedback({
        type: "error",
        message: "Your browser does not support location sharing. Please paste a Google Maps link or enter your full address manually.",
      });
      return;
    }

    setIsGettingLocation(true);
    setLocationFeedback(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = Number(position.coords.latitude.toFixed(7));
        const longitude = Number(position.coords.longitude.toFixed(7));
        const accuracy = position.coords.accuracy;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setForm((current) => ({ ...current, mapsLink }));
        setErrors((current) => ({ ...current, mapsLink: undefined }));
        setCapturedLocation({ latitude, longitude, accuracy });
        setLocationFeedback({
          type: "success",
          message: "Location added. Please check the map link before sending.",
        });
        setIsGettingLocation(false);
        setSuccessNote(false);
      },
      (error) => {
        const messageByCode: Record<number, string> = {
          [error.PERMISSION_DENIED]:
            "Location permission was not allowed. You can paste a Google Maps link or enter your full address manually.",
          [error.POSITION_UNAVAILABLE]:
            "We could not detect your location. Please paste a Google Maps link or enter your full address manually.",
          [error.TIMEOUT]: "Location request timed out. Please try again or paste a Google Maps link manually.",
        };

        setLocationFeedback({
          type: "error",
          message: messageByCode[error.code] || "Could not get location. Please paste a Google Maps link or enter your full address manually.",
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !selectedService || !form.category) {
      focusFirstError(nextErrors);
      setSuccessNote(false);
      return;
    }

    const message = bookingFormMessage({
      name: form.name.trim(),
      phone: form.phone.trim(),
      area: finalArea,
      fullAddress: form.fullAddress.trim() || undefined,
      landmark: form.landmark.trim() || undefined,
      pincode: form.pincode.trim() || undefined,
      mapsLink: form.mapsLink.trim() || undefined,
      capturedLocation: capturedLocation || undefined,
      category: form.category,
      service: selectedService.name,
      price: selectedService.price,
      warranty: selectedService.warranty,
      acType: form.acType,
      brand: form.brand.trim() || undefined,
      preferredDate: form.preferredDate || undefined,
      preferredTime: form.preferredTime || undefined,
      issue: form.issue.trim() || undefined,
      importantNote: selectedService.importantNote,
      extraChargeNote: selectedService.extraChargeNote,
    });
    const whatsappUrl = createWhatsAppUrl(message);
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    setSuccessNote(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden border-b border-white/10 py-14 safe-bottom-padding sm:py-16 md:pb-20">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-[30rem] w-[min(46rem,90vw)] rounded-full bg-aqua/10 blur-3xl" />
      <div className="container-premium">
        <motion.div {...revealProps()} className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Book Fixaro"
            title="Book Your AC Service"
            description="Share your AC issue and preferred slot. Fixaro will confirm availability on WhatsApp before the visit."
          />
          <div className="max-w-md rounded-2xl border border-gold/25 bg-gold/10 p-4 text-sm leading-6 text-[#E8D7A8]">
            <Info aria-hidden="true" className="mb-2 h-4 w-4 text-gold" />
            No spare part replacement or extra material charge is added without customer approval.
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.16fr)_minmax(21rem,0.84fr)] lg:items-start">
          <motion.form
            {...revealProps(0.08)}
            onSubmit={handleSubmit}
            className="booking-panel rounded-[1.5rem] p-4 sm:p-5 lg:p-6"
            noValidate
          >
            <div className="mb-5">
              <p className="text-sm font-bold text-white">Quick booking</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickChips.map((chip) => (
                  <motion.button
                    key={chip.label}
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className={cn("quick-chip", activeChip === chip.label && "quick-chip-active")}
                    onClick={() => handleQuickChip(chip)}
                  >
                    {chip.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <FormGroup title="Customer Details">
                <FieldShell label="Name" htmlFor="booking-name" required error={errors.name}>
                  <input
                    ref={(node) => {
                      fieldRefs.current.name = node;
                    }}
                    id="booking-name"
                    name="name"
                    type="text"
                    value={form.name}
                    placeholder="Your name"
                    className={fieldClass(errors.name)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "booking-name-error" : undefined}
                    onChange={(event) => updateField("name", event.target.value)}
                  />
                </FieldShell>

                <FieldShell label="Phone number" htmlFor="booking-phone" required error={errors.phone}>
                  <input
                    ref={(node) => {
                      fieldRefs.current.phone = node;
                    }}
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    placeholder="10-digit mobile number"
                    className={fieldClass(errors.phone)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                    onChange={(event) => updateField("phone", event.target.value)}
                  />
                </FieldShell>
              </FormGroup>

              <FormGroup title="Location">
                <FieldShell label="Area / locality" htmlFor="booking-area" required error={errors.area}>
                  <div ref={areaSelectorRef} className="relative">
                    <input
                      ref={(node) => {
                        fieldRefs.current.area = node;
                      }}
                      id="booking-area"
                      name="area"
                      type="text"
                      value={areaSearch}
                      placeholder="Search or select your area"
                      autoComplete="off"
                      role="combobox"
                      aria-expanded={isAreaDropdownOpen}
                      aria-controls="booking-area-options"
                      aria-autocomplete="list"
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? "booking-area-error" : undefined}
                      className={cn(fieldClass(errors.area), "pr-11")}
                      onChange={(event) => handleAreaSearchChange(event.target.value)}
                      onClick={() => setIsAreaDropdownOpen(true)}
                      onFocus={() => setIsAreaDropdownOpen(true)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-white/[0.06] hover:text-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                      aria-label={isAreaDropdownOpen ? "Close area options" : "Open area options"}
                      onClick={() => setIsAreaDropdownOpen((current) => !current)}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-4 w-4 transition-transform", isAreaDropdownOpen && "rotate-180")}
                      />
                    </button>

                    {isAreaDropdownOpen ? (
                      <div
                        id="booking-area-options"
                        className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-40 max-h-[220px] overflow-y-auto rounded-2xl border border-white/12 bg-[#0E151B]/95 p-2 shadow-[0_20px_70px_rgb(0_0_0_/_0.45)] ring-1 ring-aqua/10 backdrop-blur-xl sm:max-h-[240px]"
                        role="listbox"
                      >
                        {areaOptions.length > 0 ? (
                          areaOptions.map((area) => (
                            <AreaOptionButton
                              key={area}
                              area={area}
                              selected={areaMode === "known" && form.area === area}
                              onSelect={() => selectKnownArea(area)}
                            />
                          ))
                        ) : (
                          <p className="px-3 py-3 text-sm font-semibold leading-5 text-muted">
                            No matching area found. Select Other to enter manually.
                          </p>
                        )}
                        <button
                          type="button"
                          role="option"
                          aria-selected={areaMode === "other"}
                          className={cn(
                            "mt-1 flex min-h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua",
                            areaMode === "other"
                              ? "border-gold/35 bg-gold/15 text-white"
                              : "border-gold/18 bg-gold/8 text-[#E8D7A8] hover:border-gold/35 hover:bg-gold/12",
                          )}
                          onClick={selectOtherArea}
                        >
                          <span>{otherAreaOption}</span>
                          <span className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">Manual</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </FieldShell>

                {areaMode === "other" ? (
                  <FieldShell label="Enter your area / locality" htmlFor="booking-custom-area" required error={errors.customArea}>
                    <input
                      ref={(node) => {
                        fieldRefs.current.customArea = node;
                      }}
                      id="booking-custom-area"
                      name="customArea"
                      type="text"
                      value={form.customArea}
                      placeholder="Example: Lingarajapuram, Banaswadi, Frazer Town"
                      className={fieldClass(errors.customArea)}
                      aria-invalid={Boolean(errors.customArea)}
                      aria-describedby={errors.customArea ? "booking-custom-area-error" : undefined}
                      onChange={(event) => updateField("customArea", event.target.value)}
                    />
                  </FieldShell>
                ) : null}

                <FieldShell label="Pincode" htmlFor="booking-pincode" error={errors.pincode}>
                  <input
                    ref={(node) => {
                      fieldRefs.current.pincode = node;
                    }}
                    id="booking-pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    placeholder="6-digit pincode"
                    className={fieldClass(errors.pincode)}
                    aria-invalid={Boolean(errors.pincode)}
                    aria-describedby={errors.pincode ? "booking-pincode-error" : undefined}
                    onChange={(event) => updateField("pincode", event.target.value)}
                  />
                </FieldShell>

                <div className="md:col-span-2">
                  <FieldShell label="Full address" htmlFor="booking-full-address" required error={errors.fullAddress}>
                    <input
                      ref={(node) => {
                        fieldRefs.current.fullAddress = node;
                      }}
                      id="booking-full-address"
                      name="fullAddress"
                      type="text"
                      value={form.fullAddress}
                      placeholder="Flat, building, street"
                      className={fieldClass(errors.fullAddress)}
                      aria-invalid={Boolean(errors.fullAddress)}
                      aria-describedby={errors.fullAddress ? "booking-full-address-error" : undefined}
                      onChange={(event) => updateField("fullAddress", event.target.value)}
                    />
                  </FieldShell>
                </div>

                <FieldShell label="Landmark" htmlFor="booking-landmark">
                  <input
                    ref={(node) => {
                      fieldRefs.current.landmark = node;
                    }}
                    id="booking-landmark"
                    name="landmark"
                    type="text"
                    value={form.landmark}
                    placeholder="Nearby landmark"
                    className={fieldClass()}
                    onChange={(event) => updateField("landmark", event.target.value)}
                  />
                </FieldShell>

                <div>
                  <FieldShell label="Google Maps location link" htmlFor="booking-maps-link">
                    <input
                      ref={(node) => {
                        fieldRefs.current.mapsLink = node;
                      }}
                      id="booking-maps-link"
                      name="mapsLink"
                      type="url"
                      value={form.mapsLink}
                      placeholder="Paste map link if available"
                      className={fieldClass()}
                      onChange={(event) => handleMapsLinkChange(event.target.value)}
                    />
                  </FieldShell>
                  {capturedLocation && form.mapsLink ? (
                    <p className="mt-2 text-xs font-bold text-aqua">Location link added</p>
                  ) : null}
                  <button
                    type="button"
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-aqua/25 bg-aqua/10 px-4 py-2.5 text-sm font-extrabold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    aria-label="Use my current location for booking"
                    disabled={isGettingLocation}
                    onClick={useCurrentLocation}
                  >
                    <LocateFixed aria-hidden="true" size={16} className={isGettingLocation ? "animate-spin" : undefined} />
                    {isGettingLocation ? "Getting location..." : "Use My Current Location"}
                  </button>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Adds a Google Maps link to your WhatsApp booking message. Please enter your area and full address manually.
                  </p>
                  <LocationMessage feedback={locationFeedback} />
                </div>
                <p className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-muted md:col-span-2">
                  Your location is only used to prepare the WhatsApp booking message. Fixaro does not store it on this website.
                </p>
              </FormGroup>

              <FormGroup title="Service Details">
                <FieldShell label="Service category" htmlFor="booking-category" required error={errors.category}>
                  <select
                    ref={(node) => {
                      fieldRefs.current.category = node;
                    }}
                    id="booking-category"
                    name="category"
                    value={form.category}
                    className={fieldClass(errors.category)}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? "booking-category-error" : undefined}
                    onChange={(event) => updateField("category", event.target.value as BookingFormState["category"])}
                  >
                    <option value="">Select service category</option>
                    {serviceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FieldShell>

                <FieldShell label="Service" htmlFor="booking-service" required error={errors.serviceSlug}>
                  <select
                    ref={(node) => {
                      fieldRefs.current.serviceSlug = node;
                    }}
                    id="booking-service"
                    name="service"
                    value={form.serviceSlug}
                    className={fieldClass(errors.serviceSlug)}
                    aria-invalid={Boolean(errors.serviceSlug)}
                    aria-describedby={errors.serviceSlug ? "booking-service-error" : undefined}
                    onChange={(event) => {
                      updateField("serviceSlug", event.target.value);
                      setActiveChip("");
                    }}
                    disabled={!form.category}
                  >
                    <option value="">{form.category ? "Select service" : "Select category first"}</option>
                    {filteredServices.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </FieldShell>

                <FieldShell label="AC type" htmlFor="booking-ac-type" required error={errors.acType}>
                  <select
                    ref={(node) => {
                      fieldRefs.current.acType = node;
                    }}
                    id="booking-ac-type"
                    name="acType"
                    value={form.acType}
                    className={fieldClass(errors.acType)}
                    aria-invalid={Boolean(errors.acType)}
                    aria-describedby={errors.acType ? "booking-ac-type-error" : undefined}
                    onChange={(event) => updateField("acType", event.target.value)}
                  >
                    <option value="">Select your AC type</option>
                    {acTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FieldShell>

                <FieldShell label="AC brand" htmlFor="booking-brand">
                  <input
                    ref={(node) => {
                      fieldRefs.current.brand = node;
                    }}
                    id="booking-brand"
                    name="brand"
                    type="text"
                    value={form.brand}
                    list="fixaro-ac-brands"
                    placeholder="Example: LG, Daikin, Voltas"
                    className={fieldClass()}
                    onChange={(event) => updateField("brand", event.target.value)}
                  />
                  <datalist id="fixaro-ac-brands">
                    {acBrands.map((brand) => (
                      <option key={brand} value={brand} />
                    ))}
                  </datalist>
                </FieldShell>

                <AnimatePresence>
                  {selectedService ? (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.24 }}
                      className="grid gap-3 rounded-2xl border border-aqua/15 bg-aqua/[0.07] p-3 text-sm text-silver md:col-span-2 sm:grid-cols-3"
                    >
                      <SummaryMetric icon={IndianRupee} label="Price" value={selectedService.price} />
                      <SummaryMetric icon={ShieldCheck} label="Warranty" value={selectedService.warranty} />
                      <SummaryMetric icon={Clock} label="Duration" value={selectedService.duration} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </FormGroup>

              <FormGroup title="Preferred Slot">
                <FieldShell label="Preferred date" htmlFor="booking-date" error={errors.preferredDate}>
                  <input
                    ref={(node) => {
                      fieldRefs.current.preferredDate = node;
                    }}
                    id="booking-date"
                    name="preferredDate"
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    className={fieldClass(errors.preferredDate)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={errors.preferredDate ? "booking-date-error" : undefined}
                    onChange={(event) => updateField("preferredDate", event.target.value)}
                  />
                </FieldShell>

                <FieldShell label="Preferred time" htmlFor="booking-time">
                  <select
                    ref={(node) => {
                      fieldRefs.current.preferredTime = node;
                    }}
                    id="booking-time"
                    name="preferredTime"
                    value={form.preferredTime}
                    className={fieldClass()}
                    onChange={(event) => updateField("preferredTime", event.target.value)}
                  >
                    <option value="">Select preferred time</option>
                    {preferredTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </FieldShell>
              </FormGroup>

              <FormGroup title="Issue">
                <div className="md:col-span-2">
                  <FieldShell label="Description" htmlFor="booking-issue" error={errors.issue}>
                    <textarea
                      ref={(node) => {
                        fieldRefs.current.issue = node;
                      }}
                      id="booking-issue"
                      name="issue"
                      value={form.issue}
                      maxLength={500}
                      rows={4}
                      placeholder="Example: AC is not cooling properly / water leakage / need installation"
                      className={cn(fieldClass(errors.issue), "resize-none py-3")}
                      aria-invalid={Boolean(errors.issue)}
                      aria-describedby={errors.issue ? "booking-issue-error booking-issue-count" : "booking-issue-count"}
                      onChange={(event) => updateField("issue", event.target.value)}
                    />
                  </FieldShell>
                  <p id="booking-issue-count" className="mt-2 text-right text-xs font-semibold text-muted">
                    {form.issue.length} / 500
                  </p>
                </div>
              </FormGroup>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PremiumButton type="submit" className="w-full sm:w-auto" aria-label="Open Fixaro booking message on WhatsApp">
                <MessageCircle aria-hidden="true" size={18} />
                Book on WhatsApp
              </PremiumButton>
              <p className="text-xs leading-5 text-muted">{globalPriceNote}</p>
            </div>

            <AnimatePresence>
              {successNote ? (
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                  className="mt-5 rounded-2xl border border-aqua/20 bg-aqua/10 p-4 text-sm font-semibold text-aqua"
                >
                  Message ready on WhatsApp. Please send it to confirm your request.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>

          <motion.aside {...revealProps(0.16)} className="space-y-4 lg:sticky lg:top-28">
            <BookingPreview form={form} selectedService={selectedService} finalArea={finalArea} />
            <ContactCards />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function AreaOptionButton({
  area,
  selected,
  onSelect,
}: {
  area: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={cn(
        "flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua",
        selected ? "bg-aqua/14 text-white shadow-[inset_3px_0_0_rgb(110_244_234_/_0.85)]" : "text-silver hover:bg-white/[0.06] hover:text-white",
      )}
      onClick={onSelect}
    >
      <span>{area}</span>
      {selected ? <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-aqua" /> : null}
    </button>
  );
}

function BookingPreview({
  form,
  selectedService,
  finalArea,
}: {
  form: BookingFormState;
  selectedService: (typeof services)[number] | undefined;
  finalArea: string;
}) {
  const preferredSlot = [form.preferredDate || "Flexible date", form.preferredTime || "Flexible time"].join(" / ");

  return (
    <div className="booking-preview-card rounded-[1.75rem] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-aqua">Booking Summary</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{selectedService?.name || "Select a service"}</h3>
        </div>
        <span className="rounded-2xl border border-gold/25 bg-gold/10 p-3 text-gold">
          <BadgeCheck aria-hidden="true" size={20} />
        </span>
      </div>

      {selectedService ? (
        <div className="space-y-2.5">
          <PreviewRow icon={IndianRupee} label="Price" value={selectedService.price} />
          <PreviewRow icon={ShieldCheck} label="Warranty" value={selectedService.warranty} />
          <PreviewRow icon={Clock} label="Duration" value={selectedService.duration} />
          <PreviewRow icon={MapPin} label="Area" value={finalArea || "Not added yet"} />
          <PreviewRow icon={MapPin} label="Address" value={form.fullAddress || "Not added yet"} />
          <PreviewRow icon={MapPin} label="Pincode" value={form.pincode || "Not added yet"} />
          <PreviewRow icon={CalendarClock} label="Preferred slot" value={preferredSlot} />
          <PreviewRow icon={Snowflake} label="AC type" value={form.acType || "Not selected yet"} />
        </div>
      ) : (
        <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-silver">
          Select a service to see price, warranty and booking details.
        </p>
      )}

      <div className="mt-4 rounded-2xl border border-aqua/15 bg-aqua/[0.08] p-3 text-sm leading-6 text-silver">
        <CheckCircle2 aria-hidden="true" className="mb-2 h-4 w-4 text-aqua" />
        Fixaro will confirm slot availability on WhatsApp.
      </div>
    </div>
  );
}

function ContactCards() {
  const contactCards = [
    {
      icon: Phone,
      title: "Call Fixaro",
      text: "Speak directly with Fixaro for urgent AC service.",
      button: `Call ${businessInfo.mainPhoneDisplay}`,
      href: businessInfo.mainPhoneHref,
      external: false,
    },
    {
      icon: Headphones,
      title: "Second Number",
      text: "Use alternate support number if the main line is busy.",
      button: `Call ${businessInfo.secondPhoneDisplay}`,
      href: businessInfo.secondPhoneHref,
      external: false,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Booking",
      text: "Send your booking request with service details.",
      button: "Message on WhatsApp",
      href: createWhatsAppUrl(supportMessage),
      external: true,
    },
  ];

  return (
    <div className="grid gap-3">
      {contactCards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="contact-card-glow rounded-3xl p-4">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
                <Icon aria-hidden="true" size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-silver">{card.text}</p>
                <PremiumButton
                  href={card.href}
                  external={card.external}
                  variant={card.external ? "primary" : "secondary"}
                  className="mt-4 min-h-11 w-full px-4 text-xs sm:w-auto"
                  aria-label={card.button}
                >
                  {card.button}
                </PremiumButton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LocationMessage({ feedback }: { feedback: LocationFeedback | null }) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <p
      className={cn(
        "mt-3 flex gap-2 rounded-2xl border p-3 text-xs font-semibold leading-5",
        isSuccess ? "border-aqua/20 bg-aqua/10 text-aqua" : "border-danger/25 bg-danger/10 text-[#FFC7C7]",
      )}
      role={isSuccess ? "status" : "alert"}
    >
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{feedback.message}</span>
    </p>
  );
}

function FormGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <legend className="px-1 text-xs font-extrabold uppercase tracking-[0.2em] text-aqua">{title}</legend>
      <div className="mt-3 grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function FieldShell({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
        <span>{label}</span>
        {required ? <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-aqua">Required</span> : null}
      </label>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${htmlFor}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-sm font-semibold text-danger"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
        <p className="mt-1 font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function PreviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.055] text-aqua">
        <Icon aria-hidden="true" size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function fieldClass(error?: string) {
  return cn("form-field-premium", error && "input-error-glow border-danger/60 focus:border-danger focus:ring-danger/35");
}
