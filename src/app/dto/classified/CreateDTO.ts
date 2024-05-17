export class CreateDTO {
  title?: string;
  description?: string;
  price?: number;
  type?: string;
  category?: string;
  roomNumber?: number;
  livingRoomNumber?: number;
  grossArea?: number;
  netArea?: number;
  buildingAge?: number;
  floorLocation?: number;
  totalFloor?: number;
  isFurnished?: boolean;
  images?: File[];
}
