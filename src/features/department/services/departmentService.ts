import { departments } from '../data/departments.data';
import type { SelectedDepartment } from '../types/department.types';

const departmentByHost = new Map<string, SelectedDepartment>(
  departments.flatMap((country) =>
    country.cities.map((city) => [new URL(city.url).hostname.toLowerCase(), { city, country }])
  )
);

const departmentByName = new Map<string, SelectedDepartment>(
  departments.flatMap((country) =>
    country.cities.map((city) => [city.name.toLowerCase(), { city, country }])
  )
);

export const findDepartmentByUrl = (targetUrl: string): SelectedDepartment | null => {
  const host = URL.parse(targetUrl)?.hostname.toLowerCase();
  if (!host) return null;

  return departmentByHost.get(host) ?? null;
};

export const findDepartmentByCityName = (cityName: string): SelectedDepartment | null => {
  return departmentByName.get(cityName.toLowerCase()) ?? null;
};
