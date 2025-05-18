import { Cabin, supabase, supabaseUrl } from '@/shared';

type NewCabinImageType = {
  image: string | null | FileList;
};

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded ');
  }

  return data;
}

export async function createEditCabin(
  newCabin: Cabin | NewCabinImageType,
  id?: number
) {
  console.log('newcabin', newCabin, id);

  let imagePath: string | null = null;
  let imageFile: File | undefined;

  if (typeof newCabin.image === 'string' || newCabin.image === null) {
    imagePath = newCabin.image;
  } else if (newCabin.image && newCabin.image.length > 0) {
    imageFile = newCabin.image[0];
    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  }

  //1. Create/Edit cabin
  let query;

  if (!id) {
    //A. Create
    query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
  }
  //B. Edit
  else {
    query = supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(error.message || 'Cabins could not be created ');
  }

  //2. upload image
  if (imageFile) {
    const imageName = imagePath!.split('/').pop()!;
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, imageFile);

    //3. delete cabin if there was error in uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);

      if (storageError)
        throw new Error(
          storageError.message ||
            'Cabins image could not be uploaded and the cabin was not created '
        );
    }
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
