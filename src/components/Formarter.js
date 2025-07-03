export const formatPhoneNumber = (value) => {
    if (!value) return '';
    value = String(value).replace(/\D/g, '');

    if (value.length > 10) {
        return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
        return value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
        return value.replace(/^(\d{2})(.*)/, '($1) $2');
    } else if (value.length > 0) {
        return value.replace(/^(\d*)/, '($1');
    }
    return value;
};


export const validarEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    return regex.test(value);
};

export const formatCepNumber = (value) => {
    if (!value) return '';
    value = String(value).replace(/\D/g, '');

    if (value.length > 5) {
        return value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
    }
    return value;
};

export const formatTime = (timeString) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
    }
    return timeString;
};