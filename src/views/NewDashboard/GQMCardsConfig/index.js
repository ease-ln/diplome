import * as Cards from "./Cards";
import * as DefaultCards from "./DefaultCards";

export const GQMCardsToQuestions = (GQMQuestionMetrics) => {
  console.log("result: ", GQMQuestionMetrics);
  const getName = (i) => {
    if (GQMQuestionMetrics[i] && GQMQuestionMetrics[i].content)
      return GQMQuestionMetrics[i].content;
    else return;
  };

  const tempConfig = [
    {
      name: getName(0)
        ? GQMQuestionMetrics[0].content
        : "What is the Overall Time Spent?",
      metrics:
        GQMQuestionMetrics.length > 0 &&
        GQMQuestionMetrics[0].metrics.length > 0
          ? getMetrics(GQMQuestionMetrics[0].metrics)
          : getMetrics(DefaultCards.DefaultCardsForQ1),
    },

    {
      name: getName(1)
        ? GQMQuestionMetrics[1].content
        : "What Type of Apps do Users Mostly Use?",
      metrics:
        GQMQuestionMetrics.length > 1 &&
        GQMQuestionMetrics[1].metrics.length > 0
          ? getMetrics(GQMQuestionMetrics[1].metrics)
          : getMetrics(DefaultCards.DefaultCardsForQ2),
    },

    {
      name: getName(2)
        ? GQMQuestionMetrics[2].content
        : "What is the Overall Code Quality?",
      metrics:
        GQMQuestionMetrics.length > 2 &&
        GQMQuestionMetrics[2].metrics.length > 0
          ? getMetrics(GQMQuestionMetrics[2].metrics)
          : getMetrics(DefaultCards.DefaultCardsForQ3),
    },
  ];

  return tempConfig;
};

const getMetrics = (metrics) => {
  const metricsPerQuestion = metrics.map((metric) => {
    return CardsDistribution(metric.name);
  });
  return metricsPerQuestion;
};

//list of names can be created, then use it everywhere
const CardsDistribution = (name) => {
  switch (name) {
    case "Accumulated Total Time Spent":
      return Cards.TimeSpent;
    case "Accumulated Activities":
      return Cards.Activities;
    case "Top 5 Apps per Day":
      return Cards.TopAps;
    case "Category Chart":
      return Cards.Category;
    case "SQ Number of Classes":
      return Cards.SQClasses;
    case "SQ Lines of Code":
      return Cards.SQLoc;
    case "SQ Coverage": //'SQ Coverage':
      return Cards.SQCoverage;
    default:
      return null;
    // add if there is a new widget
  }
};
