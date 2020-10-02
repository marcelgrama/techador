import React from 'react';
import emailjs, { init } from 'emailjs-com';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormValidation from './FormValidator';
import SimpleSnackbar from '../Snackbar';
import _ from 'lodash';

const style = {
  paddingBottom: '10px',
};
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      err: null,
      open: 'false',
      success: null,
      severity: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target || {};
    this.setState({
      [name]: value,
      err: null,
      open: false,
      severity: '',
      success: null,
    });
  }

  handleSubmit(event) {
    const templateId = 'template_6vvgaes';
    const user_id = init('user_q2X93aj61HjJt8dekYg8x');
    const { value, error } = FormValidation.validate(
      _.pick(this.state, ['message', 'email'])
    );

    if (error) {
      return this.setState({ err: error, open: true, severity: 'error' });
    }

    this.sendFeedback(
      templateId,
      {
        message: this.state.message,
        from_name: this.state.email,
        reply_to: this.state.email,
      },
      user_id
    );
  }

  sendFeedback(templateId, variables) {
    const serviceId = 'service_kydkb77';

    emailjs
      .send(serviceId, templateId, variables)
      .then((res) => {
        this.setState({
          message: '',
          email: '',
          open: true,
          success: 'Email successfully sent!',
          severity: 'success',
        });
      })
      .catch((err) =>
        this.setState({
          message: `ERROR, email was not sent: ${err}`,
          email: '',
          open: true,
          success: null,
          severity: 'error',
        })
      );
  }

  render() {
    return (
      <Grid container direction={'column'}>
        <h1>Let's see if it works</h1>
        <Grid container direction={'column'}>
          <TextField
            id="outlined-basic"
            label="Your email"
            name="email"
            variant="outlined"
            value={this.state.email}
            onChange={this.handleChange}
            style={style}
          />
          <TextField
            id="outlined-textarea"
            label="Contact us"
            placeholder="Write us a message"
            multiline
            variant="outlined"
            name="message"
            onChange={this.handleChange}
            rows={4}
            defaultValue="Default Value"
            required
            value={this.state.message}
            style={style}
          />
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
        >
          Send
        </Button>
        {this.state.err || this.state.success ? (
          <SimpleSnackbar
            open={this.state.open}
            message={this.state.err || this.state.success}
            severity={this.state.severity}
          />
        ) : null}
      </Grid>
    );
  }
}
