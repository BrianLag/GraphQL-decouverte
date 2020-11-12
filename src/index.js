import React from 'react';
import { render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache()
});

const SPACEX_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function SpacexLaunches() {
  const { loading, error, data } = useQuery(SPACEX_LAUNCHES);

  if (loading) return <p>Loading Launches</p>;
  if (error) return <p>Error in fetching :(</p>;

  return data.launches.map(({ launch_date_utc, launch_success, rocket, links, details }) => (
    <div key={rocket.rocket_name}>
      <h2>{rocket.rocket_name}</h2>
      <ul>
        <li>
          {launch_date_utc}
        </li>
        <li>{launch_success  ?  "Successful Lanch" : "Failed Launch"}</li>
        <li>
          <a href={links.video_link}>
          {links.video_link}
          </a>
        </li>
        <li>
          {details ? details : "No details available"}
        </li>
      </ul>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Wilder Apollo app 🚀</h2>
      </div>
      <SpacexLaunches />
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
