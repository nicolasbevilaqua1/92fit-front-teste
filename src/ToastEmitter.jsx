import { Bounce, toast } from "react-toastify";

export function toastError(text, callback) {
    toast.error(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: callback,
        toastId: 'error',
    });
}

export function toastSuccess(text, callback) {
    toast.success(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: callback
    });
}

export function toastPromise(promise, {pending, error=null, success=null, id='promise'}, callback) {
    toast.promise(
        promise,
        {
            pending,
            error: error || {
                render({data}) {
                    console.log(data.message);
                    const response = data.response?.data.message || data.message
                    return response
                }
            },
            success: success ||{
                render({data}) {
                    console.log(data);
                    callback && setTimeout( () => {
                        callback();
                    }, 3100);
                    return data.data.message
                }
            }
        },
        {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose: callback,
            toastId: id,
    });
}
