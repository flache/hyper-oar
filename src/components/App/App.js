import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';

// import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05';
import oarFacilitiesContributors from '../../data/oar-facilities-contributors-filtered';
import Map from '../Map/Map';
import './App.css';
import AccountIcon from './account.png';
import styles from './styles.module.css';

const INCLUDE_CONTRIBUTORS = require('../../data/contributors');
const ALL_CONTRIBUTORS = INCLUDE_CONTRIBUTORS; //reduceToContributors(oarFacilitiesContributors);

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
      return [];
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
      <header className="Header">
        <h1>Open Apparel Registry</h1>
        <div className="Header-account">
          <img src={AccountIcon} alt="account icon" />
          <a href="/">Login / Register</a>
        </div>
      </header>
      <main>
      <section className="Filters">
        <div className="field field-contributor">
        <label>I am this contributor:</label>
        <Select
          value={selectedContributor}
          onChange={updateContributor}
          options={ALL_CONTRIBUTORS_OPTIONS}
        />
      </div>
      <div className="field">
        <label htmlFor="exclusive" className="label-checkbox">
        <input type="checkbox" disabled={!selectedContributor} checked={showOnlyExclusive}
               onChange={updateonlyExclusive} id="exclusive" />
        <span>Only show facilities exclusively for me</span>
        </label>
      </div>
      <div className="field">
        <label>Show only facilities that are shared with ALL of the following contributors:</label>
        <Select
          isDisabled={!selectedContributor || showOnlyExclusive}
          isMulti
          value={selectedSharingContributors}
          onChange={updateSharingContributors}
          options={possibleSharingContributors}
        />
      </div>
      </section>
        <section>
          <div style={{marginBottom: '5px'}}>
            <strong>Legend</strong>&nbsp;
            Number of contributors at facility:&nbsp;
            <div className={styles.legendSquare} style={{ background: 'green' }} />
            1&nbsp;
            <div className={styles.legendSquare} style={{ background: 'yellow' }} />
            2&nbsp;
            <div className={styles.legendSquare} style={{ background: 'orange' }} />
            3&nbsp;
            <div className={styles.legendSquare} style={{ background: 'red' }} />
            >3&nbsp;
          </div>
        </section>

  <section className="Map">
      <Map
        facilities={filteredFacilitites}
      />
      </section>
      </main>
    </div>
  );
}

export default App;
