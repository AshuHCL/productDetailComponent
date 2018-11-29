import { DeviceProductDetails } from '../src/apis/responses/DeviceProductDetails';

export default class ProductDetailApi {
    static getProductDetails(param: string) {
        /* to be implemented with actual API URL*/

        // return fetch('API URL with required parameters', {
        //     method: 'get',
        //     mode: 'no-cors',
        // }).then((response) => {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         return response.json().then(Promise.reject.bind(Promise));
        //     }
        // }).catch((reason) => Promise.reject(reason));

        return DeviceProductDetails;
    }
}