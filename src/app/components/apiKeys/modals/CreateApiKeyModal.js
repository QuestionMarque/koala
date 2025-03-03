'use client';
import { dashboardStyles as styles } from '../../../styles/dashboard';

export const CreateApiKeyModal = ({
  isOpen,
  onClose,
  onCreate,
  keyName,
  onKeyNameChange,
  keyType,
  onKeyTypeChange,
  limitEnabled,
  onLimitEnabledChange,
  monthlyLimit,
  onMonthlyLimitChange,
  isCreating
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal.overlay}>
      <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-[#1e293b] dark:to-[#0f172a] rounded-2xl p-8 w-[480px] shadow-xl">
        <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-white mb-4">
          Create new API key
        </h2>
        <p className="text-[#64748b] dark:text-[#94a3b8] mb-8">
          Create a new API key to authenticate your requests.
        </p>

        {/* Key Name Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[#334155] dark:text-[#e2e8f0] font-medium">
              Key Name
            </label>
            <span className="text-[#64748b] dark:text-[#94a3b8] text-sm">— A unique name to identify this key</span>
          </div>
          <input
            type="text"
            value={keyName}
            onChange={onKeyNameChange}
            placeholder="Enter key name"
            className="w-full px-4 py-2.5 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl text-[#0f172a] dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] dark:focus:ring-[#60a5fa]"
          />
        </div>

        {/* Key Type */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[#334155] dark:text-[#e2e8f0] font-medium">
              Key Type
            </label>
            <span className="text-[#64748b] dark:text-[#94a3b8] text-sm">— Environment for this key</span>
          </div>
          <select
            value={keyType}
            onChange={onKeyTypeChange}
            className="w-full px-4 py-2.5 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl text-[#0f172a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] dark:focus:ring-[#60a5fa]"
          >
            <option value="development">Development</option>
            <option value="production">Production</option>
          </select>
          <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8]">
            Rate limited to {keyType === 'production' ? '1,000' : '100'} requests/minute
          </p>
        </div>

        {/* Monthly Usage Limit */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="limitUsage"
              checked={limitEnabled}
              onChange={onLimitEnabledChange}
              className="w-5 h-5 rounded text-[#3b82f6] dark:text-[#60a5fa] focus:ring-[#3b82f6] dark:focus:ring-[#60a5fa] bg-white dark:bg-[#1e293b] border-[#e2e8f0] dark:border-[#334155]"
            />
            <label htmlFor="limitUsage" className="text-[#334155] dark:text-[#e2e8f0] font-medium">
              Limit monthly usage
            </label>
          </div>
          {limitEnabled && (
            <div>
              <input
                type="number"
                value={monthlyLimit}
                onChange={onMonthlyLimitChange}
                min="1"
                placeholder="Enter monthly request limit"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl text-[#0f172a] dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] dark:focus:ring-[#60a5fa]"
              />
              <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8]">
                If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#f1f5f9] dark:bg-[#334155] text-[#475569] dark:text-white hover:bg-[#e2e8f0] dark:hover:bg-[#475569] transition-colors text-base font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={isCreating}
            className="px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors text-base font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </>
            ) : (
              'Create API Key'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 