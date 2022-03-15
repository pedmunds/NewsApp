
export { showResult, showAlternative, getjson, getBiasJSON, returnBiasRating, returnBiasLocation, 
    returnLocalAlternative, getBiasList, findKeywords, getNews, isEmpty, constructJSONForDisplay, getHeadlines, getMyHeadlines };

// functions to return a cards content
// all to be included in App.js

import React from 'react';
import { FlatList } from 'react-native';
import { Text, StyleSheet } from "react-native";


// Import getNews from news.js
import  { testKeywords, findClosestMatchString, keywordCount, sortAlternativeArray } from './components/scratchpad';

// test data
var keywordtest = "cat sat mat";
var stringArraytest = ["cat test me", "test me think", "test cat mat", "cat mat", "cat sat mat"];
console.log(findClosestMatchString(keywordtest, stringArraytest));

/* function to read xml from a url
// requires xml2js node library
// test -- console.log('Hello World');
// run with node <filename>.js

PSEUDO CODE:
1) Get google news feed and extract JSON of stories
2) Get list of sites with Biases
3) For first google news story check the bias rating of the source
4) find other sites with other biases
5) fetch story from 3 sites with other biases
6) display good story with 3 other stories from sites with alternative biases
7) repeat for stories in google news list.
*/


const fetch = require('node-fetch');
// const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
// const parser = new xml2js.Parser();
var parseString = require('xml2js').parseString;
//const { Card } = require('react-native-elements');

/* GET GOOGLE NEWS and extract JSON of stories --------------------------------------------
   Function to get google news feed with base set of stories.
   Then it extracts the json from the news feed and returns the json
   Async function which waits for the return */
const showResult = async () => {
  const data = await fetch("https://news.google.com/rss?hl=en-GB&gl=GB&ceid=GB:en").then(res => res.text());
  var result = await getjson(data);
  //console.log("Number of items: " + result.length);
  //console.log("1st title: " + result[0].title);
  //console.log("1st source: " + result[0].source);
  //console.log(result);
  // console.log(result[0]);
  // console.log(result[1]);
  // console.log(result);
  return result;
}

/* =============================================
NEW TOP LEVEL FUNCTION
function to get list of headlines to use for top list */

async function getMyHeadlines() {
  var result = await showResult();  // get original google article list
  var headlinesDisplay = [];
  var obj = {} // empty Object
var key = 'articles';
var objKey = []; // empty Array, which you can push() values into
  for (let j = 0; j < 5; j++ ){
    objKey.push({
      Id:j+1,
      Link: result[j].link,
      Headline: result[j].title
  });
  console.log("headline = " + objKey[j].Headline);
} 
console.log("headlines = " + objKey);
return objKey;
}

async function getHeadlines() {
  var result = await showResult();  // get original google article list
  var jsonArticles = [];
// get details of the main article
var articleSite = result[0].source; //'BBC News';
var articleTitle = result[0].title; // article title
var articleWebsite = result[0].link; // article website
var displayLink = '<a href="' + articleWebsite + '" target="_blank">' + articleTitle + '</a>&nbsp;&nbsp;<font color="#6f6f6f">' + articleSite + '</font>';
var mainArticle = result[0];
}

// ==============================================

/* GET Alternative site story  --------------------------------------------
   Function to get google news feed just from alternative site.
   returns the json of first story
   Async function which waits for the return */
   const showAlternative = async (site, query) => {
    const data = await fetch("https://news.google.com/rss/search?q=allinurl:"+site+"+"+query+"&hl=en-GB&gl=GB&ceid=GB:en").then(res => res.text());
    console.log("https://news.google.com/rss/search?q=allinurl:"+site+"+"+query+"&hl=en-GB&gl=GB&ceid=GB:en");
    var result = await getjson(data);
    // console.log("Number of items: " + result.length);
    // console.log("1st title: " + result[0].title);
    // console.log("1st source: " + result[0].source);
    // console.log(result[0]);
    // console.log(result[1]);
    if (result == null) return ("");

/*
    // return the item that includes some query word match in the title
    var count = -1;
    var test = false;
    var queryArray = query.split('+');
    while (test == false) {
      count=count+1;
      //console.log(result[count]);
      for (i in queryArray.length) {
        if (result[count].title.includes(queryArray[i])) test = true;
      }
      if(!test && !result[count+1]) test=true;
    }
    return result[count]; // return first story with keywords
  */
   return result[0];
  };


