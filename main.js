if ('serviceWorker' in navigator) { // Verifica si el navegador soporta Service Workers
    console.log('Service Worker is compatible'); // Muestra en consola que es compatible

    // Registra el Service Worker cuando la página termine de cargar
    window.addEventListener('load', function() {

        // Registra el archivo del Service Worker
        navigator.serviceWorker.register('CV PWA.js', { scope: './' }) // "CV PWA.js" es el nombre del archivo del Service Worker

        // Si el registro fue exitoso
        .then(reg => console.log('Service Worker registered successfully with scope: ', reg.scope, ')'))

        // Si el registro falla
        .catch(err => console.log('Service Worker registration failed: ', err));
    });

} else {
    // Si el navegador no soporta Service Workers, muestra un mensaje en consola
    console.log('Service Worker is not compatible');
}