import * as SecureStore from 'expo-secure-store';

export async function saveUser(email: string, password: string) {
  const user = { email, password };
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}

export async function getUser() {
  const userString = await SecureStore.getItemAsync('user');
  return userString ? JSON.parse(userString) : null;
}

export async function removeUser() {
  await SecureStore.deleteItemAsync('user');
}