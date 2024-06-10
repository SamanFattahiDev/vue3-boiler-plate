import axios from "axios";
import {useAuthStore} from "@/stores/auth";
import router from "@/router";
import {useAppStore} from "@/stores/app";

axios.defaults.baseURL = "https://api.rnorder.ir/api/";
axios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
            const authStore = useAuthStore();
            authStore.logout();
            appStore.showOverlay = false

            router.push("/");
        }
        if (err.response.status === 500 || err.response.status === 400 || err.response.status === 405) {
            const appStore = useAppStore()
            appStore.showOverlay = false
        }
        throw err;
    }
);
export default (context, resources, auth) => ({
    async setTag() {
        const response = await axios.post(resources, null, {
            headers: {
                Authorization: auth.isLogged ? auth.token : null,
            },
        });
        return response;
    },

    async setParams(params) {
        const response = await axios.post(resources, null, {
            headers: {
                Authorization: auth.isLogged ? auth.token : null,
            },
            params,
        });
        return response;
    },
    async setPayload(payload) {
        const response = await axios.post(resources, payload, {
            headers: {
                Authorization: auth.isLogged ? auth.token : null,
            },
        });
        return response;
    },

    async setFormData(formData) {
        const response = await axios.post(resources, formData, {
            headers: {
                Authorization: auth.isLogged ? auth.token : null,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    },
});
