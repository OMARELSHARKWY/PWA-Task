// ===== Sever Worker ==============
window.addEventListener('load',event=>{
    navigator.serviceWorker.register('../sw.js')
    .then(reg=> {
        console.log("Service Worker registered",reg);
     }
    )
    .catch(err=>{
        console.log("Service Worker not registered",err);
    })

    // ===== Push Notification ==============
    Notification.requestPermission().then(perm=>{
        if(perm === 'granted'){
            console.log("Notification permission granted");
        }
    });

})

// ===== Install PWA ==============

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e;
    document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
});
