'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/icon.png": "e692098ad2497a1681de0bf17ae4a365",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"manifest.json": "91cbbacef30a65b7ff9e18587d00a98b",
"index.html": "f3f43396b76b2db3a210694d7e3c22b2",
"/": "f3f43396b76b2db3a210694d7e3c22b2",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin.json": "f8cd5fcc2245e93cddde7d4a549b2d74",
"assets/assets/cards/ace_of_clubs.png": "07d1c180bead76a0b8cf8e488dfc2755",
"assets/assets/cards/jack_of_spades.png": "d77ce402c3977e303abeed8ec5bb35a5",
"assets/assets/cards/5_of_clubs.png": "3781bf44a82cad8ef837e6ba281427c9",
"assets/assets/cards/2_of_spades.png": "2354275da56e304199f694388a8aaae6",
"assets/assets/cards/8_of_spades.png": "747667555c7c5d6799ca3545463372b0",
"assets/assets/cards/6_of_diamonds.png": "ee5053d458469b151ef1f4503b5ab12f",
"assets/assets/cards/8_of_diamonds.png": "8afee604213ca296067245ce18458af2",
"assets/assets/cards/4_of_diamonds.png": "58bd0a6383829cbce3747c245c0b204c",
"assets/assets/cards/king_of_clubs.png": "f0dc748d3d36f265ab670c8ce0332e3d",
"assets/assets/cards/king_of_spades.png": "aebc913c5eb0ecd7859218636929c8ae",
"assets/assets/cards/6_of_spades.png": "5d221b2a958bb6b66b4e57de437c0906",
"assets/assets/cards/3_of_diamonds.png": "b529e1c14fef2ffc07c3c4eac94c31f4",
"assets/assets/cards/back.png": "8ed6742735dd2b488d54e98ec2854975",
"assets/assets/cards/4_of_hearts.png": "5ad913da63724447b7c94d1fb2d293a6",
"assets/assets/cards/queen_of_hearts.png": "8065dc2a89d1be1e9908343fb99d82cc",
"assets/assets/cards/2_of_diamonds.png": "0b5b5249b22ada06106be8b73938be9e",
"assets/assets/cards/king_of_diamonds.png": "9588f72f2c9d6898c9af3b20bcde7c2f",
"assets/assets/cards/10_of_diamonds.png": "4324d71291ce16ef4161df8cf852298e",
"assets/assets/cards/5_of_hearts.png": "8f6a2068fd6f32c372ea8dab0cde6f40",
"assets/assets/cards/3_of_spades.png": "ad02dc95b434842c3465a7a4dbaca615",
"assets/assets/cards/jack_of_hearts.png": "9be659a7f009932fe8f49a213c22e439",
"assets/assets/cards/9_of_spades.png": "e5b29fdec7e761281073496181d31ab9",
"assets/assets/cards/4_of_clubs.png": "02deab4916f717f0b9478fad476ec40f",
"assets/assets/cards/queen_of_diamonds.png": "f91b8d276604290828523a097fd4af26",
"assets/assets/cards/10_of_hearts.png": "2e6327a66fbf8d05d379d87d56251a1e",
"assets/assets/cards/black_joker.png": "21cc92db51d5fb7888b97517c51c2d2a",
"assets/assets/cards/king_of_hearts.png": "e8d050e1412d4866d34f9a41b0c48238",
"assets/assets/cards/2_of_clubs.png": "c83a7af4125e22d9733f6514295f3d4c",
"assets/assets/cards/10_of_spades.png": "2401fe3648865f6bc3c01a538c512d7c",
"assets/assets/cards/10_of_clubs.png": "c29b28f3eceb7284d141163e3bd37736",
"assets/assets/cards/9_of_hearts.png": "cdb8fda5b30f3973b1ec7f200c24a18f",
"assets/assets/cards/jack_of_clubs.png": "d96ecf4f3c246b8c781f82d1bb2bd1dc",
"assets/assets/cards/7_of_hearts.png": "a9afa10fcea89a4227bb4b81f49a35e8",
"assets/assets/cards/ace_of_diamonds.png": "60b16fdaed475d30edab3bc92f4bd3c9",
"assets/assets/cards/6_of_clubs.png": "9c2fdf6a8916a2b3daea26a7974eed28",
"assets/assets/cards/queen_of_clubs.png": "fd943099b2abeb6cf01bebb4dc66cbbe",
"assets/assets/cards/7_of_diamonds.png": "df3e8e93d277f2b73d2c5ddf348c065c",
"assets/assets/cards/5_of_spades.png": "aa8a072015826f2e582a59e9606e0cd3",
"assets/assets/cards/red_joker.png": "032874afea49aa79307937f4270c5811",
"assets/assets/cards/9_of_diamonds.png": "86608eb9bf92b21b9e33a1ffa4c46ccc",
"assets/assets/cards/2_of_hearts.png": "f97ad85b1e89af6a88c70205cdea06f6",
"assets/assets/cards/8_of_clubs.png": "6ed0b85e676230d360186c3469b08cdf",
"assets/assets/cards/queen_of_spades.png": "445df3cf193554d44a50f43d4597c324",
"assets/assets/cards/ace_of_hearts.png": "41453bfa387b05e68828f2b0159c19d9",
"assets/assets/cards/5_of_diamonds.png": "e27b4b0aadc6a28953f53cfd573e9e2d",
"assets/assets/cards/6_of_hearts.png": "9cd2258c8c8c175ead46f94800741891",
"assets/assets/cards/3_of_clubs.png": "23a7a6ac76db02bbde27988e49ac5fca",
"assets/assets/cards/7_of_spades.png": "c0f5e5f9013f1d24eccd395ab9312766",
"assets/assets/cards/3_of_hearts.png": "1c16fe1052c3a4d1715ee1288209ebe9",
"assets/assets/cards/9_of_clubs.png": "784ea7703fcff1e10745e014d98a24aa",
"assets/assets/cards/ace_of_spades.png": "3c00788af85d7ac4fcfeb155464ba71c",
"assets/assets/cards/4_of_spades.png": "df185c634b2fee0418bd613524938832",
"assets/assets/cards/7_of_clubs.png": "112be1dfa65edf2cabf9122b2c49eb22",
"assets/assets/cards/8_of_hearts.png": "e6c01b136dca0b2c3c03a115d4ab21e1",
"assets/assets/cards/jack_of_diamonds.png": "c936f66eb6ca786d62a2c49876367017",
"assets/assets/animations/finish1.gif": "b8ea2364dab22dac011eddaf83d664c0",
"assets/assets/animations/drink6.gif": "53a132364582f7811e558da0cdc42ac0",
"assets/assets/animations/drink3.gif": "1002b79cbab643265194bdd5ef8b2f40",
"assets/assets/animations/finish2.gif": "c641f6f412690c44add717a890c172f1",
"assets/assets/animations/drink8.gif": "2e2176ce2580ab23067fca00b3d10bd3",
"assets/assets/animations/drink7.gif": "c5d6a7e1de2629d4e71e31577afea535",
"assets/assets/animations/drink10.gif": "2d390b6558cba32c1f48205f21a54dba",
"assets/assets/animations/drink1.gif": "fcb67f77ed6cc6a471bd8ae29704fa15",
"assets/assets/animations/drink4.gif": "fd3a2e0ea6571a40195db19ec81b6617",
"assets/assets/animations/drink9.gif": "e4ecac8897448289809d5dc3cb9dc1b9",
"assets/assets/animations/drink2.gif": "5ca129a184ef80031a36920bfe316bcd",
"assets/assets/animations/drink11.gif": "5fe99bb6b9433036e266bc542ffd777e",
"assets/assets/animations/drink5.gif": "37be5f99950f7ea1bd04c7605bda5e5a",
"assets/fonts/MaterialIcons-Regular.otf": "2c22b386fd3365a289251c0eeee4efaf",
"assets/NOTICES": "7d4a23e8191c5b4668b3967f699fdfd6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin": "bd75eb273419b49e997a89c46bec0321",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"favicon.png": "e692098ad2497a1681de0bf17ae4a365",
"flutter_bootstrap.js": "1d8cd8289257f6f007250ae69c6356df",
"version.json": "43109c36fd0f8bd1625035d48d2c51af",
"main.dart.js": "785bc448cd92abb0644d54d9f656738d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
