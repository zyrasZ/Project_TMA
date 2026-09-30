export type Company = {
  id: string;
  name: string;
  username: string;
  taxCode: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
};
