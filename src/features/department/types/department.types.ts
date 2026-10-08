export interface City {
  name: string;
  address: string;
  url: string;
}

export interface Country {
  name: string;
  code: string;
  cities: City[];
}

export interface SelectedDepartment {
  city: City;
  country: Country;
}
