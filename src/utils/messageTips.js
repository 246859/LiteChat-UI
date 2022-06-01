import {ElMessage} from 'element-plus';

const infoTips = msg => {
    ElMessage({
        showClose: true,
        message: msg,
    })
};

const successTips = msg => {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    })
};

const warningTips = msg => {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
    })
};

const errorTips = msg => {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
    })
};

export {
    infoTips,
    successTips,
    warningTips,
    errorTips
}