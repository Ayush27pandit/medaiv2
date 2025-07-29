import * as Notifications from 'expo-notifications';

export async function scheduleMedicineNotification({ id, name, time }: { id: string, name: string, time: Date }) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Medicine Reminder',
      body: `Time to take: ${name}`,
      data: { medicineId: id },
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    },
  });
} 