import * as Cards from "../../GQMCardsConfig/Cards";
import { LinePreprocesserTime, LinePreprocesserApps } from "./LinePreprocesser";
import { PiePreprocesser } from "./PiePreprocesser";
import * as NumberPrep from "./NumberPreproccesser";

export const Preprocessers = (
  type,
  data,
  userRole,
  email,
  date,
  endDate,
  name
) => {
  if (!data) return [];
  if (data.report && data.report.length === 0) return [];
  if (data.reports && data.reports.length === 0) return [];
  if (data.activityReports && data.activityReports.length === 0) return [];

  switch (type) {
    case "line":
      if (name === Cards.Activities.name) {
        return LinePreprocesserTime(data, date, endDate);
        // return TestLineData()
      }
      if (name === Cards.TopAps.name) return LinePreprocesserApps(data);
      // return TestLineApps();
      return;
    case "pie":
      return PiePreprocesser(data, userRole, email);
    // return TestPieData()
    case "number":
      if (name === Cards.SQClasses.name) return NumberPrep.NClasses(data);
      if (name === Cards.SQLoc.name) return NumberPrep.LOC(data);
      if (name === Cards.SQCoverage.name) return NumberPrep.Coverage(data);
      return;
    default:
      return [];
  }
};
