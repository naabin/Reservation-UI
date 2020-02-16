import { DateTime } from "luxon";

export class OpeningHours {
    id: number;
    dayOfWeek: string;
    openFrom: DateTime;
    openUntil: DateTime
}