export class EventSummaryResponseDto {
  id: string;
  name: string;
  description: string;
  date: Date;
  place: {
    direction: string;
    city: string;
    countryCode: string;
  };
}
