import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = 'https://shamiri.onrender.com/';

const usePostJournal = () => {
  const queryClient = useQueryClient();

  const postJournal = async (journalData) => {
    const access_token = await AsyncStorage.getItem('access_token');

    const response = await fetch(BASE_URL + 'add_journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(journalData),
    });

    if (!response.ok) {
      throw new Error('Failed to save the journal');
    }

    return response.json();
  };

  const mutation = useMutation(postJournal, {
    onSuccess: () => {
      queryClient.invalidateQueries('journals');
    },
  });

  return mutation;
};

export default usePostJournal;
