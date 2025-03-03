'use client';
import { dashboardStyles as styles } from '../../../styles/dashboard';
import { toast } from 'react-hot-toast';

export const ViewApiKeyModal = ({
  isOpen,
  onClose,
  apiKey
}) => {
  if (!isOpen || !apiKey) return null;

  // Helper function to format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date not available';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  // Helper function to format monthly limit
  const formatMonthlyLimit = () => {
    if (apiKey.monthly_limit !== undefined && apiKey.monthly_limit !== null) {
      const limit = parseInt(apiKey.monthly_limit);
      if (!isNaN(limit)) {
        return `${limit.toLocaleString()} requests per month`;
      }
    }
    return 'Unlimited requests per month';
  };

  return (
    <div className={styles.modal.overlay}>
      <div className="bg-[#1e293b] rounded-2xl p-8 w-[480px]">
        <h2 className="text-2xl font-semibold text-white mb-4">
          API Key Details
        </h2>

        <div className="space-y-6">
          {/* Key Name */}
          <div>
            <label className="block text-[#94a3b8] mb-2">Key Name</label>
            <div className="text-white">{apiKey.name}</div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-[#94a3b8] mb-2">API Key</label>
            <div className="bg-[#0f172a] p-4 rounded-xl flex items-center justify-between gap-4">
              <code className="font-mono text-white break-all">{apiKey.key}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey.key);
                  toast.success('API key copied to clipboard');
                }}
                className="text-[#94a3b8] hover:text-white transition-colors flex-shrink-0"
                title="Copy to clipboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Key Type */}
          <div>
            <label className="block text-[#94a3b8] mb-2">Key Type</label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#0f172a] rounded-full text-white text-sm">
                {apiKey.type || 'dev'}
              </span>
              <span className="text-[#94a3b8]">
                {apiKey.type === 'production' 
                  ? 'Rate limited to 1,000 requests/minute'
                  : 'Rate limited to 100 requests/minute'
                }
              </span>
            </div>
          </div>

          {/* Monthly Usage */}
          <div>
            <label className="block text-[#94a3b8] mb-2">Monthly Usage</label>
            <div className="text-white">
              <div className="mb-2">
                {formatMonthlyLimit()}
              </div>
              <div className="text-sm text-[#94a3b8]">
                Current usage: 0 requests this month
              </div>
            </div>
          </div>

          {/* Created Date */}
          <div>
            <label className="block text-[#94a3b8] mb-2">Created</label>
            <div className="text-white">
              {formatDate(apiKey.created_at)}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#334155] text-white hover:bg-[#475569] transition-colors text-base font-medium rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 