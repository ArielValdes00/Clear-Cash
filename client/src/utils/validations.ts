export const isIncomeValid = (income: string): boolean => {
    const regex = /^[1-9]\d*$/;

    return regex.test(income);
  };
