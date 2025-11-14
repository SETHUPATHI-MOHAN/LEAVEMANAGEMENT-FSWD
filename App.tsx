
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LeaveBalance from './components/LeaveBalance';
import LeaveHistory from './components/LeaveHistory';
import RequestLeaveModal from './components/RequestLeaveModal';
import { LeaveRequest, LeaveBalances, LeaveStatus, LeaveType } from './types';
import { INITIAL_LEAVE_BALANCES, INITIAL_LEAVE_REQUESTS } from './constants';

function App() {
  const [balances, setBalances] = useState<LeaveBalances>(INITIAL_LEAVE_BALANCES);
  const [requests, setRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleRequestSubmit = useCallback((newRequestData: Omit<LeaveRequest, 'id' | 'status' | 'days'>) => {
    const days = calculateDays(newRequestData.startDate, newRequestData.endDate);
    const newRequest: LeaveRequest = {
      ...newRequestData,
      id: new Date().toISOString(),
      status: LeaveStatus.PENDING,
      days,
    };

    setRequests(prev => [newRequest, ...prev]);
    setIsModalOpen(false);

    // Simulate backend approval process
    setTimeout(() => {
      const isApproved = Math.random() > 0.3; // 70% chance of approval
      const finalStatus = isApproved ? LeaveStatus.APPROVED : LeaveStatus.REJECTED;

      setRequests(prev => prev.map(req => {
        if (req.id === newRequest.id) {
          return { ...req, status: finalStatus };
        }
        return req;
      }));
      
      if (isApproved && newRequest.type !== LeaveType.UNPAID) {
        setBalances(prev => ({
          ...prev,
          [newRequest.type]: prev[newRequest.type] - days,
        }));
      }

    }, 2000);
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header onNewRequest={() => setIsModalOpen(true)} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <LeaveBalance balances={balances} />
        <LeaveHistory requests={requests} />
      </main>
      <RequestLeaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
}

export default App;
