
import React from 'react';
import { LeaveBalances, LeaveType } from '../types';

interface LeaveBalanceProps {
  balances: LeaveBalances;
}

const ICONS: { [key in LeaveType]: React.ReactNode } = {
  [LeaveType.ANNUAL]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  [LeaveType.SICK]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  [LeaveType.UNPAID]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
};

const COLORS = {
  [LeaveType.ANNUAL]: 'from-blue-500 to-blue-600',
  [LeaveType.SICK]: 'from-orange-500 to-orange-600',
  [LeaveType.UNPAID]: 'from-gray-500 to-gray-600'
};

const LeaveBalance: React.FC<LeaveBalanceProps> = ({ balances }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Leave Balances</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.keys(balances) as Array<LeaveType>).map((type) => (
          <div key={type} className={`bg-gradient-to-br ${COLORS[type]} text-white rounded-xl shadow-lg p-6 flex justify-between items-center`}>
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{type} Leave</p>
              <p className="text-4xl font-bold">{balances[type]}</p>
              <p className="text-sm opacity-80">Days remaining</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              {ICONS[type]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
