function fieldWrapper<T>(data: T, key = '', required = false) {
  return {
    isLoading: false,
    isEditing: false,
    hasError: false,
    key,
    data,
    required
  }
}

export default fieldWrapper
