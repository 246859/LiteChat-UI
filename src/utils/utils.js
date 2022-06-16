export function convertImgToBase64(imageFile, callback, errorCallback) {
    try {
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function (e) {
            if (callback) {
                let base64Str = e.target.result;
                callback(base64Str);
            }
        };
    } catch (error) {
        if (errorCallback) {
            errorCallback(error);
        }
    }
};

