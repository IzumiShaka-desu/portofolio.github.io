// The previous Flutter build registered a service worker under this name.
// Browsers re-fetch it on visit, so this replacement clears its caches and unregisters itself.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.map((key) => caches.delete(key)));
			await self.registration.unregister();
			const clients = await self.clients.matchAll({ type: 'window' });
			clients.forEach((client) => client.navigate(client.url));
		})()
	);
});
