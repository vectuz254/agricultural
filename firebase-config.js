// ============================================
// AGROSENSE — Firebase Configuration
// ============================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (e.g. "agrosense-farm")
// 3. Project settings > General > Your apps > Add app (Web </>)
// 4. Copy the config object Firebase gives you and paste it below
// 5. In the console: Build > Authentication > Sign-in method > enable "Email/Password"
// 6. In the console: Build > Firestore Database > Create database (start in test mode for now)

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

