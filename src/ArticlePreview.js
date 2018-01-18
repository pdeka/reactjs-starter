import React from 'react';
import classNames from 'classnames';

export default class ArticlePreview extends React.Component {
  state = {
    doc: null
  }

  getFormattedEmbedUrl(embedUrl) {
    let thisArray = embedUrl.split('\?v=');
    let interestedIndex = thisArray.length - 1;
    if (interestedIndex >= 0) {
      return "https://www.youtube.com/embed/" + thisArray[interestedIndex] + "?feature=oembed";
    } else {
      return "";
    }
  }

  displayImageOrVideo(data) {
    if (data.youtube_link === null) {
      return <div className={classNames('card-header', 'card-header-image')}>
        <img className={'img'} src={data.top_level_image.url}/>
      </div>;
    } else {
      return <div className={classNames('card-header', 'card-header-image', 'card-raised')}>
        <div className={'mb-r'}>
          <div className={classNames('embed-responsive', 'embed-responsive-16by9')}>
            <iframe id={'iframe-rounded-corner'} src={this.getFormattedEmbedUrl(data.youtube_link.url)} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen=""></iframe>"
          </div>
        </div>
      </div>;
    }
  }

  render() {
    return this.displayImageOrVideo(this.props.data);
  }
}
