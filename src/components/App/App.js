import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';

// import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05';
import oarFacilitiesContributors from '../../data/oar-facilities-contributors-filtered';
import Map from '../Map/Map';


const ALL_CONTRIBUTORS = reduceToContributors(oarFacilitiesContributors);

function reduceToContributors(inpFacilities) {
  return inpFacilities.reduce((red, c) => {
    if (!c.contributors) {
      console.log('ERR', c);
    }
    const contributorsInFacility = c.contributors.split('|')
    contributorsInFacility.forEach((contributor) => {
      if (red.indexOf(contributor) === -1) {
        red.push(contributor);
      }
    });
    return red;
  }, [])
}

function toSelectOptions(inp) {
  return inp.map(c => ({ value: c, label: c }))
}

const ALL_CONTRIBUTORS_OPTIONS = toSelectOptions(ALL_CONTRIBUTORS)

function App() {

  const [selectedContributor, setSelectedContributor] = useState(null);
  const [selectedSharingContributors, setSelectedSharingContributors] = useState(null);
  const [showOnlyExclusive, setShowOnlyExclusive] = useState(false);

  const facilities = oarFacilitiesContributors;

  const updateContributor = useCallback((opt) => {
    setSelectedContributor(opt);
  }, [setSelectedContributor]);
  const updateSharingContributors = useCallback((opt) => {
    setSelectedSharingContributors(opt);
  }, [setSelectedSharingContributors]);
  const updateonlyExclusive = useCallback((event) => {
    console.log(event.target.checked)
    setShowOnlyExclusive(event.target.checked);
  }, [setShowOnlyExclusive]);

  const myFacilities = useMemo(() => {
    if (!selectedContributor) {
      return oarFacilitiesContributors;
    }
    return oarFacilitiesContributors.filter(facility => {
      return facility.contributors.indexOf(selectedContributor.value) !== -1;
    })
  }, [selectedContributor])

  const possibleSharingContributors = useMemo(() => {
    if (!selectedContributor) {
      return []
    }
    const contributors = reduceToContributors(myFacilities).filter(i => (i !== selectedContributor.value));
    return toSelectOptions(contributors);
  }, [selectedContributor, myFacilities])

  const filteredFacilitites = useMemo(() => {


    if (showOnlyExclusive) {
      return myFacilities.filter(f => (f.contributors.indexOf('|') === -1))
    }

    if (!selectedSharingContributors) {
      return myFacilities;
    }
    return myFacilities.filter((facility) => {
      return !selectedSharingContributors.some(sharingContributor => {
        return facility.contributors.indexOf(sharingContributor.value) === -1;
      })
    })

  }, [myFacilities, selectedSharingContributors, showOnlyExclusive])
  return (
    <div className="App">
      <div style={{marginBottom: '10px'}}>
        I am this contributor:
        <Select
          value={selectedContributor}
          onChange={updateContributor}
          options={ALL_CONTRIBUTORS_OPTIONS}
        />
      </div>
      <div style={{marginBottom: '10px'}}>

        <input type="checkbox" disabled={!selectedContributor} checked={showOnlyExclusive}
               onChange={updateonlyExclusive} id="exclusive" />
        <label htmlFor="exclusive">Only show facilities exclusively for me</label>
      </div>
      <div style={{marginBottom: '10px'}}>
        Show only facilities that are shared with ALL of the following contributors:
        <Select
          isDisabled={!selectedContributor || showOnlyExclusive}
          isMulti
          value={selectedSharingContributors}
          onChange={updateSharingContributors}
          options={possibleSharingContributors}
        />
      </div>

      These are all Facilities:
      <Map
        facilities={filteredFacilitites}
      />
    </div>
  );
}

export default App;
