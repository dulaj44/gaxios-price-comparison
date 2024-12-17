if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}


let deferredPrompt;

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from showing
    event.preventDefault();
    // Save the event so you can trigger it later
    deferredPrompt = event;

    // After 5 seconds, show the install prompt
    setTimeout(() => {
        if (deferredPrompt) {
            // Show the installation prompt
            deferredPrompt.prompt();

            // Wait for the user's response
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                // Reset the deferred prompt variable
                deferredPrompt = null;
            });
        }
    }, 5000);  // Delay of 5000 milliseconds (5 seconds)
});
