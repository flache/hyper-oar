import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';

// import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05';
import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05_SHORT';


const ALL_CONTRIBUTORS = oarFacilitiesContributors.reduce((red, c) => {
  const contributorsInFacility = c.contributors.split('|')
  contributorsInFacility.forEach((contributor) => {
    if (red.indexOf(contributor) === -1) {
      red.push(contributor);
    }
  });
  return red;
}, [])

const ALL_CONTRIBUTORS_OPTIONS = ALL_CONTRIBUTORS.map(c => ({ value: c, label: c }))

function App() {

  const [selectedContributor, setSelectedContributor] = useState(null);

  const facilities = oarFacilitiesContributors;

  const updateContributor = useCallback((opt) => {
    setSelectedContributor(opt);
  }, [setSelectedContributor]);

  const filteredFacilities = useMemo(() => {
    if (!selectedContributor) {
      return ALL_CONTRIBUTORS;
    }
    return oarFacilitiesContributors.filter(facility => {
      return facility.contributors.indexOf(selectedContributor.value) !== -1;
    })
  }, [selectedContributor])
  return (
    <div className="App">
      <div>
        Select the contributor
        <Select
          value={selectedContributor}
          onChange={updateContributor}
          options={ALL_CONTRIBUTORS_OPTIONS}
        />
      </div>
      These are all Facilities:
      {filteredFacilities.map(fac => {
        return (
          <div key={fac.id}>
            {JSON.stringify(fac)}
          </div>
        )
      })}

    </div>
  );
}

export default App;
