import { useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://shamiri.onrender.com/journals';

// Fetch all Journals
const useJournals = (url) => {
  const queryClient = useQueryClient();
  const fetchJournals = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  };

  const query = useQuery({
    queryKey: 'journals',
    queryFn: fetchJournals,
  });

  const invalidateJournals = () => {
    queryClient.invalidateQueries([url]);
  };

  return { ...query, invalidateJournals };
};

export default useJournals;


