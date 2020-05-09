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

// Define type of props from parent
interface ArticleListOwnProps {
  // message: String
}

// Define type of props we will pull from Redux store
interface ArticleListReduxProps {
  coordinates: Coordinates,
  articles: Article[],
  fetchingArticles: boolean,
}

// Define type of functions used in 'mapDispatchToProps' function
interface ArticleListDispatchProps {
  setArticlesAction: (payload: Article[]) => void,
  fetchArticlesAction: () => void
}

type Props = ArticleListReduxProps & ArticleListDispatchProps & ArticleListOwnProps

interface State {
  // none
}

const ArticleContainer = styled.div`
  height: 600px;
  overflow: scroll;
`

class ArticleList extends Component<Props, State> {

  // imported API calls
  public geosearch = geosearch;
  public articleData = articleData;

  componentDidMount() {
    if (this.props.coordinates && this.props.coordinates.lat && this.props.coordinates.lng) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        this.handleGeosearch();
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    console.log("PREV: ")
    console.log(prevProps)
    console.log("CURR: ")
    console.log(this.props)
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
    }).catch(error => {
      console.log(error)
    })
  }

  handleArticleData = (articles: ArticleFromResponse[]) => {
    let data: Article[] = [];
    if (!articles || !articles.length) {
      this.props.setArticlesAction(data);
      return;
    }

    this.props.fetchArticlesAction();
  
    // If the number of provided articles (from the geosearch) exceeds
    // MAX_PAGE_IDS, make API calls to get article data in parallel.
    // Otherwise, we can get all of the articles' data with one call
    if (articles.length > MAX_PAGE_IDS) {
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

    // Store article data we retrieved in redux
    const articleData: Article[] = []
    results.forEach((result: any) => {
      articleData.push(result);
    });

    this.props.setArticlesAction(articleData);
  }

  getArticleData = (articles: ArticleFromResponse[]) => {
    // Array of articles we will store in redux
    const data: Article[] = [];

    // Note: api call takes at most MAX_PAGE_IDS page IDs
    const pageIds = articles.map(article => article.pageid);
    const pageIdsString = pageIds.join('|'); // format provided as param to api
    const params = {
      pageids: pageIdsString,
      prop: 'info|pageimages',
      inprop: 'url',
      piprop: 'original'
    }

    this.articleData(params).then(response => {
      console.log(response)
      if (response && response.data && response.data.query) {
        if (response.data.query.pages) {
          // Get article data from response
          const articleData = response.data.query.pages;

          // For each provided article, retrieve the article's data from the API response
          articles.forEach(article => {
            const articleGeodata = articles.find(a => a.pageid === article.pageid);
            const lat = articleGeodata !== undefined ? articleGeodata.lat : 0;
            const lng = articleGeodata !== undefined ? articleGeodata.lon : 0;

            // Push individual article's data
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
      console.log(error)
      this.props.setArticlesAction([]);
    });
  }

  renderArticles = () => {
    // We will store each ArticleComponent here
    const renderFragment: JSX.Element[] = [];

    // For each article, create an article component
    if (this.props.articles.length) {
      this.props.articles.forEach(article => {
        if (article) {
          renderFragment.push(
            <ArticleComponent key={article.id} article={article}/>
          )
        }
      });
    }
    // } else if (this.props.fetchingArticles) {
    //   console.log(this.props.fetchingArticles)
    //   return (
    //     <div className="spinner-border slow" role="status">
    //       <span className="sr-only">Loading...</span>
    //     </div>
    //   )
    // }

    return renderFragment;
  }

  render() {
    return(
      <ArticleContainer>
        <p>{this.props.coordinates ? this.props.coordinates.lat : 'Fuck'}</p>
        {this.renderArticles()}
      </ArticleContainer>
    )
  }
}

// Note: Type of 'state' should be interface for Redux state
const mapStateToProps = (state: any, ownProps?: ArticleListOwnProps): ArticleListReduxProps => {
  return {
    coordinates: state.coordinates.coordinates,
    articles: state.articles.articles,
    fetchingArticles: state.articles.fetchingArticles,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: ArticleListOwnProps): ArticleListDispatchProps => {
  return {
    setArticlesAction: (payload: Article[]) => dispatch(setArticles(payload)),
    fetchArticlesAction: () => dispatch(fetchArticles())
  }
};

export default connect<ArticleListReduxProps, ArticleListDispatchProps, ArticleListOwnProps>(mapStateToProps, mapDispatchToProps)(ArticleList);