/* function called to extract JSON data from a news feed rss file */
function getjson(data){
  return new Promise((resolve, reject) => {       
        parseString(data, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
        // parser.parseString(data, function (err, result) {
            if(err === null) {
                // console.log(result);
                // console.log(JSON.stringify(result));
                // console.log(result.rss.channel.item); // works
                var newsarray = result.rss.channel.item;
                // console.log(newsarray.length); //working
                // console.log(newsarray); //working
                // var newsitem = newsarray.slice(0,1); //working
                // var jitem = JSON.parse(newsitem);
                // console.log(newsitem[0].title); // get rid of square bracket which is the [0]   
                resolve(newsarray);        
            }
            else {
                console.log(err);
            }
        
           // console.log(result); unit test
        });

      });
    };



/* GET BIAS DATA for sites to check --------------------------------------------------------
*/
function getBiasJSON() {
// code for local file read to json object - list of news sources with bias
// var rawdata = require('fs').readFileSync("biasdata.json", "utf8");  //"<root>Hello xml2js!</root>"
let biasdata = JSON.parse(rawdata);
 // console.log(returnBiasRating(biasdata, 'ABC News'));
return biasdata;
}

function returnBiasRating(biasJson, name) {
  // code to return values from json object
  // return bias of site
  if (biasJson[name]) return biasJson[name].Bias;
  else return "error";  
  };

  function returnBiasLocation(biasJson, name) {
    // code to return values from json object
    // return location of site
    if (biasJson[name]) return biasJson[name].Location;
    else return "error";  
    }; 

    function returnLocalAlternative(biasJson, name) {
      // code to return values from json object
      // return alternative with same location as site
      var local = returnBiasLocation(biasJson, name);
      var localBias = returnBiasRating(biasJson, name);
      var localJSON = [];
    if(local != "error") {
      for(var k in biasJson) {
        if(biasJson[k].Location == local && localBias != biasJson[k].Bias) localJSON.push(biasJson[k]);  
        }
      }
    //console.log("local list: start ");
    //console.log(localJSON);
    //console.log("local list: end");
    if(localJSON) return localJSON;
    }
    
/* -- get alternative sites
    pseudocode:
    define political spectrum
    find local sites on left and right
    select random international sites across spectrum
    return list to get stories
*/

