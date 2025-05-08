import { supabase } from '@/shared';
import { Cabin } from '../cabinTypes';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded ');
  }

  return data;
}

export async function deleteCabin(id: Cabin['id']) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted ');
  }

  return data;
}
