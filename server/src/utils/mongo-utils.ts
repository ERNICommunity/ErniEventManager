// Alphabetically
export const allowedFields: any = {
    Event: 'accommodation description endDate id limit location name startDate transportBus transportCar participants',
    User: 'avatar email firstName id lastName role type'
};

export const usernameReg = {
    reg: /^[a-zA-Z0-9\+\.\_\-]{4,15}$/,
    errorMessage: `Username has to have 4-15 characters, can contain: Alphanumeric characters
                     (without accent marks)or following characters(+ _ - .)`
};

export const emailReg = {
    reg: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    errorMessage: 'Email has to be in a correct format.'
};

export const groupNameReg = {
    reg: /^[a-z]{3,10}$/,
    errorMessage: 'Name has to be 3-10 lowercase characters'
};

export const paginateProps = ['size', 'index', 'qi'];
