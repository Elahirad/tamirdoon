import {create} from 'zustand';
import apiClient from '../../services/apiClient';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

interface UserStore {
	user: User | null;
	updateLogin: () => void;
}

const useUserStore = create<UserStore>((set) => ({
	user: null,
	updateLogin: async () => {
		apiClient
			.get('users/current-user')
			.then((res) => {
				if (res.status === 200) set(() => ({user: res.data}));
				else set(() => ({user: null}));
			})
			.catch(() => set(() => ({user: null})));
	},
}));

export default useUserStore;
