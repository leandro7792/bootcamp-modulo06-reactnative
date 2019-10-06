/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

import { Loading } from './style';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  render() {
    const { navigation } = this.props;
    const repository = navigation.getParam('repo');

    return (
      <>
        <WebView
          source={{ uri: repository.html_url }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
        />
      </>
    );
  }
}

Repo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
