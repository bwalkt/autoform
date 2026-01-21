import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CalendarWithPricing, type DayPrice } from "./CalendarWithPricing";
import { eachDayOfInterval, startOfMonth, endOfMonth, getDay } from "date-fns";

const meta: Meta<typeof CalendarWithPricing> = {
  title: "Form/Date/CalendarWithPricing",
  component: CalendarWithPricing,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarWithPricing>;

// Simple seeded pseudo-random for deterministic results in visual tests
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate sample prices for the current month
const generatePrices = (basePrice: number = 100, seed: number = 42): DayPrice[] => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return days.map((date, index) => {
    // Weekend prices are higher
    const dayOfWeek = getDay(date);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 1.3 : 1;

    // Deterministic variation based on seed
    const variation = Math.floor(seededRandom(seed + index) * 40) - 20;
    const price = Math.round((basePrice + variation) * weekendMultiplier);

    // Some dates have highlighted (deal) prices
    const isHighlighted = price < basePrice - 10;

    return {
      date,
      price,
      isHighlighted,
      available: true,
    };
  });
};

// Default CalendarWithPricing
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const prices = React.useMemo(() => generatePrices(150), []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
        />
        {date && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

// Flight booking scenario
export const FlightPricing: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    // Generate flight-like prices
    const prices = React.useMemo(() => {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

      return days.map((d, index) => {
        const dayOfWeek = getDay(d);
        let basePrice = 250;

        // Tuesday and Wednesday are cheapest
        if (dayOfWeek === 2 || dayOfWeek === 3) {
          basePrice = 180;
        }
        // Friday and Sunday are most expensive
        else if (dayOfWeek === 5 || dayOfWeek === 0) {
          basePrice = 350;
        }

        // Deterministic variation for visual test stability
        const variation = Math.floor(seededRandom(43 + index) * 50);
        const price = basePrice + variation;

        return {
          date: d,
          price,
          isHighlighted: price < 220,
          available: true,
        };
      });
    }, []);

    return (
      <div className="w-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-center">Select departure date</h3>
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Green prices indicate best deals
        </p>
      </div>
    );
  },
};

// Hotel booking scenario
export const HotelPricing: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    const prices = React.useMemo(() => {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

      return days.map((d, index) => {
        const dayOfWeek = getDay(d);
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Fri, Sat
        const basePrice = isWeekend ? 189 : 129;
        // Deterministic variation for visual test stability
        const variation = Math.floor(seededRandom(44 + index) * 30);

        return {
          date: d,
          price: basePrice + variation,
          isHighlighted: basePrice + variation < 140,
          available: true,
        };
      });
    }, []);

    return (
      <div className="w-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-center">Select check-in date</h3>
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
          currency="$"
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Per night rates shown
        </p>
      </div>
    );
  },
};

// With some unavailable dates
export const WithUnavailableDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();

    const prices = React.useMemo(() => {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

      return days.map((d, index) => ({
        date: d,
        // Deterministic values for visual test stability
        price: 100 + Math.floor(seededRandom(45 + index) * 80),
        isHighlighted: seededRandom(145 + index) > 0.8,
        // Some dates are sold out
        available: index % 5 !== 0,
      }));
    }, []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Some dates are sold out
        </p>
      </div>
    );
  },
};

// Different currency
export const EuroCurrency: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const prices = React.useMemo(() => generatePrices(80), []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
          currency="€"
        />
      </div>
    );
  },
};

// Custom price formatter
export const CustomPriceFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const prices = React.useMemo(() => generatePrices(1500), []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
          formatPrice={(price) => `$${(price / 100).toFixed(2)}`}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Prices in dollars (formatted from cents)
        </p>
      </div>
    );
  },
};

// With min/max date
export const WithMinMaxDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const prices = React.useMemo(() => generatePrices(200), []);

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
          minDate={minDate}
          maxDate={maxDate}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Only next 14 days are selectable
        </p>
      </div>
    );
  },
};

// Week starts Monday
export const WeekStartsMonday: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const prices = React.useMemo(() => generatePrices(120), []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
          weekStartsOn={1}
        />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const prices = React.useMemo(() => generatePrices(100), []);
    const today = new Date();

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={today}
          prices={prices}
          disabled
        />
      </div>
    );
  },
};

// With preselected date
export const WithPreselectedDate: Story = {
  render: () => {
    const today = new Date();
    const preselected = new Date(today);
    preselected.setDate(today.getDate() + 5);

    const [date, setDate] = React.useState<Date | undefined>(preselected);
    const prices = React.useMemo(() => generatePrices(150), []);

    return (
      <div className="w-[400px]">
        <CalendarWithPricing
          value={date}
          onChange={setDate}
          prices={prices}
        />
        {date && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};
