import {globalConfig} from "@/config/config";

//base64转码
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
}

export function isValidateFileType(fileName) {
    let typeList = ['.js', '.cs', 'jar', '.exe', '.bat', '.sh'];
}

export function getFirstMsgFromPayload(payload) {
    let firstMsg = '';
    switch (payload.messageType) {
        case globalConfig.message.type.raw_text: {
            firstMsg = payload.senderNickname + ":" + payload.message;
        }
            break;
        case globalConfig.message.type.img_text: {
            firstMsg = payload.senderNickname + ":" + "图片";
        }
            break;
        case globalConfig.message.type.file_text: {
            firstMsg = payload.senderNickname + ":" + "文件";
        }
            break
        default: {
            firstMsg = payload.senderNickname + ":" + "消息";
        }
    }

    return firstMsg;
}

export function downFileFromBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.style.display = 'none';

    a.href = url;

    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}
