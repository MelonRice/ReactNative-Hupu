import React from 'react';
import {
  Container,
  Content,
  Header,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Button,
  Icon,
  Spinner
} from 'native-base';
import { inject, observer } from 'mobx-react/native';
import { StackNavigator } from "react-navigation";
import { ActivityIndicator, BackHandler } from 'react-native';

/**
 * 论坛详情页面（子论坛列表），注入了store对象，最外层是stack导航类，其中只包括了一个子论坛页面
 */
@inject('store') @observer
class ForumDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : '',
      headerLeft: <Button
        transparent
        onPress={() => {
          navigation.dispatch({
            type: 'Navigation/NAVIGATE',
            routeName: 'DrawerToggle',
          });
        }
        }><Icon name='menu' style={{ color: '#fff' }}/></Button>,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      forum: this.props.store.selectedForum
    }
  }

  componentWillMount() {
    this.setState({ forum: this.props.store.selectedForum });
    this.props.navigation.setParams({ title: (this.props.store.selectedForum.name || '') })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.forum) {
      this.setState({ forum: this.props.store.selectedForum });
    }
  }

  _handleEntryPress(subforum) {
    this.props.store.selectedSubForum = subforum;
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'TopicList',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'List',
      },
    });
  }

  render() {

    const { forum } = this.state;

    return (
      <Container>
        <Content>
          {this.state.loading && <ActivityIndicator style={{ margin: 20 }}/>}
          <List noBorder>
            {
              forum && forum.sub && forum.sub.map((e, i) => {
                return (

                  <ListItem key={i} noBorder>
                    <Body>
                    <Text style={{ marginLeft: 15, marginBottom: 10 }}>{e.name}</Text>

                    <List noBorder>
                      {
                        e.data && e.data.map((f, j) => {
                          return (
                            <ListItem noBorder avatar key={j} onPress={this._handleEntryPress.bind(this, f)}
                                      style={{ borderWidth: 0, marginBottom: 5 }}>
                              <Left>
                                <Thumbnail source={{ uri: f.logo }}/>
                              </Left>
                              <Text style={{ marginLeft: 5 }}>{f.name}</Text>
                            </ListItem>
                          );
                        })
                      }
                    </List>
                    </Body>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
      </Container>
    )
  }
}

const ForumDetailStack = StackNavigator({
    List: { screen: ForumDetailScreen },
  },
  {
    initialRouteName: 'List',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#32CD32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    },
  }
);

module.exports = ForumDetailStack;