export const emptyDetails = {
  name: '',
  phone: '',
  address: '',
  notes: '',
  vegetarianOnly: false,
}

export function validateCheckout(details) {
  const errors = {}
  const name = details.name.trim()
  const phone = details.phone.replace(/[()\s-]/g, '')
  const address = details.address.trim()

  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) {
    errors.name = 'Enter a name between 2 and 80 characters.'
  }

  if (!/^(?:0|\+92|0092)3\d{9}$/.test(phone)) {
    errors.phone = 'Enter a Pakistani mobile number, such as 0300 1234567 or +92 300 1234567.'
  }

  if (address.length < 10 || address.length > 220 || !/\p{L}/u.test(address)) {
    errors.address = 'Enter a delivery address between 10 and 220 characters, including your building or hostel.'
  }

  if (details.notes.trim().length > 250) {
    errors.notes = 'Keep delivery notes within 250 characters.'
  }

  return errors
}
