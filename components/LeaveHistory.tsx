
import React from 'react';
import { LeaveRequest, LeaveStatus } from '../types';

interface LeaveHistoryProps {
  requests: LeaveRequest[];
}

const StatusBadge: React.FC<{ status: LeaveStatus }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  let specificClasses = '';

  switch (status) {
    case LeaveStatus.APPROVED:
      specificClasses = 'bg-green-100 text-green-800';
      break;
    case LeaveStatus.REJECTED:
      specificClasses = 'bg-red-100 text-red-800';
      break;
    case LeaveStatus.PENDING:
      specificClasses = 'bg-yellow-100 text-yellow-800 animate-pulse';
      break;
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};

const LeaveHistory: React.FC<LeaveHistoryProps> = ({ requests }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Request History</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No leave requests found.</td>
                </tr>
              ) : (
                requests.map((request) => (
                    <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.startDate} to {request.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-sm truncate hidden md:table-cell">
                        <div className="text-sm text-gray-500">{request.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={request.status} />
                    </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
