'use client';
import { dashboardStyles as styles } from '../../../styles/dashboard';

export const EditApiKeyModal = ({
  isOpen,
  onClose,
  onUpdate,
  keyName,
  onKeyNameChange,
  keyType,
  onKeyTypeChange,
  limitEnabled,
  onLimitEnabledChange,
  monthlyLimit,
  onMonthlyLimitChange,
  piiEnabled,
  onPiiEnabledChange
}) => {
  if (!isOpen) return null;

  const rateLimit = keyType === 'production' ? '1,000' : '100';

  return (
    <div className={styles.modal.overlay}>
      <div className={styles.modal.container}>
        <h2 className={styles.modal.title}>Edit API key</h2>
        <p className={styles.modal.description}>
          Enter a new limit for the API key and configure PII restrictions.
        </p>

        {/* Key Name Input */}
        <div className={styles.modal.inputGroup.container}>
          <div className="flex items-center justify-between mb-2">
            <label className={styles.modal.inputGroup.label}>
              Key Name
            </label>
            <span className={styles.modal.inputGroup.description}>— A unique name to identify this key</span>
          </div>
          <input
            type="text"
            value={keyName}
            onChange={onKeyNameChange}
            placeholder="Key Name"
            className={styles.modal.inputGroup.input}
          />
        </div>

        {/* Key Type */}
        <div className={styles.modal.inputGroup.container}>
          <div className="flex items-center justify-between mb-2">
            <label className={styles.modal.inputGroup.label}>
              Key Type
            </label>
            <span className={styles.modal.inputGroup.description}>— Environment for this key</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#334155] bg-[#0f172a]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white">{keyType}</span>
            </div>
            <span className="text-[#94a3b8]">
              Rate limited to {rateLimit} requests/minute
            </span>
          </div>
        </div>

        {/* Monthly Usage Limit */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="editLimitUsage"
              checked={limitEnabled}
              onChange={onLimitEnabledChange}
              className="w-5 h-5 rounded text-[#0052ff] focus:ring-[#0052ff] bg-[#0f172a] border-[#334155]"
            />
            <label htmlFor="editLimitUsage" className="text-lg font-semibold text-[#1a1f36]">
              Limit monthly usage*
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
                className={styles.modal.inputGroup.input}
              />
              <div className="mt-2 text-sm text-[#94a3b8]">
                Current usage: 0 requests this month
              </div>
            </div>
          )}
          <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8]">
            If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
          </p>
        </div>

        {/* PII Restrictions */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="editPiiRestrictions"
              checked={piiEnabled}
              onChange={onPiiEnabledChange}
              className="w-5 h-5 rounded text-[#0052ff] focus:ring-[#0052ff] bg-[#0f172a] border-[#334155]"
            />
            <label htmlFor="editPiiRestrictions" className="text-lg font-semibold text-[#1a1f36]">
              Enable PII Restrictions
            </label>
            <span className="text-[#94a3b8]">— Configure how to handle Personal Identifiable Information (PII) in user queries</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.modal.buttons.container}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#334155] text-white hover:bg-[#475569] transition-colors text-base font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className={styles.modal.buttons.submit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}; 