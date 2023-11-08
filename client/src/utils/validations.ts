export const isValueValid = (value: string): boolean => {
    const regex = /^[1-9]\d*$/;

    return regex.test(value);
};

export const isDescriptionValid = (description: string): boolean => {
    const regex = /^[A-Za-z\s]+$/;

    return regex.test(description);
};
