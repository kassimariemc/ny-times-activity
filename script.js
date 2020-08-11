$(document).ready(function () {
  var queryParams = {
    "api-key": "fyiHJshl5jAAgIfteDlAJAhSEy8dVSpC",
    "sort": "relevance"
  };

  $("#search-button").on("click", function () {
    queryParams.q = $("#keyword").val().trim();

    var startYear = $("#yr-start").val().trim();
    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101";
    }
    var endYear = $("#yr-end").val().trim();
    if (parseInt(endYear)) {
      queryParams.end_date = endYear + "0101";
    }

    getArticle($.param(queryParams));
  });

  function getArticle(results) {
    $.ajax({
      type: "GET",
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + results,
      dataType: "json",
      success: function (data) {

        var numRecs = $("#num-records").val();
        for (var i = 0; i < numRecs; i++) {
          //Card Elements
          var card = $("<div>").attr("class", "card");
          var cardBody = $("<div>").attr("class", "card-body");
          $("#articles").append(card.append(cardBody));

          //Article Info
          var headline = data.response.docs[i].headline.main;
          var by = data.response.docs[i].byline.original;
          var section = data.response.docs[i].section_name;
          var pubDate = data.response.docs[i].pub_date;
          var abbrPubDate = pubDate.substring(0, 10);
          var webLink = data.response.docs[i].web_url;

          //Article Elements
          var headlineEl = $("<p>").attr("class", "card-title");
          var strongHeadline = $("<strong>").text((i + 1) + ". " + headline);
          headlineEl.append(strongHeadline);
          var byEl = $("<p>").attr("class", "card-title").text(by);
          var sectionEl = $("<p>").attr("class", "card-title").text("Section: " + section);
          var pubDateEl = $("<p>").attr("class", "card-title").text(abbrPubDate);
          var webLinkEl = $("<a>").attr("class", "card-title").attr("href", webLink).text("Go To Article").attr("target", "_blank");

          //Append article elements
          cardBody.append(headlineEl, byEl, sectionEl, pubDateEl, webLinkEl);
        }
      }
    });
  }

  $("#clear-button").on("click", function () {
    $("#articles").empty();
  });
});