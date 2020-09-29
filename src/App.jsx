import React, { Component } from 'react';
import withRoot from './modules/withRoot';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <ProductValues />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <ProductSmokingHero />
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRoot(App);
