import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { geosearch } from '../api/wiki/geosearch';
import { articleData } from '../api/wiki/articleData';
import { Article, ArticleFromResponse, Coordinates } from '../constants/types'
import { setArticles, fetchArticles } from '../store/actions';

interface ArticleListState {
  articles: Array<Article>
}

// Define type of component's internal props
interface ArticleListOwnProps {
  // message: String
}

// Define type of data used in 'mapStateToProps' function
interface ArticleListReduxProps {
  coordinates: Coordinates,
  articles: Article[]
}

// Define type of functions used in 'mapDispatchToProps' function
interface ArticleListDispatchProps {
  setArticlesAction: (payload: Article[]) => void,
  fetchArticlesAction: () => void
}

type ArticleProps = ArticleListReduxProps & ArticleListDispatchProps & ArticleListOwnProps

const ArticleContainer = styled.div`
  flex: 1;
  max-height: 800px;
  overflow: scroll;
  background: lightgrey;
`

class ArticleList extends Component<ArticleProps, ArticleListState> {

  // imported API calls
  public geosearch = geosearch;
  public articleData = articleData;

  constructor(props: ArticleProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.coordinates) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        const params = {
          gscoord: this.props.coordinates.lat + '|' + this.props.coordinates.lng
        }
        geosearch(params).then(response => {
          if (response && response.data && response.data.query && response.data.query.geosearch) {
            this.getAndSetArticles(response.data.query.geosearch);
          }
        })
      }
    }
  }

  getAndSetArticles = (articles: ArticleFromResponse[]) => {
    if (!articles) return;

    const pageIds = articles.map(article => article.pageid);
    const pageIdsString = pageIds.join('|'); // format provided as param to api
    const params = {
      pageids: pageIdsString,
      prop: 'info|pageimages',
      inprop: 'url',
      piprop: 'original'
    }

    const data: Article[] = [];
    this.props.fetchArticlesAction();

    this.articleData(params).then(response => {
      if (response && response.data && response.data.query) {
        if (response.data.query.pages) {
          // Keyed by article id
          const articleData = response.data.query.pages;
          articles.forEach(article => {
            data.push({
              id: article.pageid,
              title: article.title,
              img: 'original' in articleData[String(article.pageid)] && 'source' in articleData[String(article.pageid)].original ? articleData[String(article.pageid)].original.source : '',
              link: 'fullurl' in articleData[String(article.pageid)] ? articleData[String(article.pageid)].fullurl : '',
              lat: article.lng,
              lng: article.lat,
              distance: article.dist
            })
          });
        }
      }
    }).then(onfulfilled => {
      this.props.setArticlesAction(data);
    });

  }

  renderArticles = () => {
    const renderFragment: JSX.Element[] = [];
    this.props.articles.forEach(article => {
      renderFragment.push(
        <div>
          <h1>article</h1>
        </div>
      )
    });
  }

  render() {
    return(
      <ArticleContainer>
        Articles
      </ArticleContainer>
    )
  }
}

const mapStateToProps = (state: any, ownProps?: ArticleListOwnProps) => {
  return {
    coordinates: state.coordinates,
    articles: state.articles
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: ArticleListOwnProps): ArticleListDispatchProps => {
  return {
    setArticlesAction: (payload: Article[]) => dispatch(setArticles(payload)),
    fetchArticlesAction: () => dispatch(fetchArticles())
  }
};

export default connect<ArticleListReduxProps, ArticleListDispatchProps, ArticleListOwnProps>(mapStateToProps, mapDispatchToProps)(ArticleList);