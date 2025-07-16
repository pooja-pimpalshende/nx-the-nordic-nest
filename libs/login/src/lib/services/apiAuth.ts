import { supabase, supabaseUrl } from '@/shared';

type UpdateUserParams = { password: string } | { data: { [key: string]: any } };

export async function signUpApi({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  //1.Update the fullname OR password
  let updatData;
  if (password) updatData = { password };
  if (fullName) updatData = { data: { fullName } };
  if (updatData) {
    const { data, error } = await supabase.auth.updateUser(updatData);
    if (error) throw new Error(error.message);
    if (!avatar) return data;

    //2.Upload avatar image
    const fileName = `avatar-${data?.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    //3.Update the avatar in the user
    const { data: updateUserData, error: updateUserError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
        },
      });
    if (updateUserError) throw new Error(updateUserError.message);

    return updateUserData;
  }
}
