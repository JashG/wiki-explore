import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { geosearch } from '../api/wiki/geosearch';
import { articleData } from '../api/wiki/articleData';
import { Article, ArticleFromResponse, Coordinates } from '../constants/types'
import { setArticles, fetchArticles } from '../store/actions';
import { Article as ArticleComponent } from '../components/Article';

// Max page IDs that can be passed as param to articleData endpoint
const MAX_PAGE_IDS = 50

interface ArticleListState {
  // none
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
  height: 600px;
  overflow: scroll;
`

class ArticleList extends Component<ArticleProps, ArticleListState> {

  // imported API calls
  public geosearch = geosearch;
  public articleData = articleData;

  constructor(props: ArticleProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.coordinates && this.props.coordinates.lat && this.props.coordinates.lng) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        this.handleGeosearch();
      }
    }
  }

  componentDidUpdate(prevProps: ArticleProps) {
    if (prevProps.coordinates.lat !== this.props.coordinates.lat || prevProps.coordinates.lng !== this.props.coordinates.lng) {
      this.handleGeosearch();
    }
  }

  handleGeosearch = () => {
    const params = {
      gscoord: this.props.coordinates.lat + '|' + this.props.coordinates.lng
    }

    geosearch(params).then(response => {
      if (response && response.data && response.data.query && response.data.query.geosearch) {
        this.handleArticleData(response.data.query.geosearch);
      }
    });
  }

  handleArticleData = (articles: ArticleFromResponse[]) => {
    let data: Article[] = [];
    if (!articles || !articles.length) {
      this.props.setArticlesAction(data);
      return;
    }

    this.props.fetchArticlesAction();
    if (articles.length > MAX_PAGE_IDS) {
      console.log('over')
      this.handleArticleDataParallel(articles);
    } else {
      this.getArticleData(articles);
    }
  }

  handleArticleDataParallel = async (articles: ArticleFromResponse[]) => {
    const numCalls = Math.ceil(articles.length / MAX_PAGE_IDS);

    const articleChunks = [];
    for (let i = 0; i < numCalls; i++) {
      const chunk = articles.slice(i * MAX_PAGE_IDS, i * MAX_PAGE_IDS + MAX_PAGE_IDS);
      articleChunks.push(chunk);
    }

    // Get article data in parallel
    const apiCalls = articleChunks.map(async (chunk) => await this.getArticleData(chunk));
    const results = await Promise.all(apiCalls);

    const articleData: Article[] = []
    results.forEach((result: any) => {
      articleData.push(result);
    });

    this.props.setArticlesAction(articleData);
  }

  getArticleData = (articles: ArticleFromResponse[]) => {
    const data: Article[] = [];

    // Note: api call takes at most 50 page IDs
    const pageIds = articles.map(article => article.pageid);
    const pageIdsString = pageIds.join('|'); // format provided as param to api
    const params = {
      pageids: pageIdsString,
      prop: 'info|pageimages',
      inprop: 'url',
      piprop: 'original'
    }

    this.articleData(params).then(response => {
      if (response && response.data && response.data.query) {
        if (response.data.query.pages) {
          const articleData = response.data.query.pages;

          articles.forEach(article => {
            const articleGeodata = articles.find(a => a.pageid == article.pageid);
            const lat = articleGeodata !== undefined ? articleGeodata.lat : 0;
            const lng = articleGeodata !== undefined ? articleGeodata.lon : 0;
            data.push({
              id: article.pageid,
              title: article.title,
              img: 'original' in articleData[String(article.pageid)] && 'source' in articleData[String(article.pageid)].original ? articleData[String(article.pageid)].original.source : '',
              link: 'fullurl' in articleData[String(article.pageid)] ? articleData[String(article.pageid)].fullurl : '',
              lat: lat,
              lng: lng,
              distance: article.dist
            })
          });
        }
      }
    }).then(onfulfilled => {
      this.props.setArticlesAction(data);
    }).catch(error => {
      this.props.setArticlesAction([]);
    });
  }

  renderArticles = () => {
    const renderFragment: JSX.Element[] = [];
    if (this.props.articles) {
      this.props.articles.forEach(article => {
        if (article) {
          renderFragment.push(
            <ArticleComponent key={article.id} article={article}/>
          )
        }
      });
    }

    return renderFragment;
  }

  render() {
    return(
      <ArticleContainer>
        {this.renderArticles()}
        <p>{this.props.coordinates ? this.props.coordinates.lat : ''}</p>
      </ArticleContainer>
    )
  }
}

const mapStateToProps = (state: any, ownProps?: ArticleListOwnProps) => {
  return {
    coordinates: state.coordinates.coordinates,
    articles: state.articles.articles
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: ArticleListOwnProps): ArticleListDispatchProps => {
  return {
    setArticlesAction: (payload: Article[]) => dispatch(setArticles(payload)),
    fetchArticlesAction: () => dispatch(fetchArticles())
  }
};

export default connect<ArticleListReduxProps, ArticleListDispatchProps, ArticleListOwnProps>(mapStateToProps, mapDispatchToProps)(ArticleList);