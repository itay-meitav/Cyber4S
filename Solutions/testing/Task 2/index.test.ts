import {isValidPassword, isValidEmail, validateUserInput} from './index'

const dataInvalidEmail = {email: 'ofer', password: '1amAp0k3m0n%'};
const dataInvalidPassword =  {email: 'idan@gmail.com', password: '123456'};
const dataValid = { email: 'idan@gmail.com', password: '5tcAY0R4m0n%' };
const dataInvalidCredentials = {email: 'dima', password: '12345'};

describe("check isValidPassword, isValidEmail, validateUserInput functions", ()=> {
it("should return false", () => {
    expect(isValidPassword('123')).toBe(false);
});

it("should return false", () => {
    expect(isValidEmail('abc')).toBe(false);
});

it("should return 'User created successfully'", () => {
    expect(validateUserInput(dataValid).message).toBe('User created successfully');
});

it("should return 'Wrong email'", () => {
    expect(validateUserInput(dataInvalidEmail).error).toBe('Wrong email');
});


it("should return 'Wrong password'", () => {
    expect(validateUserInput(dataInvalidPassword).error).toBe('Wrong password');
});


it("should return 'Incorrect data'", () => {
    expect(validateUserInput(dataInvalidCredentials).error).toBe('Incorrect data');
});
});