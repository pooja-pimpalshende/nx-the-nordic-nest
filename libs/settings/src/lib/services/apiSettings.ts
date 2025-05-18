import { Settings, supabase } from '@/shared';

export async function getSettings(): Promise<Settings> {
  const { data: settings, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error) {
    console.log(error);
    throw new Error('Settings could not be loaded ');
  }

  return settings;
}

export async function updateSettings(newSetting: Settings) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('Settings could not be updated');
  }

  return data;
}
