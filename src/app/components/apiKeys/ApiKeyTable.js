'use client';
import { dashboardStyles as styles } from '../../styles/dashboard';

export const ApiKeyTable = ({ 
  apiKeys, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className={styles.apiKeys.table.container}>
      <table className={styles.apiKeys.table.table}>
        <thead>
          <tr className={styles.apiKeys.table.header}>
            <th className={styles.apiKeys.table.headerCell}>NAME</th>
            <th className={styles.apiKeys.table.headerCell}>TYPE</th>
            <th className={styles.apiKeys.table.headerCell}>USAGE</th>
            <th className={styles.apiKeys.table.headerCell}>KEY</th>
            <th className={styles.apiKeys.table.headerCell}>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className={styles.apiKeys.table.row}>
              <td className={styles.apiKeys.table.cell}>{key.name}</td>
              <td className={styles.apiKeys.table.cell}>
                <span className={styles.apiKeys.table.typeTag}>
                  {key.type || 'dev'}
                </span>
              </td>
              <td className={styles.apiKeys.table.cell}>0</td>
              <td className={styles.apiKeys.table.cell}>
                <code className={styles.apiKeys.table.keyCode}>
                  {key.key.substring(0, 8)}************************
                </code>
              </td>
              <td className={styles.apiKeys.table.cell}>
                <div className={styles.apiKeys.table.actions}>
                  <button
                    onClick={() => onView(key)}
                    className="text-[#222831] hover:text-[#eeeeee] transition-colors"
                    title="View API Key"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit(key)}
                    className="text-[#222831] hover:text-[#eeeeee] transition-colors"
                    title="Edit API Key"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(key)}
                    className="text-[#222831] hover:text-[#eeeeee] transition-colors"
                    title="Delete API Key"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 