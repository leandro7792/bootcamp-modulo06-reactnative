import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

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
          // eslint-disable-next-line react/jsx-boolean-value
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" style={{ flex: 1 }} />
          )}
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
