export const isValueValid = (value: string): boolean => {
    const regex = /^[1-9]\d*$/;

    return regex.test(value);
};

export const isDescriptionValid = (description: string): boolean => {
    const regex = /^[A-Za-z\s]+$/;

    return regex.test(description);
};

export const isNameValid = (name: string): boolean => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
};

export const isEmailValid = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
    const regex = /^[a-zA-Z0-9]{8,}$/;
    return regex.test(password);
};
