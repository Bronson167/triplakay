import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from './firebase';

const messaging = getMessaging(firebaseApp);

export const registerFCM = async (currentUserId) => {
  try {
    // Demande d'autorisation
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log("Utilisateur n'a pas accepté les notifications.");
      return;
    }

    // Récupération du token FCM
    const token = await getToken(messaging, { 
      vapidKey: 'BGREIc2Jdm_ilK29f7NnaWM_PBy93SsDefGITg6y0uIay1bhEBvqD_F26U_wGBilM8YaVTMEdrabDOeoa4aJ4FI',
        serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    });
    console.log('FCM Token:', token);

    // Enregistrement du token côté serveur
    await fetch(`/api/users/${currentUserId}/updateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fcmToken: token })
    });

  } catch (err) {
    console.error('Erreur lors de l’enregistrement FCM:', err);
  }
};

// Recevoir les notifications quand l’app est ouverte
onMessage(messaging, (payload) => {
  console.log('Notification reçue:', payload);
});
