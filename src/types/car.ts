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
  is_reserved: boolean;
  parking_zone_id: number;
  showcase_image_url?: string;
}

type ParkingZoneCoords = {
  latitude: number;
  longitude: number;
};

export type ParkingZone = {
  id: number;
  name: string;
  description: string;
  location: ParkingZoneCoords[];
};
