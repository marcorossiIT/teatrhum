// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

 self.addEventListener("fetch", event => {
    event.respondWith(
      fetch(event.request)
      .catch(error => {
        return caches.match(event.request) ;
      })
    );
 });