function getBiasList(biasJSON, articleSite, articleBias) {
    // code to return values from json object
    var biasValues = ['Left', 'Lean Left', 'Center', 'Lean Right', 'Right'];
    // remove current bias from list
    biasValues = biasValues.filter(e => e !== articleBias);
    //console.log(biasValues);
    //Return list of sites and bias values to supply alternatives
    var returnJSON = [];
    // check if there any local sites to return
    var localsites = returnLocalAlternative(biasJSON, articleSite);

    // generate random number between 1 and 10
        var randomNumber = Math.floor(Math.random() *10) + 1;
        // console.log(randomNumber);
        var count = 0;
    for (var v in biasValues) {
      count = 0;
    for(var k in biasJSON) {
      if(biasJSON[k].Bias == biasValues[v]) {
        count++;
        if (count == randomNumber)  returnJSON.push(biasJSON[k]);
      };
    }
  }

  for(var j in localsites) {
    console.log(returnJSON.filter(d => d.Name === localsites[j].Name));
    if (returnJSON.filter(d => d.Name === localsites[j].Name).length == 0) returnJSON.push(localsites[j]);
    console.log("push " + localsites[j]);
  }
  //console.log(returnJSON);
  return returnJSON;
    };

  function findKeywords(articleTitle) {
    // code to return keywords from an article title
    // var test = 'Under 40s to get single-shot Johnson & Johnson Covid vaccine to \'jab and go\' in July - Mirror Online';
    // just get capital nouns
    // var r = articleTitle.replace(/. [A-Z]/, function(v) { return v.toLowerCase(); });
    // var keywords = articleTitle.match(/\w*[A-Z]\w*/g);

    // match has a bug so have to do keyword extraction long hand!
    var keywords = [];
    var words = ['words'];
    while(words !== null)
      {
        words = articleTitle.match(/\w*[A-Z]\w*/);
        if(words !== null) {
          keywords.push(words[0]);
          articleTitle = articleTitle.replace(words[0], "");
        }
      }

    /*
    //Start test for all words
    var $commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];
    var $text = articleTitle;
    // Convert to lowercase
    $text = $text.toLowerCase();
    // replace unnecessary chars. leave only chars, numbers and space
    $text = $text.replace(/[^\w\d ]/g, '');
    var result = $text.split(' ');
    // remove $commonWords
    result = result.filter(function (word) {
    return $commonWords.indexOf(word) === -1;
      });
    var keywords = result;
    // end test
    */

    // original return of non formatted query string 
    /*
    query = keywords.toString();
    query = query.replace(/,/g, "|"); 
    return query;
    */
  

    // return a sorted query string for better results
    var key1 = keywords[0];
    //var key2 = keywords[1];
    keywords = keywords.shift();
    //keywords = keywords.shift();
    query = keywords.toString();
    query = query.replace(/,/g, "|"); 
    query = query + "+" + key1;
    //query = query + "+" + key2;
    return query;

    };

  async function getNews(input) {
    // console.log('input = ' + input);
    var result = await showResult();  // get original google article list
    var jsonArticles = [];
  // get details of the main article
  var articleSite = result[0].source; //'BBC News';
  var articleTitle = result[0].title; // article title
  var articleWebsite = result[0].link; // article website
  var displayLink = '<a href="' + articleWebsite + '" target="_blank">' + articleTitle + '</a>&nbsp;&nbsp;<font color="#6f6f6f">' + articleSite + '</font>';
  var mainArticle = result[0];
  console.log(result[0]);
  // get top headlines for display at the top
  var headlinesDisplay = [];
  for (let j = 0; j < 5; j++ ){
    headlinesDisplay[j] = '<; href="' + result[j].link + '" target="_blank">' + result[j].title;
  }
  // get list of alternative sites to display for first article
  articleTitle = articleTitle.replace(/\-.*/,''); // get rid of site name in title
  const query = findKeywords(articleTitle);
  console.log(query);
  const biasJSON = getBiasJSON();
  var articleBias = returnBiasRating(biasJSON, articleSite);
  console.log(articleBias);
  console.log(articleSite);
  var biasSites = getBiasList(biasJSON, articleSite, articleBias);
  console.log(biasSites);
   
 var AlternativeStory;
  var biasWeb;
  var biasSite;
  var biasLeaning;
  const AlternativeArray = [];

 for (var b in biasSites) {
  biasWeb = biasSites[b].website; // url of bias site
  biasSite = biasSites[b].Name; // bias source
  biasLeaning = biasSites[b].Bias; // bias
  console.log(biasLeaning + " " + biasSite + " " + biasWeb);
  AlternativeArray[b] = biasSites[b].website;
  console.log("array " + b + ": " + AlternativeArray[b]);
/*
  AlternativeStory[b] = await showAlternative(biasWeb, query);
  console.log("story " + b + ": ");
  console.log(AlternativeStory[b]);
  */
 }

 const promises = AlternativeArray.map(async item => {
  const AlternativeResult = await showAlternative(item, query);
  return AlternativeResult
})

const AlternativeResults = await Promise.all(promises);
console.log("All results = " + JSON.stringify(AlternativeResults));
console.log(isEmpty(AlternativeResults));

// check to remove nulls from AlternativeResults
const cleaned = []; // cleaned AlternativeResults
const biasCleaned = []; // cleaned biasSites
AlternativeResults.forEach((element, index) => {
  if (element != "" && element != null) {
    cleaned.push(element);
    biasCleaned.push(biasSites[index]);
  }
});

console.log("cleaned = " + JSON.stringify(cleaned));



// finally lets return the results in a display format
// const CardContent1 = constructJSONForDisplay(result, biasSites, AlternativeResults); 
const CardContent1 = constructJSONForDisplay(result, biasCleaned, cleaned); 
console.log("CardContent = " + JSON.stringify(CardContent1));
// var AlternativeResult = showAlternative("FOXNEWS.COM", "Brexit");
return CardContent1.articles;
}

