export const contactUs = options => () => {
  //TODO do an actual ajax request
  return Promise.resolve('finally success')
}

export const signUp = (data, callback) => () => {
  // TODO more AJAX!
  return Promise.resolve(' sign up success ').then(() => {
    return callback(data.emailAddress)
  })
}
