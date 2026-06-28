import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase using the configuration from the workspace config file
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper reference to the shared expenses collection
export const expensesCollection = collection(db, 'expenses');

// Test connection on boot as requested by systems guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection tested successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration or network status.');
    } else {
      console.warn('Firebase connection warning:', error);
    }
  }
}

testConnection();
