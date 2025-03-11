export interface User {
  id: number;
  name: string;
  email: string;
  status: 'inactive' | 'pending' | 'active' | 'logically_deleted';
}
