import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SelectedItem = {
  groupName: string;
  itemId: string;
  name: string;
  description: string;
};

export type BookingState = {
  serviceSlug: string | null;
  serviceTitle: string | null;
  items: SelectedItem[];
  dueDate: string;
  dueTime: string;
};

const EMPTY: BookingState = {
  serviceSlug: null,
  serviceTitle: null,
  items: [],
  dueDate: "",
  dueTime: "",
};

const STORAGE_KEY = "bam.booking";

type Ctx = {
  booking: BookingState;
  setBooking: (next: BookingState) => void;
  reset: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(EMPTY);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setBookingState({ ...EMPTY, ...(JSON.parse(raw) as BookingState) });
    } catch {
      /* ignore */
    }
  }, []);

  const setBooking = useCallback((next: BookingState) => {
    setBookingState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    setBookingState(EMPTY);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ booking, setBooking, reset }), [booking, setBooking, reset]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
