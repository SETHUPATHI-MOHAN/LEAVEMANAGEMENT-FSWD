
export enum LeaveType {
  ANNUAL = 'Annual',
  SICK = 'Sick',
  UNPAID = 'Unpaid',
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface LeaveRequest {
  id: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  days: number;
}

export type LeaveBalances = { 
  [key in LeaveType]: number 
};
