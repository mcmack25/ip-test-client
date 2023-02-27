import { UserStatus } from './user-status.enum';

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  userStatus: UserStatus;
  department: string | null;
}
