export class EventSummaryResponseDto {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  place: {
    direction: string;
    city: string;
    countryCode: string;
  };
}
