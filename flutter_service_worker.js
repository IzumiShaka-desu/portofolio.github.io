'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "65a2304699b27f6a4b2f2e599fc5acf5",
"assets/assets/fonts/Poppins-Black.ttf": "42cf9f0820d16f3ac2c26a7710ce70f2",
"assets/assets/fonts/Poppins-Bold.ttf": "c23534acbeddbaadfd0ab2d2bbfdfc84",
"assets/assets/fonts/Poppins-ExtraBold.ttf": "6b78c7ec468eb0e13c6c5c4c39203986",
"assets/assets/fonts/Poppins-ExtraLight.ttf": "8ea2657f263b6b2a404bfb57f4160013",
"assets/assets/fonts/Poppins-Light.ttf": "2a47a29ceb33c966c8d79f8d5a5ea448",
"assets/assets/fonts/Poppins-Medium.ttf": "ba95810b56f476990ca71d15139d5111",
"assets/assets/fonts/Poppins-Regular.ttf": "41e8dead03fb979ecc23b8dfb0fef627",
"assets/assets/fonts/Poppins-SemiBold.ttf": "342ba3d8ac29ac8c38d7cef8efbf2dc9",
"assets/assets/fonts/Poppins-Thin.ttf": "c0fafa8397437c95848724aed686d63b",
"assets/assets/icons/facebook.png": "45b1ba6bbebe824a1cfa422e7444186f",
"assets/assets/icons/facebookac.png": "62662ba1834bdd5be9f31a04f6fe89b6",
"assets/assets/icons/github.png": "0918d78648457def080137b179fc5608",
"assets/assets/icons/githubac.png": "012cdd7744f439532723964a4810d8bd",
"assets/assets/icons/ig.png": "49f17736ef07bf622c6f9e8dff5cdf16",
"assets/assets/icons/igac.png": "2d7be9a49d1a4ca10d9e337731203bfa",
"assets/assets/images/about.jpg": "38ad12e32bb4ebd84031b19e6689e4b4",
"assets/assets/images/cv.png": "1366105fa3b699a06547603a2bc470ec",
"assets/assets/images/fa.png": "7fb59a1ed07dda041908b9ce36ba3a42",
"assets/assets/images/img1.jpg": "335b99141497216208968cee2ceef0ae",
"assets/assets/images/img2.jpg": "c52fada5e1754ff5de8e5e56956576c8",
"assets/assets/images/img3.jpg": "706f89c9ffaef4f4bc6f508c4ddc2fca",
"assets/assets/images/img4.jpg": "279d602fe57ff4553720b93158671a30",
"assets/assets/images/mf.png": "626b6465a5d49b4fd52824e18fdba761",
"assets/assets/images/mm.png": "5159e5e1073e1cb590a7a2ed966b3c67",
"assets/assets/images/pp.jpg": "9eeed1359cbe4d1729f8cef089b38bc8",
"assets/assets/images/pp2.jpg": "a847f27e9fb66b7534d54145dd00a7e0",
"assets/assets/images/rc.jpg": "442336e08bf212a57ac17eeeedf73c50",
"assets/assets/images/scs.png": "cbf6723c551f2ad322ceb036c4b9f1de",
"assets/FontManifest.json": "6e116101432bca94db2b2484f38ba2c7",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/LICENSE": "b175a8b5354e10fd8c55125c264d60cd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "bd053d4699e838ce1608f4cee963084c",
"/": "bd053d4699e838ce1608f4cee963084c",
"main.dart.js": "a81803c613a8ec018b31369a456ed17b",
"manifest.json": "fd810f7e713bc9aa460e94ac22616723"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
