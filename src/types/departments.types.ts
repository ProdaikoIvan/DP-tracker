export interface City {
  name: string;
  address: string;
  disabled: boolean;
  url: string;
}

export interface Country {
  name: string;
  flag: string;
  cities: City[];
}

export interface SelectedDepartment {
  city: City;
  country: Country;
}
