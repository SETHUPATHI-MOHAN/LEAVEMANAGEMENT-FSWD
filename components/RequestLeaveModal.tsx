
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LeaveRequest, LeaveType } from '../types';
import { suggestLeaveType } from '../services/geminiService';

interface RequestLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'status' | 'days'>) => void;
}

const RequestLeaveModal: React.FC<RequestLeaveModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [leaveType, setLeaveType] = useState<LeaveType>(LeaveType.ANNUAL);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState('');

  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setLeaveType(LeaveType.ANNUAL);
      setStartDate('');
      setEndDate('');
      setReason('');
      setError('');
      setIsSuggesting(false);
    }
  }, [isOpen]);

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newReason = e.target.value;
    setReason(newReason);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      if (newReason.trim().length > 10) {
        setIsSuggesting(true);
        suggestLeaveType(newReason).then(suggestedType => {
          if (suggestedType) {
            setLeaveType(suggestedType);
          }
          setIsSuggesting(false);
        });
      }
    }, 750); // 750ms debounce
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      setError('All fields are required.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
        setError('End date cannot be before start date.');
        return;
    }
    setError('');
    onSubmit({ type: leaveType, startDate, endDate, reason });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Request Leave</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Leave Type</label>
                <div className="relative">
                  <select
                    id="leaveType"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {Object.values(LeaveType).map(lt => <option key={lt} value={lt}>{lt}</option>)}
                  </select>
                  {isSuggesting && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-8 text-xs text-gray-500">
                          AI Suggesting...
                      </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  id="reason"
                  rows={4}
                  value={reason}
                  onChange={handleReasonChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Doctor's appointment, family vacation..."
                ></textarea>
                 <p className="mt-1 text-xs text-gray-500">AI will suggest a leave type as you type.</p>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeaveModal;
