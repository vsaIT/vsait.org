import React from 'react';
import { Bounce, toast } from 'react-toastify';

type ToastMessageType = {
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
};
const ToastMessage = ({ type, message }: ToastMessageType) =>
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>,
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    }
  );
ToastMessage.dismiss = toast.dismiss;
export default ToastMessage;
