import { handleSubmit, handleSave } from '../client/js/app';
import 'babel-polyfill';

describe('Given handleSubmit(), expect it to be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});