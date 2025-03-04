'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaHome, FaUser, FaClipboardList, FaPlayCircle, FaBookOpen } from 'react-icons/fa';
import { dashboardStyles as styles } from '../styles/dashboard';
import { apiKeyService } from '../services/apiKeyService';
import {
  ApiKeyTable,
  CreateApiKeyModal,
  EditApiKeyModal,
  ViewApiKeyModal,
  DeleteConfirmModal
} from '../components/apiKeys';

export default function Dashboard() {
  // State for API keys and loading
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State for create key modal
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [keyType, setKeyType] = useState('development');
  const [monthlyLimit, setMonthlyLimit] = useState('1000');
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);

  // State for edit key modal
  const [showEditKeyModal, setShowEditKeyModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editKeyName, setEditKeyName] = useState('');
  const [editKeyType, setEditKeyType] = useState('development');
  const [editMonthlyLimit, setEditMonthlyLimit] = useState('1000');
  const [editLimitEnabled, setEditLimitEnabled] = useState(false);
  const [editPiiEnabled, setEditPiiEnabled] = useState(false);

  // State for view key modal
  const [showViewKeyModal, setShowViewKeyModal] = useState(false);
  const [viewingKey, setViewingKey] = useState(null);

  // State for delete confirmation modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      toast.error('Failed to fetch API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setIsCreating(true);
    try {
      const data = await apiKeyService.createApiKey({
        name: newKeyName,
        type: keyType,
        monthlyLimit: limitEnabled ? parseInt(monthlyLimit) : null,
        piiEnabled: false,
      });
      
      setNewlyCreatedKey(data);
      await fetchApiKeys();
      setShowNewKeyModal(false);
      setNewKeyName('');
      setKeyType('development');
      setLimitEnabled(false);
      setMonthlyLimit('1000');
      toast.success('API key created successfully');
    } catch (error) {
      toast.error('Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateApiKey = async () => {
    if (!editingKey || !editKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      await apiKeyService.updateApiKey(editingKey.id, {
        name: editKeyName,
        type: editKeyType,
        monthlyLimit: editLimitEnabled ? parseInt(editMonthlyLimit) : null,
        piiEnabled: editPiiEnabled,
      });
      
      await fetchApiKeys();
      setShowEditKeyModal(false);
      setEditingKey(null);
      toast.success('API key updated successfully');
    } catch (error) {
      toast.error('Failed to update API key');
    }
  };

  const handleDeleteApiKey = async (keyId) => {
    try {
      await apiKeyService.deleteApiKey(keyId);
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      setShowDeleteConfirmModal(false);
      setDeletingKey(null);
      toast.success('API key deleted successfully');
    } catch (error) {
      toast.error('Failed to delete API key');
    }
  };

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <nav className={styles.header.nav}>
          <div className={styles.header.gradient}></div>
          <div className={styles.header.container}>
            <div className="flex items-center gap-2">
              <h1 className={styles.header.title}>Overview</h1>
              <div className={styles.header.breadcrumb}>
                <span>Pages</span>
                <span className="mx-2">/</span>
                <span>Overview</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className={styles.header.status.container}>
                <div className={styles.header.status.dot}></div>
                <span className={styles.header.status.text}>Operational</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* API Keys Section */}
          <div className={styles.apiKeys.container}>
            <div className={styles.apiKeys.header.container}>
              <div className="flex items-center gap-2">
                <h2 className={styles.apiKeys.header.title}>API Keys</h2>
                <button
                  onClick={() => setShowNewKeyModal(true)}
                  className={styles.apiKeys.header.addButton}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <p className={styles.apiKeys.description}>
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>

            <ApiKeyTable
              apiKeys={apiKeys}
              onView={(key) => {
                setViewingKey(key);
                setShowViewKeyModal(true);
              }}
              onEdit={(key) => {
                setEditingKey(key);
                setEditKeyName(key.name);
                setEditKeyType(key.type || "development");
                setEditMonthlyLimit(key.monthlyLimit?.toString() || "1000");
                setEditLimitEnabled(key.monthlyLimit !== null && key.monthlyLimit !== undefined);
                setEditPiiEnabled(key.piiEnabled || false);
                setShowEditKeyModal(true);
              }}
              onDelete={(key) => {
                setDeletingKey(key);
                setShowDeleteConfirmModal(true);
              }}
            />
          </div>
        </main>

        {/* Modals */}
        <CreateApiKeyModal
          isOpen={showNewKeyModal}
          onClose={() => setShowNewKeyModal(false)}
          onCreate={handleCreateApiKey}
          keyName={newKeyName}
          onKeyNameChange={(e) => setNewKeyName(e.target.value)}
          keyType={keyType}
          onKeyTypeChange={(e) => setKeyType(e.target.value)}
          limitEnabled={limitEnabled}
          onLimitEnabledChange={(e) => setLimitEnabled(e.target.checked)}
          monthlyLimit={monthlyLimit}
          onMonthlyLimitChange={(e) => setMonthlyLimit(e.target.value)}
          isCreating={isCreating}
        />

        <EditApiKeyModal
          isOpen={showEditKeyModal}
          onClose={() => {
            setShowEditKeyModal(false);
            setEditingKey(null);
          }}
          onUpdate={handleUpdateApiKey}
          keyName={editKeyName}
          onKeyNameChange={(e) => setEditKeyName(e.target.value)}
          keyType={editKeyType}
          onKeyTypeChange={(e) => setEditKeyType(e.target.value)}
          limitEnabled={editLimitEnabled}
          onLimitEnabledChange={(e) => setEditLimitEnabled(e.target.checked)}
          monthlyLimit={editMonthlyLimit}
          onMonthlyLimitChange={(e) => setEditMonthlyLimit(e.target.value)}
          piiEnabled={editPiiEnabled}
          onPiiEnabledChange={(e) => setEditPiiEnabled(e.target.checked)}
        />

        <ViewApiKeyModal
          isOpen={showViewKeyModal}
          onClose={() => {
            setShowViewKeyModal(false);
            setViewingKey(null);
          }}
          apiKey={viewingKey}
        />

        <DeleteConfirmModal
          isOpen={showDeleteConfirmModal}
          onClose={() => {
            setShowDeleteConfirmModal(false);
            setDeletingKey(null);
          }}
          onConfirm={handleDeleteApiKey}
          apiKey={deletingKey}
        />

        {/* Display New API Key Modal */}
        {newlyCreatedKey && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">New API Key Created</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Make sure to copy your API key now. You won&apos;t be able to see it again!
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm break-all">
                  {newlyCreatedKey.key}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(newlyCreatedKey.key);
                    toast.success("API key copied to clipboard");
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    setNewlyCreatedKey(null);
                    setShowNewKeyModal(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 