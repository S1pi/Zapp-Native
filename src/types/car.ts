export interface Car {
  id: number;
  brand: string;
  model: string;
  year: string;
  license_plate: string;
  seats: number;
  latitude: number;
  longitude: number;
  dealership_id: number;
  reserved: boolean;
  parking_zone_id: number;
  showcase_image_url?: string;
}