function isEmpty(arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] != "") return false;
    }
  return true;
}

function constructJSONForDisplay(result, biasSites, AlternativeResults){

// get results sorted by best match for display
// functions are from scratchpad.js (./components/scratchpad)
var AlternativeResultsTemp = {};
AlternativeResultsTemp = sortAlternativeArray(result[0].title, AlternativeResults, biasSites);

console.log("AlternativeResultsTemp0 = " + AlternativeResultsTemp.sortedArray);
console.log("AlternativeResultsTemp1 = " + AlternativeResultsTemp.biasSitesArray);
//AlternativeResults = AlternativeResultsTemp[0];
//biasSites = AlternativeResultsTemp[1];
AlternativeResults = AlternativeResultsTemp.sortedArray;
biasSites = AlternativeResultsTemp.biasSitesArray;

// now construct the json for display
var cardJS = [];

var o = {} // empty Object
var key = 'articles';
o[key] = []; // empty Array, which you can push() values into

console.log("construct display running");

o[key].push({
  // Article: displayLink
  Id:"0",
  Name: result[0].source,
  Title: result[0].title,
  Link: result[0].link

});

console.log("display first item: " + result[0].title);

for (var b in biasSites) {
  if(AlternativeResults[b] != ""){
    o[key].push({
    Id:b+1,
    Name: biasSites[b].Name,
    Bias: biasSites[b].Bias,
    Title: AlternativeResults[b].title,
    Link: AlternativeResults[b].link
});
  }
 }

 console.log("final results: " +  + JSON.stringify(o));

return o;
}



// Import end 

import Article from './components/PostList';




