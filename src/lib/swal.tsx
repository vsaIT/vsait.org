import StyledSwal from '@/components/StyledSwal';

export function swalSuccess(
  msg: string,
  timer = 2000,
  showConfirmButton = false
) {
  StyledSwal.fire({
    icon: 'success',
    title: msg,
    showConfirmButton,
    timer,
  });
}

export function swalError(
  msg: string,
  error: Error,
  timer = 2000,
  showConfirmButton = false
) {
  StyledSwal.fire({
    icon: 'error',
    title: msg,
    text: error.message,
    timer,
    showConfirmButton,
  });
}
