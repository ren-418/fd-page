import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports';
import axios from 'axios';
import { coolGray } from 'tailwindcss/colors';
export default defineNuxtRouteMiddleware(async (to) => {

    const { $swal } = useNuxtApp();
    const token = useCookie('auth_token');

    if (!token.value) {
        if (to.meta.requiresAuth === 'low') {
            return; 
        }
        $swal.fire({
            text: 'Please login',
            icon: 'success'
          })
        return navigateTo({ name: 'login' });
    } else {
        try {
            console.log("token ::: ", token.value)
            const { user, setUser } = useUserData();
            console.log("user ::: ", user.value)
            if (!user.value) {
                console.log("user not found");
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
    console.log("user fetch data ::: ", data)
    return data;
}