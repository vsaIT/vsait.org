import StyledSwal from '@/components/StyledSwal';

export async function swalSuccess(
  msg: string,
  timer = 2000,
  showConfirmButton = false
) {
  return StyledSwal.fire({
    icon: 'success',
    title: msg,
    showConfirmButton,
    timer,
  });
}

export async function swalError(
  msg: string,
  error: Error,
  showConfirmButton = true
) {
  return StyledSwal.fire({
    icon: 'error',
    title: msg,
    text: error.message,
    showConfirmButton,
  });
}

export async function swalLoading(
  msg: string,
  preConfirm: () => Promise<unknown>
) {
  return StyledSwal.fire({
    icon: 'info',
    title: msg,
    showLoaderOnConfirm: true,
    showConfirmButton: false,
    didOpen: () => {
      StyledSwal.getConfirmButton()?.click();
    },
    preConfirm,
    allowOutsideClick: () => !StyledSwal.isLoading(),
  });
}

export async function swalAreYouSure(
  msg: string,
  action: () => Promise<unknown>,
  confirmText = 'Lagre',
  cancelText = 'Avbryt'
) {
  return StyledSwal.fire({
    title: '',
    icon: 'warning',
    text: msg,
    showConfirmButton: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    }
  });
}
