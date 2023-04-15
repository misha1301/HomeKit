import MsgPopup from './MsgPopup';

const ShowPopup = () => {
    
}

export function showErrMsg(errMsg) {
    const toast = new MsgPopup({
        text: errMsg,
        position: "top-right",
        type: "fail",
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        showProgress: [true, 'fail']
    });
}

export function showWarningMsg(errMsg){
    const toast = new MsgPopup({
        text: errMsg,
        position: "top-right",
        type: "warning",
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        showProgress: [true, 'warning']
    });
}

export function showSucsessMsg(errMsg){
    const toast = new MsgPopup({
        text: errMsg,
        position: "top-right",
        type: "sucsess",
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        showProgress: [true, 'sucsess']
    });
}

export default ShowPopup;