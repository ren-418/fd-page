import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports';
import axios from 'axios';
export default defineNuxtRouteMiddleware(async (to) => {
    const token = useCookie('auth_token');

    if (!token.value) {
        if (to.meta.requiresAuth === 'low') {
            return; 
        }
        alert("Please login")
        return navigateTo({ name: 'login' });
    } else {
        try {
            const { user, setUser } = useUserData();
            if (!user) {
                const data = await fetchUserData();
                setUser(data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
});

const fetchUserData = async () => {
    const { data } = await axios.get(`/user`);
    return data;
}