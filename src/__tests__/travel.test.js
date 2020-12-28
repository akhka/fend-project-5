import {getCountdown} from '../client/js/travel';
import 'babel-polyfill';

describe('Check if getCountdown() method is defined' , () => {
    test('Returns true', async () => {
        expect(getCountdown).toBeDefined();
    });
});
