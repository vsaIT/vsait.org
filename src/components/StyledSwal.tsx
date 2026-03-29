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
        'text-slate-500 text-3xl font-bold bg-transparent border-none p-2 hover:text-primary transition-colors absolute top-2 right-2',
    },
  })
);
export default StyledSwal;
