'use client';

import { useRouter } from 'next/navigation';

const ProtectedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Protected Route</h1>
        <p className="text-gray-600 text-center mb-6">
          You have successfully accessed the protected route with a valid API key.
        </p>
        <button
          onClick={() => router.push('/playground')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Playground
        </button>
      </div>
    </div>
  );
};

export default ProtectedPage; 