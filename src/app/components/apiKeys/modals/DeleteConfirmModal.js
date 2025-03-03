'use client';
import { dashboardStyles as styles } from '../../../styles/dashboard';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  apiKey
}) => {
  if (!isOpen || !apiKey) return null;

  return (
    <div className={styles.modal.overlay}>
      <div className="bg-[#1e293b] rounded-2xl p-8 w-[480px]">
        <h2 className="text-2xl font-semibold text-white mb-2">Delete API Key</h2>
        <p className="text-[#94a3b8] mb-6">
          Are you sure you want to delete the API key &ldquo;{apiKey.name}&rdquo;? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#334155] text-white hover:bg-[#475569] transition-colors text-base font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(apiKey.id)}
            className="px-6 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white transition-colors text-base font-medium rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}; 