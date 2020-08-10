export const useSnackBar = (context) => {
  const { $store } = context.root

  const showSnackBar = (color, text) => {
    $store.dispatch('snackBar/showSnackBar', {
      color,
      text,
    })
  }

  return { showSnackBar }
}
