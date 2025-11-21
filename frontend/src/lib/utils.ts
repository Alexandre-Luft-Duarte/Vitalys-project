import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateTime: string) {
    const [date, time] = dateTime.split("T");
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
