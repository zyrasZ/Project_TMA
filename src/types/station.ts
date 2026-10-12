export interface Station {
  id: string;
  name: string;
  address: string;
  type: string;
  expireDate: string;
  status: 'active' | 'expired';
  tanks?: any[];
  pumps?: any[];
}
