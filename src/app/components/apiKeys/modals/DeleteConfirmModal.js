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
        <h2 className="text-2xl font-semibold text-white mb-4">
          Delete API Key '{apiKey.name}'
        </h2>
        
        <p className="text-[#94a3b8] text-lg mb-4">
          Are you sure you want to delete this API key? It will be invalidated and you will need to update it in your applications.
        </p>

        <p className="text-[#94a3b8] text-lg mb-8">
          This action is irreversible.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-white hover:text-[#94a3b8] transition-colors text-base font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(apiKey.id)}
            className="px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-base font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}; 