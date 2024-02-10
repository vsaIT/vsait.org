import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const StyledSwal = withReactContent(
  Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton:
        'text-white py-2 px-10 w-full bg-primary rounded-xl my-1 hover:brightness-85 shadow-md transition-all duration-300',
      cancelButton:
        'text-white py-2 px-10 w-full bg-slate-500 rounded-xl my-1 hover:brightness-85 shadow-md transition-all duration-300',
      closeButton:
        'text-white py-2 px-10 w-full bg-slate-500 rounded-xl my-1 hover:brightness-85 !shadow-none transition-all duration-300 ',
    },
  })
);
export default StyledSwal;