const rawdata = '{"ABC News":{"Name":"ABC News","Bias":"Lean Left","Location":"us","website":"abcnews.go.com","specialism":null},"Al Jazeera":{"Name":"Al Jazeera","Bias":"Center","Location":"middle east","website":"www.aljazeera.com","specialism":null},"AlterNet":{"Name":"AlterNet","Bias":"Left","Location":"us","website":"www.alternet.org","specialism":null},"American Spectator":{"Name":"American Spectator","Bias":"Right","Location":"us","website":"spectator.org","specialism":null},"American Thinker":{"Name":"American Thinker","Bias":"Right","Location":"us","website":"www.americanthinker.com","specialism":null},"Associated Press":{"Name":"Associated Press","Bias":"Center","Location":"us","website":"www.apnews.com","specialism":null},"Axios":{"Name":"Axios","Bias":"Center","Location":"us","website":"www.axios.com","specialism":null},"BBC News":{"Name":"BBC News","Bias":"Center","Location":"uk","website":"www.bbc.co.uk/news","specialism":null},"Bloomberg":{"Name":"Bloomberg","Bias":"Center","Location":"int","website":"www.bloomberg.com","specialism":null},"Breitbart News":{"Name":"Breitbart News","Bias":"Right","Location":"us","website":"www.breitbart.com","specialism":null},"Business Insider":{"Name":"Business Insider","Bias":"Center","Location":"int","website":"www.businessinsider.com","specialism":null},"Bustle":{"Name":"Bustle","Bias":"Lean Left","Location":"us","website":"www.bustle.com","specialism":"women"},"BuzzFeed News":{"Name":"BuzzFeed News","Bias":"Lean Left","Location":"int","website":"www.buzzfeed.com","specialism":null},"CBN":{"Name":"CBN","Bias":"Right","Location":"us","website":"www1.cbn.com","specialism":"christian"},"CBS News":{"Name":"CBS News","Bias":"Lean Left","Location":"us","website":"www.cbsnews.com","specialism":null},"Christian Science Monitor":{"Name":"Christian Science Monitor","Bias":"Center","Location":"us","website":"www.csmonitor.com","specialism":"christian"},"City Journal":{"Name":"City Journal","Bias":"Right","Location":"us","website":"www.city-journal.org","specialism":null},"CNBC":{"Name":"CNBC","Bias":"Center","Location":"us","website":"www.cnbc.com","specialism":null},"CNN (Web News)":{"Name":"CNN (Web News)","Bias":"Lean Left","Location":"int","website":"edition.cnn.com","specialism":null},"CNS News":{"Name":"CNS News","Bias":"Right","Location":"us","website":"www.cnsnews.com","specialism":null},"Cook Report":{"Name":"Cook Report","Bias":"Center","Location":"us","website":"cookpolitical.com","specialism":null},"Daily Beast":{"Name":"Daily Beast","Bias":"Left","Location":"int","website":"www.thedailybeast.com","specialism":null},"Daily Mail":{"Name":"Daily Mail","Bias":"Right","Location":"uk","website":"www.dailymail.co.uk","specialism":null},"Defense One":{"Name":"Defense One","Bias":"Center","Location":"us","website":"www.defenseone.com","specialism":"military"},"Democracy Now":{"Name":"Democracy Now","Bias":"Left","Location":"us","website":"www.democracynow.org","specialism":"radical"},"Diplomatic Courier":{"Name":"Diplomatic Courier","Bias":"Center","Location":"us","website":"www.diplomaticourier.com","specialism":"policy"},"Eurek Alert":{"Name":"Eurek Alert","Bias":"Center","Location":"int","website":"www.eurekalert.org","specialism":"science"},"FactCheck":{"Name":"FactCheck","Bias":"Center","Location":"us","website":"www.factcheck.org","specialism":"factcheck"},"Fair":{"Name":"Fair","Bias":"Center","Location":"us","website":"fair.org","specialism":"factcheck"},"Fiscal Times":{"Name":"Fiscal Times","Bias":"Lean Right","Location":"us","website":"www.thefiscaltimes.com","specialism":null},"FiveThirtyEight":{"Name":"FiveThirtyEight","Bias":"Center","Location":"us","website":"fivethirtyeight.com","specialism":"comment"},"Forbes":{"Name":"Forbes","Bias":"Center","Location":"us","website":"www.forbes.com","specialism":"comment"},"Fox News":{"Name":"Fox News","Bias":"Lean Right","Location":"us","website":"www.foxnews.com","specialism":null},"Grist":{"Name":"Grist","Bias":"Lean Left","Location":"us","website":"grist.org","specialism":"climate"},"HotAir":{"Name":"HotAir","Bias":"Lean Right","Location":"us","website":"hotair.com","specialism":"comment"},"How Do We Fix It?":{"Name":"How Do We Fix It?","Bias":"Center","Location":"us","website":"www.howdowefixit.me","specialism":"climate"},"HuffPost":{"Name":"HuffPost","Bias":"Left","Location":"int","website":"www.huffingtonpost.com","specialism":null},"Journalists Resource":{"Name":"Journalists Resource","Bias":"Center","Location":"us","website":"journalistsresource.org","specialism":null},"Las Vegas Sun":{"Name":"Las Vegas Sun","Bias":"Lean Left","Location":null,"website":null,"specialism":null},"Lifehacker":{"Name":"Lifehacker","Bias":"Center","Location":"int","website":"Lifehacker.com","specialism":"comment"},"MSNBC":{"Name":"MSNBC","Bias":"Left","Location":"us","website":"www.msnbc.com","specialism":null},"National Review":{"Name":"National Review","Bias":"Right","Location":"us","website":"www.nationalreview.com","specialism":"comment"},"NBC News":{"Name":"NBC News","Bias":"Lean Left","Location":"us","website":"NBCNews.com","specialism":null},"New Republic":{"Name":"New Republic","Bias":"Left","Location":"us","website":"newrepublic.com","specialism":"comment"},"New York Post":{"Name":"New York Post","Bias":"Right","Location":"us","website":"nypost.com","specialism":null},"New York Times - News":{"Name":"New York Times - News","Bias":"Lean Left","Location":"us","website":"www.nytimes.com","specialism":null},"Newsweek":{"Name":"Newsweek","Bias":"Lean Left","Location":"int","website":"https://www.newsweek.com","specialism":null},"PJ Media":{"Name":"PJ Media","Bias":"Right","Location":"us","website":"pjmedia.com","specialism":null},"Politico":{"Name":"Politico","Bias":"Lean Left","Location":"us","website":"https://www.politico.com","specialism":null},"PolitiFact":{"Name":"PolitiFact","Bias":"Lean Left","Location":"us","website":"www.politifact.com","specialism":"factcheck"},"ProCon":{"Name":"ProCon","Bias":"Mixed","Location":"int","website":"ProCon.org","specialism":"comment"},"Quartz":{"Name":"Quartz","Bias":"Center","Location":"us","website":"qz.com","specialism":null},"Quillette":{"Name":"Quillette","Bias":"Lean Right","Location":"us","website":"quillette.com","specialism":"comment"},"RealClearPolitics":{"Name":"RealClearPolitics","Bias":"Center","Location":"us","website":"www.realclearpolitics.com","specialism":null},"Reuters":{"Name":"Reuters","Bias":"Center","Location":"int","website":"www.reuters.com","specialism":null},"Science Daily":{"Name":"Science Daily","Bias":"Center","Location":"us","website":"www.sciencedaily.com","specialism":"science"},"Scientific American":{"Name":"Scientific American","Bias":"Center","Location":"us","website":"www.scientificamerican.com","specialism":"science"},"Socialist Alternative":{"Name":"Socialist Alternative","Bias":"Left","Location":"us","website":"www.socialistalternative.org","specialism":"socialist"},"The American Conservative":{"Name":"The American Conservative","Bias":"Lean Right","Location":"us","website":"www.theamericanconservative.com","specialism":"conservative"},"The Atlantic":{"Name":"The Atlantic","Bias":"Lean Left","Location":"int","website":"www.theatlantic.com","specialism":null},"The Daily Wire":{"Name":"The Daily Wire","Bias":"Right","Location":"us","website":"www.dailywire.com","specialism":"conservative"},"The Economist":{"Name":"The Economist","Bias":"Lean Left","Location":"int","website":"www.economist.com","specialism":null},"The Federalist":{"Name":"The Federalist","Bias":"Right","Location":"us","website":"thefederalist.com","specialism":"comment"},"The Gateway Pundit":{"Name":"The Gateway Pundit","Bias":"Right","Location":"us","website":"www.thegatewaypundit.com","specialism":"extreme"},"The Guardian":{"Name":"The Guardian","Bias":"Lean Left","Location":"uk","website":"www.theguardian.com","specialism":null},"The Hill":{"Name":"The Hill","Bias":"Center","Location":"us","website":"thehill.com","specialism":null},"The Jerusalem Post":{"Name":"The Jerusalem Post","Bias":"Center","Location":"Isr","website":"www.jpost.com","specialism":"ethnic"},"The Korea Herald":{"Name":"The Korea Herald","Bias":"Center","Location":"kor","website":"http://www.koreaherald.com/","specialism":"ethnic"},"The Libertarian Republic":{"Name":"The Libertarian Republic","Bias":"Lean Right","Location":"us","website":"thelibertarianrepublic.com","specialism":null},"The New Yorker":{"Name":"The New Yorker","Bias":"Left","Location":"us","website":"www.newyorker.com","specialism":null},"The Root":{"Name":"The Root","Bias":"Lean Left","Location":"us","website":"www.theroot.com","specialism":"ethnic"},"The Telegraph - UK":{"Name":"The Telegraph - UK","Bias":"Lean Right","Location":"uk","website":"www.telegraph.co.uk","specialism":"paywall"},"The Verge":{"Name":"The Verge","Bias":"Lean Left","Location":"us","website":"www.theverge.com","specialism":"tech"},"The Week":{"Name":"The Week","Bias":"Center","Location":"uk","website":"www.theweek.co.uk","specialism":"great"},"The Weekly Standard":{"Name":"The Weekly Standard","Bias":"Right","Location":"us","website":"www.weeklystandard.com","specialism":null},"ThinkProgress":{"Name":"ThinkProgress","Bias":"Left","Location":"us","website":"thinkprogress.org","specialism":null},"Time Magazine":{"Name":"Time Magazine","Bias":"Lean Left","Location":"int","website":"time.com","specialism":null},"Townhall":{"Name":"Townhall","Bias":"Right","Location":"us","website":"townhall.com","specialism":null},"Snopes":{"Name":"Snopes","Bias":"Center","Location":"us","website":"www.snopes.com","specialism":"fact check"},"TruthOut":{"Name":"TruthOut","Bias":"Lean Left","Location":"us","website":"truthout.org","specialism":null},"Upworthy":{"Name":"Upworthy","Bias":"Left","Location":"us","website":"www.upworthy.com","specialism":null},"USA TODAY":{"Name":"USA TODAY","Bias":"Center","Location":"us","website":"www.usatoday.com","specialism":null},"Vanity Fair":{"Name":"Vanity Fair","Bias":"Lean Left","Location":null,"website":"www.vanityfair.com","specialism":"liefstyle"},"Vox":{"Name":"Vox","Bias":"Left","Location":"us","website":"www.vox.com","specialism":null},"Wall Street Journal - News":{"Name":"Wall Street Journal - News","Bias":"Center","Location":"us","website":"www.wsj.com","specialism":"paywall"},"Washington Monthly":{"Name":"Washington Monthly","Bias":"Lean Left","Location":"us","website":"washingtonmonthly.com","specialism":"comment"},"Washington Times":{"Name":"Washington Times","Bias":"Lean Right","Location":"us","website":"www.washingtontimes.com","specialism":null},"Digital Trends":{"Name":"Digital Trends","Bias":"Center","Location":"us","website":"www.digitaltrends.com","specialism":"tech"},"The Sun":{"Name":"The Sun","Bias":"Left","Location":"uk","website":"www.thesun.co.uk","specialism":null},"The Express":{"Name":"The Express","Bias":"Right","Location":"uk","website":"www.express.co.uk","specialism":null},"Sydney Morning Herald":{"Name":"Sydney Morning Herald","Bias":"Center","Location":"aus","website":"www.smh.com.au","specialism":null},"Spectator":{"Name":"Spectator","Bias":"Lean Right","Location":"uk","website":"www.spectator.co.uk","specialism":null},"Sky News":{"Name":"Sky News","Bias":"Center","Location":"uk","website":"news.sky.com","specialism":null}}';