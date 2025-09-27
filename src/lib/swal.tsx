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
  timer = 2000,
  showConfirmButton = false
) {
  return StyledSwal.fire({
    icon: 'error',
    title: msg,
    text: error.message,
    timer,
    showConfirmButton,
  });
}
