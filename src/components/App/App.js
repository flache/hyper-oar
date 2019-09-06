import React from 'react';
// import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05';
import oarFacilitiesContributors from '../../data/oar-facilities-with-contributors-2019-09-05_SHORT';

function App() {
  const facilities = oarFacilitiesContributors.slice(3);
  return (
    <div className="App">
      These are all Facilities:
      {facilities.map(fac => {
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
