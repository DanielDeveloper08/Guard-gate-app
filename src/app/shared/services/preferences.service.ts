import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

interface Preference {
  key: string;
  value: any;
}
@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  setItem = async ({ key, value }: Preference): Promise<void> => {
    try {
      await Preferences.set({ key, value });
      console.log(`Preference ${key} set to ${value}`);
    } catch (error: any) {
      console.error(`Error setting preference ${key}: ${error.message}`);
    }
  };

  getItem = async (key: string): Promise<any | null> => {
    try {
      const { value } = await Preferences.get({ key });
      console.log(`Value of ${key}: ${value}`);
      return value;
    } catch (error: any) {
      console.error(`Error getting preference ${key}: ${error.message}`);
      return null;
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
      console.log(`Preference ${key} removed`);
    } catch (error: any) {
      console.error(`Error removing preference ${key}: ${error.message}`);
    }
  };
}
