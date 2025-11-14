
import { LeaveRequest, LeaveBalances, LeaveType, LeaveStatus } from './types';

export const INITIAL_LEAVE_BALANCES: LeaveBalances = {
  [LeaveType.ANNUAL]: 15,
  [LeaveType.SICK]: 10,
  [LeaveType.UNPAID]: 0,
};

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: '1',
    type: LeaveType.ANNUAL,
    startDate: '2024-07-10',
    endDate: '2024-07-12',
    reason: 'Family vacation to the beach.',
    status: LeaveStatus.APPROVED,
    days: 3,
  },
  {
    id: '2',
    type: LeaveType.SICK,
    startDate: '2024-06-20',
    endDate: '2024-06-20',
    reason: 'Had a fever and flu symptoms.',
    status: LeaveStatus.APPROVED,
    days: 1,
  },
  {
    id: '3',
    type: LeaveType.UNPAID,
    startDate: '2024-05-15',
    endDate: '2024-05-16',
    reason: 'Personal emergency.',
    status: LeaveStatus.APPROVED,
    days: 2,
  },
    {
    id: '4',
    type: LeaveType.ANNUAL,
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    reason: 'Trip to the mountains.',
    status: LeaveStatus.PENDING,
    days: 5,
  },
  {
    id: '5',
    type: LeaveType.ANNUAL,
    startDate: '2024-04-01',
    endDate: '2024-04-02',
    reason: 'Attending a friend\'s wedding.',
    status: LeaveStatus.REJECTED,
    days: 2,
  },
];
