export interface IListTap {
  label: string;
  value: string | number;
}
export interface CategoryInterface {
  id: number;
  image: string;
  name: string;
}
export interface DestinationInterface {
  display: number;
  id: number;
  image: string;
  name: string;
  slug: string;
  status: number;
  viator_link: string;
  viator_number: number;
}
export interface Get_to_knowInterface {
  banner: string;
  id: number;
  min_price: number;
  number_of_flight: number;
  title: string;
}
export interface hotelInterface {
  avg_rate: number;
  id: number;
  image: string;
  location: string;
  max_price: number;
  min_price: number;
  name: string;
  reviews: number;
  star: number;
}