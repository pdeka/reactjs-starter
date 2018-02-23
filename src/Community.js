import React from 'react';
import Prismic from 'prismic-javascript';
import MainNavigation from './partials/MainNavigation';
import classNames from 'classnames';
import FooterLinkedToContactUs from "./partials/FooterLinkedToContactUs";
import PageFooter from "./partials/PageFooter";
import ArticleTabCards from "./partials/ArticleTabCards";
import ArticlePreview from "./partials/ArticlePreview";
import FormatDate from "./partials/FormatDate";
import {RichText} from 'prismic-reactjs';

import './styles/css/About.css';

export default class Community extends React.Component {

  state = {
    communitypage: null,
    notFound: false,
    articles: null
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  fetchPage(props) {
    if (props.prismicCtx) {

      props.prismicCtx.api.query(Prismic.Predicates.at('document.type', 'communitypage')).then((communitypage) => {
        if (communitypage) {
          this.setState({communitypage});
        } else {
          this.setState({
            notFound: !communitypage
          });
        }
      });

      props.prismicCtx.api.query([
        Prismic.Predicates.at('document.tags', ['Our Community']),
        Prismic.Predicates.at('document.type', 'article')
      ], {orderings: '[my.article.date desc]'}
      ).then((articles) => {
        if (articles) {
          this.setState({articles});
        }
      });

      return null;

    }
    return null;
  }

  render() {
    if (this.state.communitypage && this.state.articles) {

      let communitypage = this.state.communitypage.results[0].data;
      let articleResults = this.state.articles.results;

      return <div className={classNames('sections-page')}>
        <MainNavigation navBarTransparent={true}/>
        <div className={classNames('page-header', 'header-small', 'header-filter')} data-parallax="true" style={{backgroundImage: 'url(https://prismic-io.s3.amazonaws.com/rumamundi%2F52219df8-9af5-4681-a719-be9132fbf5c1_photo-collage-vector-background.jpg)'}}>
        <div className={classNames('container', 'hero-text-margin')}>
              <div className={classNames('row', 'justify-content-center', 'mt-5')}>
                <h2 className={classNames('title')}>{communitypage.header[0].text}</h2>
              </div>
        </div>

        </div>
        <div className={classNames('main', 'main-raised')}>
          <div className={classNames('features-1', 'pt-5', 'pb-3')}>
            <div className={classNames('container')}>
              <div className={classNames('row')}>
                  <div className={classNames('col-md-8', 'ml-auto', 'mr-auto')}>
                      <h3 className={classNames('title')}>{communitypage.second_level_header[0].text}</h3>
                      <div className={classNames('description')}  >
                          {RichText.render(communitypage.community_summary)}
                      </div>
                      <div className={classNames('icon')}>
                        <i className={classNames('material-icons')}>format_quote</i>
                      </div>
                      <blockquote className={classNames('blockquote', 'text-center')}>
                        <div className={classNames('mb-0')}>
                          {communitypage.quotation[0].text}
                        </div>
                        <footer className={classNames('blockquote-footer')}>{communitypage.quotation_author[0].text}</footer>
                      </blockquote>
                  </div>
              </div>
            </div>
          </div>
          <div className={classNames('cd-section', 'section-dark')}>
            <div className={classNames('container')} >
                <div className={classNames('row')}>
                  <div className={classNames('col-md-8', 'ml-auto', 'mr-auto')}>
                    <div className={classNames('card', 'card-plain', 'card-profile', 'mt-5', 'mb-0')}>
                          <ArticlePreview data={articleResults[0].data}/>
                          <div className={classNames('card-body')}>
                                <h3 className={classNames('card-title')}>
                                  {articleResults[0].data.article_title[0].text}
                                </h3>
                                <p className={classNames('card-description')}>
                                  {articleResults[0].data.article_summary[0].text}
                                </p>
                                <p className={classNames('author', 'text-white')}>
                                  by &nbsp;<b>Ruma</b>,&nbsp;
                                  <FormatDate data={articleResults[0].data.date}/>
                                </p>
                          </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className={classNames('cd-section')}>
            <div className={classNames('features-1', 'articlepage-tabs')}>
              <div className={classNames('container')}>
                <div className={classNames('row')}>
                  <div className={classNames('container')}>
                      <div className={classNames('row')}>
                          <ArticleTabCards key= "0" articleResults={articleResults} tab={"My Community"} />
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterLinkedToContactUs data={communitypage.footer_remark[0].text}/>
        </div>
        <PageFooter />
      </div>;

    } else {
      return <div className={classNames('sections-page', 'section-white')}>
        <div id="spinner-middle">
          <div>
            <i className={classNames('fa', 'fa-refresh', 'fa-spin', 'fa-5x', 'fa-fw')}></i>
          </div>
        </div>
      </div>;

    }
  }
}
