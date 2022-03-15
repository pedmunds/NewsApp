import React from 'react';
import { FlatList } from 'react-native';
import { Header } from 'react-native';
import { Text, StyleSheet, View, SafeAreaView, Linking } from "react-native";
import { Card, Divider } from 'react-native-elements';


// Import getNews and other functions
import  { testKeywords, findClosestMatchString, keywordCount, sortAlternativeArray } from './components/scratchpad';
import { showResult, showAlternative, getjson, getBiasJSON, returnBiasRating, returnBiasLocation, returnLocalAlternative, getBiasList, findKeywords, getNews, isEmpty, constructJSONForDisplay, getHeadlines, getMyHeadlines } from './GetCardContent.js';

// Import end 

import Article from './components/PostList';
import { render_FlatList_header } from './components/header';


  export default class AltNews extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        ALTarticles: [], 
        Headlines: this.props.input
      };
      this.fetchNews = this.fetchNews.bind(this);
    }
  
    componentDidMount() {
      this.fetchNews();
    }

    /*
    componentDidUpdate(prevProps, prevState) {
      if (prevState.input != this.props.input) {
    //  alert('testupdate = ' + this.props.input);
    }     // this.fetchNews();
    };
*/
  
    fetchNews() {
      alert('test fetchALT = ' + this.props.input);
      getNews()
        .then(ALTarticles => this.setState({ ALTarticles }))
        .catch(() => this.setState({}));
    }
  
  
    render() {
      return (
        
        <FlatList 
          ListHeaderComponent={() => {return (<Text>Alternative Articles </Text>)}}
          data={this.state.ALTarticles}
          renderItem={({ item }) => <Article ALTarticle={item} />}
          keyExtractor={item => item.Id}
        />
      );
    }
  }
  
  const styles = {
    noteStyle: {
      margin: 5,
      fontStyle: 'italic',
      color: '#b2bec3',
      fontSize: 12
    },
    featuredTitleStyle: {
      marginHorizontal: 5,
      textShadowColor: '#00000f',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 3
    }
  };
  
  const rawdata = '{"ABC News":{"Name":"ABC News","Bias":"Lean Left","Location":"us","website":"abcnews.go.com","specialism":null},"Al Jazeera":{"Name":"Al Jazeera","Bias":"Center","Location":"middle east","website":"www.aljazeera.com","specialism":null},"AlterNet":{"Name":"AlterNet","Bias":"Left","Location":"us","website":"www.alternet.org","specialism":null},"American Spectator":{"Name":"American Spectator","Bias":"Right","Location":"us","website":"spectator.org","specialism":null},"American Thinker":{"Name":"American Thinker","Bias":"Right","Location":"us","website":"www.americanthinker.com","specialism":null},"Associated Press":{"Name":"Associated Press","Bias":"Center","Location":"us","website":"www.apnews.com","specialism":null},"Axios":{"Name":"Axios","Bias":"Center","Location":"us","website":"www.axios.com","specialism":null},"BBC News":{"Name":"BBC News","Bias":"Center","Location":"uk","website":"www.bbc.co.uk/news","specialism":null},"Bloomberg":{"Name":"Bloomberg","Bias":"Center","Location":"int","website":"www.bloomberg.com","specialism":null},"Breitbart News":{"Name":"Breitbart News","Bias":"Right","Location":"us","website":"www.breitbart.com","specialism":null},"Business Insider":{"Name":"Business Insider","Bias":"Center","Location":"int","website":"www.businessinsider.com","specialism":null},"Bustle":{"Name":"Bustle","Bias":"Lean Left","Location":"us","website":"www.bustle.com","specialism":"women"},"BuzzFeed News":{"Name":"BuzzFeed News","Bias":"Lean Left","Location":"int","website":"www.buzzfeed.com","specialism":null},"CBN":{"Name":"CBN","Bias":"Right","Location":"us","website":"www1.cbn.com","specialism":"christian"},"CBS News":{"Name":"CBS News","Bias":"Lean Left","Location":"us","website":"www.cbsnews.com","specialism":null},"Christian Science Monitor":{"Name":"Christian Science Monitor","Bias":"Center","Location":"us","website":"www.csmonitor.com","specialism":"christian"},"City Journal":{"Name":"City Journal","Bias":"Right","Location":"us","website":"www.city-journal.org","specialism":null},"CNBC":{"Name":"CNBC","Bias":"Center","Location":"us","website":"www.cnbc.com","specialism":null},"CNN (Web News)":{"Name":"CNN (Web News)","Bias":"Lean Left","Location":"int","website":"edition.cnn.com","specialism":null},"CNS News":{"Name":"CNS News","Bias":"Right","Location":"us","website":"www.cnsnews.com","specialism":null},"Cook Report":{"Name":"Cook Report","Bias":"Center","Location":"us","website":"cookpolitical.com","specialism":null},"Daily Beast":{"Name":"Daily Beast","Bias":"Left","Location":"int","website":"www.thedailybeast.com","specialism":null},"Daily Mail":{"Name":"Daily Mail","Bias":"Right","Location":"uk","website":"www.dailymail.co.uk","specialism":null},"Defense One":{"Name":"Defense One","Bias":"Center","Location":"us","website":"www.defenseone.com","specialism":"military"},"Democracy Now":{"Name":"Democracy Now","Bias":"Left","Location":"us","website":"www.democracynow.org","specialism":"radical"},"Diplomatic Courier":{"Name":"Diplomatic Courier","Bias":"Center","Location":"us","website":"www.diplomaticourier.com","specialism":"policy"},"Eurek Alert":{"Name":"Eurek Alert","Bias":"Center","Location":"int","website":"www.eurekalert.org","specialism":"science"},"FactCheck":{"Name":"FactCheck","Bias":"Center","Location":"us","website":"www.factcheck.org","specialism":"factcheck"},"Fair":{"Name":"Fair","Bias":"Center","Location":"us","website":"fair.org","specialism":"factcheck"},"Fiscal Times":{"Name":"Fiscal Times","Bias":"Lean Right","Location":"us","website":"www.thefiscaltimes.com","specialism":null},"FiveThirtyEight":{"Name":"FiveThirtyEight","Bias":"Center","Location":"us","website":"fivethirtyeight.com","specialism":"comment"},"Forbes":{"Name":"Forbes","Bias":"Center","Location":"us","website":"www.forbes.com","specialism":"comment"},"Fox News":{"Name":"Fox News","Bias":"Lean Right","Location":"us","website":"www.foxnews.com","specialism":null},"Grist":{"Name":"Grist","Bias":"Lean Left","Location":"us","website":"grist.org","specialism":"climate"},"HotAir":{"Name":"HotAir","Bias":"Lean Right","Location":"us","website":"hotair.com","specialism":"comment"},"How Do We Fix It?":{"Name":"How Do We Fix It?","Bias":"Center","Location":"us","website":"www.howdowefixit.me","specialism":"climate"},"HuffPost":{"Name":"HuffPost","Bias":"Left","Location":"int","website":"www.huffingtonpost.com","specialism":null},"Journalists Resource":{"Name":"Journalists Resource","Bias":"Center","Location":"us","website":"journalistsresource.org","specialism":null},"Las Vegas Sun":{"Name":"Las Vegas Sun","Bias":"Lean Left","Location":null,"website":null,"specialism":null},"Lifehacker":{"Name":"Lifehacker","Bias":"Center","Location":"int","website":"Lifehacker.com","specialism":"comment"},"MSNBC":{"Name":"MSNBC","Bias":"Left","Location":"us","website":"www.msnbc.com","specialism":null},"National Review":{"Name":"National Review","Bias":"Right","Location":"us","website":"www.nationalreview.com","specialism":"comment"},"NBC News":{"Name":"NBC News","Bias":"Lean Left","Location":"us","website":"NBCNews.com","specialism":null},"New Republic":{"Name":"New Republic","Bias":"Left","Location":"us","website":"newrepublic.com","specialism":"comment"},"New York Post":{"Name":"New York Post","Bias":"Right","Location":"us","website":"nypost.com","specialism":null},"New York Times - News":{"Name":"New York Times - News","Bias":"Lean Left","Location":"us","website":"www.nytimes.com","specialism":null},"Newsweek":{"Name":"Newsweek","Bias":"Lean Left","Location":"int","website":"https://www.newsweek.com","specialism":null},"PJ Media":{"Name":"PJ Media","Bias":"Right","Location":"us","website":"pjmedia.com","specialism":null},"Politico":{"Name":"Politico","Bias":"Lean Left","Location":"us","website":"https://www.politico.com","specialism":null},"PolitiFact":{"Name":"PolitiFact","Bias":"Lean Left","Location":"us","website":"www.politifact.com","specialism":"factcheck"},"ProCon":{"Name":"ProCon","Bias":"Mixed","Location":"int","website":"ProCon.org","specialism":"comment"},"Quartz":{"Name":"Quartz","Bias":"Center","Location":"us","website":"qz.com","specialism":null},"Quillette":{"Name":"Quillette","Bias":"Lean Right","Location":"us","website":"quillette.com","specialism":"comment"},"RealClearPolitics":{"Name":"RealClearPolitics","Bias":"Center","Location":"us","website":"www.realclearpolitics.com","specialism":null},"Reuters":{"Name":"Reuters","Bias":"Center","Location":"int","website":"www.reuters.com","specialism":null},"Science Daily":{"Name":"Science Daily","Bias":"Center","Location":"us","website":"www.sciencedaily.com","specialism":"science"},"Scientific American":{"Name":"Scientific American","Bias":"Center","Location":"us","website":"www.scientificamerican.com","specialism":"science"},"Socialist Alternative":{"Name":"Socialist Alternative","Bias":"Left","Location":"us","website":"www.socialistalternative.org","specialism":"socialist"},"The American Conservative":{"Name":"The American Conservative","Bias":"Lean Right","Location":"us","website":"www.theamericanconservative.com","specialism":"conservative"},"The Atlantic":{"Name":"The Atlantic","Bias":"Lean Left","Location":"int","website":"www.theatlantic.com","specialism":null},"The Daily Wire":{"Name":"The Daily Wire","Bias":"Right","Location":"us","website":"www.dailywire.com","specialism":"conservative"},"The Economist":{"Name":"The Economist","Bias":"Lean Left","Location":"int","website":"www.economist.com","specialism":null},"The Federalist":{"Name":"The Federalist","Bias":"Right","Location":"us","website":"thefederalist.com","specialism":"comment"},"The Gateway Pundit":{"Name":"The Gateway Pundit","Bias":"Right","Location":"us","website":"www.thegatewaypundit.com","specialism":"extreme"},"The Guardian":{"Name":"The Guardian","Bias":"Lean Left","Location":"uk","website":"www.theguardian.com","specialism":null},"The Hill":{"Name":"The Hill","Bias":"Center","Location":"us","website":"thehill.com","specialism":null},"The Jerusalem Post":{"Name":"The Jerusalem Post","Bias":"Center","Location":"Isr","website":"www.jpost.com","specialism":"ethnic"},"The Korea Herald":{"Name":"The Korea Herald","Bias":"Center","Location":"kor","website":"http://www.koreaherald.com/","specialism":"ethnic"},"The Libertarian Republic":{"Name":"The Libertarian Republic","Bias":"Lean Right","Location":"us","website":"thelibertarianrepublic.com","specialism":null},"The New Yorker":{"Name":"The New Yorker","Bias":"Left","Location":"us","website":"www.newyorker.com","specialism":null},"The Root":{"Name":"The Root","Bias":"Lean Left","Location":"us","website":"www.theroot.com","specialism":"ethnic"},"The Telegraph - UK":{"Name":"The Telegraph - UK","Bias":"Lean Right","Location":"uk","website":"www.telegraph.co.uk","specialism":"paywall"},"The Verge":{"Name":"The Verge","Bias":"Lean Left","Location":"us","website":"www.theverge.com","specialism":"tech"},"The Week":{"Name":"The Week","Bias":"Center","Location":"uk","website":"www.theweek.co.uk","specialism":"great"},"The Weekly Standard":{"Name":"The Weekly Standard","Bias":"Right","Location":"us","website":"www.weeklystandard.com","specialism":null},"ThinkProgress":{"Name":"ThinkProgress","Bias":"Left","Location":"us","website":"thinkprogress.org","specialism":null},"Time Magazine":{"Name":"Time Magazine","Bias":"Lean Left","Location":"int","website":"time.com","specialism":null},"Townhall":{"Name":"Townhall","Bias":"Right","Location":"us","website":"townhall.com","specialism":null},"Snopes":{"Name":"Snopes","Bias":"Center","Location":"us","website":"www.snopes.com","specialism":"fact check"},"TruthOut":{"Name":"TruthOut","Bias":"Lean Left","Location":"us","website":"truthout.org","specialism":null},"Upworthy":{"Name":"Upworthy","Bias":"Left","Location":"us","website":"www.upworthy.com","specialism":null},"USA TODAY":{"Name":"USA TODAY","Bias":"Center","Location":"us","website":"www.usatoday.com","specialism":null},"Vanity Fair":{"Name":"Vanity Fair","Bias":"Lean Left","Location":null,"website":"www.vanityfair.com","specialism":"liefstyle"},"Vox":{"Name":"Vox","Bias":"Left","Location":"us","website":"www.vox.com","specialism":null},"Wall Street Journal - News":{"Name":"Wall Street Journal - News","Bias":"Center","Location":"us","website":"www.wsj.com","specialism":"paywall"},"Washington Monthly":{"Name":"Washington Monthly","Bias":"Lean Left","Location":"us","website":"washingtonmonthly.com","specialism":"comment"},"Washington Times":{"Name":"Washington Times","Bias":"Lean Right","Location":"us","website":"www.washingtontimes.com","specialism":null},"Digital Trends":{"Name":"Digital Trends","Bias":"Center","Location":"us","website":"www.digitaltrends.com","specialism":"tech"},"The Sun":{"Name":"The Sun","Bias":"Left","Location":"uk","website":"www.thesun.co.uk","specialism":null},"The Express":{"Name":"The Express","Bias":"Right","Location":"uk","website":"www.express.co.uk","specialism":null},"Sydney Morning Herald":{"Name":"Sydney Morning Herald","Bias":"Center","Location":"aus","website":"www.smh.com.au","specialism":null},"Spectator":{"Name":"Spectator","Bias":"Lean Right","Location":"uk","website":"www.spectator.co.uk","specialism":null},"Sky News":{"Name":"Sky News","Bias":"Center","Location":"uk","website":"news.sky.com","specialism":null}}';
