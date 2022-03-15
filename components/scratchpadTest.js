
//export { testKeywords, findClosestMatchString, keywordCount, sortAlternativeArray };

// function to sort alternative result by number of keywords in title
// takes 2 arguments, bias sites and urls

// test data
var keywordtest = "Police search quarry near York for Claudia Lawrence remains - Mirror";
var stringArraytest = [{"title":"'Disgraceful': Capitol police officer fights back tears as he calls out Republicans for 'betraying their oath of office' - AlterNet","link":"https://www.alternet.org/2021/07/capitol-police/","guid":"CAIiEAmHukmhiKby1q2V6eG23CUqMwgEKioIACIQFXzEjYK8lSeqvt1aM6ZCDioUCAoiEBV8xI2CvJUnqr7dWjOmQg4wlr3sBg","pubDate":"Tue, 27 Jul 2021 07:00:00 GMT","description":"<a href=\"https://www.alternet.org/2021/07/capitol-police/\" target=\"_blank\">'Disgraceful': Capitol police officer fights back tears as he calls out Republicans for 'betraying their oath of office'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">AlterNet</font>","source":"AlterNet"},{"title":"Tunisia police storm Al Jazeera office in Tunis - Al Jazeera English","link":"https://www.aljazeera.com/news/2021/7/26/tunisia-police-storm-al-jazeera-office-in-tunis","guid":"CAIiEIL4RaEyp1uH4_G6eMo7MVAqFQgEKgwIACoFCAowhgIwkDgwrvqTBw","pubDate":"Mon, 26 Jul 2021 07:00:00 GMT","description":"<a href=\"https://www.aljazeera.com/news/2021/7/26/tunisia-police-storm-al-jazeera-office-in-tunis\" target=\"_blank\">Tunisia police storm Al Jazeera office in Tunis</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Al Jazeera English</font>","source":"Al Jazeera English"},{"title":"A $2 Billion Security Deal That Includes Funding for the Capitol Police - The Fiscal Times","link":"https://www.thefiscaltimes.com/2021/07/27/2-Billion-Security-Deal-Includes-Funding-Capitol-Police","guid":"CBMiYWh0dHBzOi8vd3d3LnRoZWZpc2NhbHRpbWVzLmNvbS8yMDIxLzA3LzI3LzItQmlsbGlvbi1TZWN1cml0eS1EZWFsLUluY2x1ZGVzLUZ1bmRpbmctQ2FwaXRvbC1Qb2xpY2XSAWVodHRwczovL3d3dy50aGVmaXNjYWx0aW1lcy5jb20vMjAyMS8wNy8yNy8yLUJpbGxpb24tU2VjdXJpdHktRGVhbC1JbmNsdWRlcy1GdW5kaW5nLUNhcGl0b2wtUG9saWNlP2FtcA","pubDate":"Tue, 27 Jul 2021 23:12:47 GMT","description":"<a href=\"https://www.thefiscaltimes.com/2021/07/27/2-Billion-Security-Deal-Includes-Funding-Capitol-Police\" target=\"_blank\">A $2 Billion Security Deal That Includes Funding for the Capitol Police</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Fiscal Times</font>","source":"The Fiscal Times"},"",{"title":"Police patrol vans attacked by vandals in Salford - BBC News","link":"https://www.bbc.com/news/uk-england-manchester-51597342","guid":"CBMiN2h0dHBzOi8vd3d3LmJiYy5jb20vbmV3cy91ay1lbmdsYW5kLW1hbmNoZXN0ZXItNTE1OTczNDLSATtodHRwczovL3d3dy5iYmMuY29tL25ld3MvdWstZW5nbGFuZC1tYW5jaGVzdGVyLTUxNTk3MzQyLmFtcA","pubDate":"Sat, 22 Feb 2020 08:00:00 GMT","description":"<a href=\"https://www.bbc.com/news/uk-england-manchester-51597342\" target=\"_blank\">Police patrol vans attacked by vandals in Salford</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC News</font>","source":"BBC News"},{"title":"New Surrey Police Commissioner attacks Stonewall for promoting 'dangerous transgender ideology' - Daily Mail","link":"https://www.dailymail.co.uk/news/article-9915637/New-Surrey-Police-Commissioner-attacks-Stonewall-promoting-dangerous-transgender-ideology.html","guid":"CAIiEL8exNgao7_BRLQ0bMEDLJgqGQgEKhAIACoHCAowzuOICzCZ4ocDMPvTpwY","pubDate":"Sun, 22 Aug 2021 00:19:01 GMT","description":"<a href=\"https://www.dailymail.co.uk/news/article-9915637/New-Surrey-Police-Commissioner-attacks-Stonewall-promoting-dangerous-transgender-ideology.html\" target=\"_blank\">New Surrey Police Commissioner attacks Stonewall for promoting 'dangerous transgender ideology'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Mail</font>","source":"Daily Mail"},{"title":"Police pin hopes on ‘rainbow cars’ to drive out hate crime - Telegraph.co.uk","link":"https://www.telegraph.co.uk/news/2021/08/22/police-pin-hopes-rainbow-cars-drive-hate-crime/","guid":"CBMiW2h0dHBzOi8vd3d3LnRlbGVncmFwaC5jby51ay9uZXdzLzIwMjEvMDgvMjIvcG9saWNlLXBpbi1ob3Blcy1yYWluYm93LWNhcnMtZHJpdmUtaGF0ZS1jcmltZS_SAV9odHRwczovL3d3dy50ZWxlZ3JhcGguY28udWsvbmV3cy8yMDIxLzA4LzIyL3BvbGljZS1waW4taG9wZXMtcmFpbmJvdy1jYXJzLWRyaXZlLWhhdGUtY3JpbWUvYW1wLw","pubDate":"Sun, 22 Aug 2021 14:37:00 GMT","description":"<a href=\"https://www.telegraph.co.uk/news/2021/08/22/police-pin-hopes-rainbow-cars-drive-hate-crime/\" target=\"_blank\">Police pin hopes on ‘rainbow cars’ to drive out hate crime</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Telegraph.co.uk</font>","source":"Telegraph.co.uk"},{"title":"Four key moments from police officers' Capitol Hill riot testimonies - The Week UK","link":"https://www.theweek.co.uk/news/world-news/us/953630/four-key-moments-police-officers-capitol-riot-testimony","guid":"CBMia2h0dHBzOi8vd3d3LnRoZXdlZWsuY28udWsvbmV3cy93b3JsZC1uZXdzL3VzLzk1MzYzMC9mb3VyLWtleS1tb21lbnRzLXBvbGljZS1vZmZpY2Vycy1jYXBpdG9sLXJpb3QtdGVzdGltb2550gEA","pubDate":"Wed, 28 Jul 2021 07:00:00 GMT","description":"<a href=\"https://www.theweek.co.uk/news/world-news/us/953630/four-key-moments-police-officers-capitol-riot-testimony\" target=\"_blank\">Four key moments from police officers' Capitol Hill riot testimonies</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Week UK</font>","source":"The Week UK"},{"title":"Horrified police find ‘body’ floating in water but are shocked to discover it’s a mannequin... - The Sun","link":"https://www.thesun.co.uk/news/15917734/police-find-body-in-water-but-discover-more/","guid":"CAIiEFDkkWvg-0RcJGrDlwdUKFYqGQgEKhAIACoHCAow0Ij8CjCRwIgDMMCBzAU","pubDate":"Fri, 20 Aug 2021 08:55:00 GMT","description":"<a href=\"https://www.thesun.co.uk/news/15917734/police-find-body-in-water-but-discover-more/\" target=\"_blank\">Horrified police find ‘body’ floating in water but are shocked to discover it’s a mannequin...</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Sun</font>","source":"The Sun"},{"title":"Horrifying footage shows Taliban blindfold and execute Afghan police chief - Daily Express","link":"https://www.express.co.uk/news/world/1480278/Afghanistan-news-Taliban-Afghan-police-chief-Kabul","guid":"CBMiX2h0dHBzOi8vd3d3LmV4cHJlc3MuY28udWsvbmV3cy93b3JsZC8xNDgwMjc4L0FmZ2hhbmlzdGFuLW5ld3MtVGFsaWJhbi1BZmdoYW4tcG9saWNlLWNoaWVmLUthYnVs0gFjaHR0cHM6Ly93d3cuZXhwcmVzcy5jby51ay9uZXdzL3dvcmxkLzE0ODAyNzgvQWZnaGFuaXN0YW4tbmV3cy1UYWxpYmFuLUFmZ2hhbi1wb2xpY2UtY2hpZWYtS2FidWwvYW1w","pubDate":"Tue, 24 Aug 2021 00:00:00 GMT","description":"<a href=\"https://www.express.co.uk/news/world/1480278/Afghanistan-news-Taliban-Afghan-police-chief-Kabul\" target=\"_blank\">Horrifying footage shows Taliban blindfold and execute Afghan police chief</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Express</font>","source":"Daily Express"},{"title":"The BBC's shameful smearing of the French police - Spectator.co.uk","link":"https://www.spectator.co.uk/article/the-bbc-s-shameful-smearing-of-the-french-police","guid":"CBMiVGh0dHBzOi8vd3d3LnNwZWN0YXRvci5jby51ay9hcnRpY2xlL3RoZS1iYmMtcy1zaGFtZWZ1bC1zbWVhcmluZy1vZi10aGUtZnJlbmNoLXBvbGljZdIBAA","pubDate":"Fri, 21 May 2021 07:00:00 GMT","description":"<a href=\"https://www.spectator.co.uk/article/the-bbc-s-shameful-smearing-of-the-french-police\" target=\"_blank\">The BBC's shameful smearing of the French police</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Spectator.co.uk</font>","source":"Spectator.co.uk"},{"title":"London: Police hunt man over alleged anti-Semitic attack in Stamford Hill - Sky News","link":"https://news.sky.com/story/london-police-hunt-man-over-alleged-anti-semitic-attack-in-stamford-hill-12388353","guid":"CBMibGh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2xvbmRvbi1wb2xpY2UtaHVudC1tYW4tb3Zlci1hbGxlZ2VkLWFudGktc2VtaXRpYy1hdHRhY2staW4tc3RhbWZvcmQtaGlsbC0xMjM4ODM1M9IBcGh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2FtcC9sb25kb24tcG9saWNlLWh1bnQtbWFuLW92ZXItYWxsZWdlZC1hbnRpLXNlbWl0aWMtYXR0YWNrLWluLXN0YW1mb3JkLWhpbGwtMTIzODgzNTM","pubDate":"Sun, 22 Aug 2021 22:00:26 GMT","description":"<a href=\"https://news.sky.com/story/london-police-hunt-man-over-alleged-anti-semitic-attack-in-stamford-hill-12388353\" target=\"_blank\">London: Police hunt man over alleged anti-Semitic attack in Stamford Hill</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Sky News</font>","source":"Sky News"}];
var biastest = [{"Bias": "Left", "Location": "us", "Name": "AlterNet", "specialism": null, "website": "www.alternet.org"}, {"Bias": "Center", "Location": "middle east", "Name": "Al Jazeera", "specialism": null, "website": "www.aljazeera.com"}, {"Bias": "Lean Right", "Location": "us", "Name": "Fiscal Times", "specialism": null, "website": "www.thefiscaltimes.com"}, {"Bias": "Right", "Location": "us", "Name": "American Spectator", "specialism": null, "website": "spectator.org"}, {"Bias": "Center", "Location": "uk", "Name": "BBC News", "specialism": null, "website": "www.bbc.co.uk/news"}, {"Bias": "Right", "Location": "uk", "Name": "Daily Mail", "specialism": null, "website": "www.dailymail.co.uk"}, {"Bias": "Lean Right", "Location": "uk", "Name": "The Telegraph - UK", "specialism": "paywall", "website": "www.telegraph.co.uk"}, {"Bias": "Center", "Location": "uk", "Name": "The Week", "specialism": "great", "website": "www.theweek.co.uk"}, {"Bias": "Left", "Location": "uk", "Name": "The Sun", "specialism": null, "website": "www.thesun.co.uk"}, {"Bias": "Right", "Location": "uk", "Name": "The Express", "specialism": null, "website": "www.express.co.uk"}, {"Bias": "Lean Right", "Location": "uk", "Name": "Spectator", "specialism": null, "website": "www.spectator.co.uk"}, {"Bias": "Center", "Location": "uk", "Name": "Sky News", "specialism": null, "website": "news.sky.com"}];
console.log(sortAlternativeArray(keywordtest, stringArraytest,biastest));

function sortAlternativeArray(keywords, StringArray, biasSites) {

  /*
  Id:"0",
  Name: result[0].source,
  Title: result[0].title,
  Link: result[0].link
  */

  var sortedArray = [];
  var biasSitesArray = [];
  var keywordCountArray =[];
  var highestValue = 0;
  var position = 0;

  // for each item in list, rank by number of keywords and
  // return list sorted by number of keywords

  for (i in StringArray){ 
    console.log("StringArray[i].title = " + StringArray[i].title);
    if (StringArray[i].title == undefined) keywordCountArray[i] = 0;
    else keywordCountArray[i] = keywordCount(keywords, StringArray[i].title);
  }

  for (j in keywordCountArray){
      highestValue = 0;
      position = 0;
      for (k in keywordCountArray){
          if(keywordCountArray[k] > highestValue) {
              highestValue = keywordCountArray[k];
              position = k;
          }
          sortedArray[j] = StringArray[j];
          biasSitesArray[j] = biasSites[j];
      }
  }
  
  sortedArray = sortedArray.reverse();
  biasSitesArray = biasSitesArray.reverse();

  return {
    sortedArray,
    biasSitesArray
};
}




function testKeywords(articleTitle) {
    // code to return keywords from an article title
    // var test = 'Under 40s to get single-shot Johnson & Johnson Covid vaccine to \'jab and go\' in July - Mirror Online';
    var keywords = articleTitle.matchAll(/\w*[A-Z]\w*/g);
    // ([A-Z])\w+
    var query = keywords.toString();
    query = query.replace(/,/g, "+"); 
    return query;
    };

// test data
//var keywordtest = "cat sat mat";
//var stringArraytest = ["cat test me", "test me think", "test cat mat", "cat mat", "cat sat mat"]
//console.log(findClosestMatchString(keywordtest, stringArraytest));


function findClosestMatchString(keywords, StringArray) {

    /*
    Id:"0",
    Name: result[0].source,
    Title: result[0].title,
    Link: result[0].link
    */

    var sortedArray = [];
    var keywordCountArray =[];
    var highestValue = 0;
    var position = 0;

    // for each item in list, rank by number of keywords and
    // return list sorted by number of keywords

    for (i in StringArray){ keywordCountArray[i] = keywordCount(keywords, StringArray[i]);}
    for (j in keywordCountArray){
        highestValue = 0;
        position = 0;
        for (k in keywordCountArray){
            if(keywordCountArray[k] > highestValue) {
                highestValue = keywordCountArray[k];
                position = k;
            }
            sortedArray[j] = StringArray[j];
        }
    }
    return sortedArray.reverse();
}

function keywordCount(mainTitle, otherTitle){

    // match has a bug so have to do keyword extraction long hand!

    // pre processing get rid of hyphen text which is part of RRS format
    mainTitle = mainTitle.substring(0, mainTitle.indexOf("-"));
    otherTitle = otherTitle.substring(0, otherTitle.indexOf("-"));

    // extract all keywords from string mainTitle
    var keywords = [];
    var words = ['words'];
    while(words !== null)
      {
        words = mainTitle.match(/\w*[A-Z]\w*/);
        if(words !== null) {
          keywords.push(words[0]);
          mainTitle = mainTitle.replace(words[0], "");
        }
      }
 
      console.log("words " + keywords);

      // extract all keywords from string otherTitle
    var okeywords = [];
    var owords = ['words'];
    while(owords !== null)
      {
        owords = otherTitle.match(/\w*[A-Z]\w*/);
        if(owords !== null) {
          okeywords.push(owords[0]);
          otherTitle = otherTitle.replace(owords[0], "");
        }
      }

    // count common words in arrays
    var count = 0;
    for (a in keywords) {
        for (b in okeywords) { if (keywords[a] == okeywords[b]) count++; }
    }
    return count;
}


