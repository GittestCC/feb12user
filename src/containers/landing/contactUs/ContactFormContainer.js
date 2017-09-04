import { connect } from 'react-redux'
import ContactForm from '../../../components/landing/contactUs/ContactForm'
import { contactUs } from '../../../actions/landing'

export default connect(undefined, {
  onSubmit: contactUs
})(ContactForm)
