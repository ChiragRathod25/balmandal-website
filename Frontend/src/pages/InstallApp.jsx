import React, { useState, useEffect } from 'react';

function InstallApp() {
  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-4">Install Our App</h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Get the best experience by installing our App. 
          <br />
          Enjoy fast access and offline support!
        </p>

        {/* Install Button (Only if available) */}
        {showInstallButton ? (
          <button
            onClick={handleInstallClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Install App
          </button>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">App is already installed or not available for installation.</p>
        )}
      </div>
    </div>
  );
}

export default InstallApp;
