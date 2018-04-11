//@flow
import React, {Component} from 'react'
import {Container, Alert} from 'reactstrap';


class VerifyNewsletterPage extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        fetch('api/public/verify-newsletter/?token='+ token)
          .then((response)=>response.json())
          .then(json=>this.setState({verified : json}))
          .catch(err=>this.setState({verified : false}))
    }
    render() {
        console.log(this.state);
        return(
          <Container className="container pt-5">
              <h1>Newsletter</h1>
              {(this.state.verified === true) &&
              <Alert className="mt-3" color="success">
                  Thanks for subscribing to our newsletter.
              </Alert>
              }
              {(this.state.verified === false) &&
              <Alert className="mt-3" color="danger">
                  Ops, something bad happened. Please contact: info@techfest.com
              </Alert>
              }
          </Container>
        )
    }
}






export default VerifyNewsletterPage;