// storage.js - Wrapper for localStorage
const Storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(`krishisetu_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage', e);
            return defaultValue;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(`krishisetu_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing to localStorage', e);
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(`krishisetu_${key}`);
    },
    
    clearAll: () => {
        const keys = Object.keys(localStorage);
        keys.forEach(k => {
            if (k.startsWith('krishisetu_')) {
                localStorage.removeItem(k);
            }
        });
    }
};
