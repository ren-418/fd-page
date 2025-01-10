import axios from "axios";
import { useRuntimeConfig } from "#app";


export const useUserData = () => {
    const user = useState<any>('user', () => { });

    const setUser = (data: any) => {
        user.value = data
    }

    return { user, setUser };
}