// Connects Lucy's app to Firebase. Lucy and grown-ups sign in with Google (Lucy can also play without Google, on one device only).
// If config.js isn't filled in yet, the app runs on this device only.
import { FIREBASE_CONFIG, PARENT_EMAILS } from "./config.js";

const V = "10.12.2";
const configured = FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith("PASTE");

async function start(){
  if(!configured){ window.bootApp(null); return; }
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
  ]);
  const app = initializeApp(FIREBASE_CONFIG, "lucy11");
  const auth = A.getAuth(app);
  let db;
  try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache() }); } // works offline, syncs later
  catch(e){ db = F.getFirestore(app); }
  const parents = PARENT_EMAILS.map(e => e.trim().toLowerCase());
  A.getRedirectResult(auth).catch(() => {});
  const PL = "lucy_players", CT = "lucy_content";

  window.bootApp({
    onUser: cb => A.onAuthStateChanged(auth, cb),
    signInChild: () => A.signInAnonymously(auth),
    signInGoogle: async () => {
      const provider = new A.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      try { await A.signInWithPopup(auth, provider); }
      catch(e){
        if(["auth/popup-blocked","auth/operation-not-supported-in-this-environment","auth/cancelled-popup-request"].includes(e.code)) await A.signInWithRedirect(auth, provider);
        else if(e.code !== "auth/popup-closed-by-user") throw e;
      }
    },
    signOut: () => A.signOut(auth),
    isParent: email => !!email && parents.includes(email.toLowerCase()),
    loadPlayer: async uid => { const s = await F.getDoc(F.doc(db, PL, uid)); return s.exists() ? s.data() : null; },
    savePlayer: (uid, data) => F.setDoc(F.doc(db, PL, uid), JSON.parse(JSON.stringify(data))),
    listPlayers: async () => (await F.getDocs(F.collection(db, PL))).docs.map(d => d.data()).sort((a,b) => (b.updated||0)-(a.updated||0)),
    loadContent: async () => (await F.getDocs(F.collection(db, CT))).docs.map(d => d.data()),
    addContent: (id, set) => F.setDoc(F.doc(db, CT, id), JSON.parse(JSON.stringify(set)))
  });
}
start().catch(e => {
  console.error(e);
  document.getElementById("app").innerHTML = `<p class="fb bad">The app couldn't connect to Firebase (${e.code||e.message}). Check config.js, then reload.</p>`;
});
