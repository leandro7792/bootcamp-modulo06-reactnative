import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    page: 1,
    endPages: false,
    loadingMore: false,
    refreshing: false,
  };

  componentDidMount() {
    this.loadMore();
  }

  loadMore = async (refresh = false) => {
    const { navigation } = this.props;
    const { page, stars, endPages } = this.state;

    if (endPages && !refresh) return;

    this.setState({ loadingMore: true });

    const user = navigation.getParam('user');

    try {
      const response = await api.get(`/users/${user.login}/starred`, {
        params: {
          page,
        },
      });

      if (response.data.length) {
        this.setState({
          stars: [...stars, ...response.data],
          page: page + 1,
          loadingMore: false,
        });
      } else {
        this.setState({
          endPages: true,
          loadingMore: false,
        });
      }
    } catch (error) {
      console.tron.log(error);
    }
  };

  refreshList = async () => {
    await this.setState({ page: 1, stars: [] });
    this.loadMore(true);
  };

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { repo });
  };

  render() {
    const { navigation } = this.props;
    const { stars, refreshing, loadingMore, endPages } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {stars.length ? (
          <>
            <Stars
              onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
              onEndReached={!endPages && this.loadMore} // Função que carrega mais itens
              onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
              refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
              data={stars}
              keyExtractor={star => String(star.id)}
              renderItem={({ item }) => (
                <Starred onPress={() => this.handleNavigate(item)}>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
            {loadingMore && (
              <Starred>
                <Loading />
              </Starred>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
