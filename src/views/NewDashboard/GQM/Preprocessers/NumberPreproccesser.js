export const LOC = (data) => {
  if (
    !data ||
    !data.reports ||
    data.reports.length === 0 ||
    !data.reports[0].sizeandcomplexities ||
    data.reports[0].sizeandcomplexities.length === 0 ||
    !data.reports[0].sizeandcomplexities[0].lines
  )
    return;
  return data.reports[0].sizeandcomplexities[0].lines;
};

export const NClasses = (data) => {
  if (
    !data ||
    !data.reports ||
    data.reports.length === 0 ||
    !data.reports[0].sizeandcomplexities ||
    data.reports[0].sizeandcomplexities.length === 0 ||
    !data.reports[0].sizeandcomplexities[0].classes
  )
    return;

  return data.reports[0].sizeandcomplexities[0].classes;
};

export const Coverage = (data) => {
  if (
    !data ||
    !data.reports ||
    data.reports.length === 0 ||
    !data.reports[0].coverages ||
    data.reports[0].coverages.length === 0 ||
    !data.reports[0].coverages[0].coverage
  )
    return;

  return data.reports[0].coverages[0].coverage;
};
