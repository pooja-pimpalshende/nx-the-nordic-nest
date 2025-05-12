import { Cabin, supabase, supabaseUrl } from '@/shared';
import { Cabin as MyCabin } from '../cabinTypes';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded ');
  }

  return data;
}

export async function createCabin(newCabin: MyCabin) {
  console.log(newCabin);
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  //1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message || 'Cabins could not be created ');
  }

  //2. upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image[0]);

  //3. delete cabin if there was error in uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);

    if (storageError)
      throw new Error(
        storageError.message ||
          'Cabins image could not be uploaded and the cabin was not created '
      );
  }
  return data;
}

export async function deleteCabin(id: Cabin['id']) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error(error.message || 'Cabin could not be deleted ');
  }

  return data;
}
