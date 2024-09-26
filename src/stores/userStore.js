import { defineStore } from "pinia";
import { ref, computed } from 'vue'


export const useUserStore = defineStore('userStore', () => {

    const _user = ref({
        id: -1,
        name: '',
        mail: '',
        password: '',
        role: 0,
        address: '',
        phone: 0,
        favorites: [
            {
                idProduct: -1,
                id: -1,
                UserId: -1
            }
        ]
    })
    const user = computed(() => _user.value)

    function setUser(userInfo) {
        _user.value = userInfo
    }
    const isAuthenticated = computed(() => {
        return _user.value.mail !== '';
    });

    const isAdmin = computed(() => {
        return _user.value.role === 2;
    });
    function $reset() {
        setUser({
            id: -1,
            name: '',
            mail: '',
            password: '',
            role: 0,
            address: '',
            phone: 0
        })
    }

    return { user, setUser, isAuthenticated, isAdmin, $reset }
})