import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetail } from './components';

import youtube from './api/youtube';

class App extends React.Component {
  state = {
    video: [],
    selectedVideo: null,
  };

  handleSubmit = async searchTerm => {
    const response = await youtube.get('search', {
      params: {
        q: searchTerm,
        part: 'snippet',
        maxResults: 5,
        key: process.env.REACT_APP_YOUTUBE_KEY,
      },
    });

    this.setState({
      video: response.data.items,
      selectedVideo: response.data.items[0],
    });
  }

  render() {
    const { selectedVideo } = this.state;
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              {/* Video list */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
