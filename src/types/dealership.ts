type Dealership = {
  id: number;
  name: string;
  address: string;
};

type DealershipCreate = Omit<Dealership, 'id'>;

export type {Dealership, DealershipCreate};
