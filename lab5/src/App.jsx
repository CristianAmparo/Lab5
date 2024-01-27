import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();
  const [provinces, setProvinces] = useState();
  const [selectedProvinces, setSelectedProvinces] = useState();
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState();
  const [barangays, setBarangays] = useState();
  const [selectedBarangays, setSelectedBarangays] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/regions/');
        setRegions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`);
        setProvinces(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedRegion) {
      fetchProvinces();
    }
  }, [selectedRegion]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`https://psgc.gitlab.io/api/provinces/${selectedProvinces}/cities-municipalities//`);
        setMunicipalities(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedProvinces) {
      fetchProvinces();
    }
  }, [selectedProvinces]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${selectedMunicipalities}/barangays/`);
        setBarangays(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedMunicipalities) {
      fetchProvinces();
    }
  }, [selectedMunicipalities]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRegion || !selectedProvinces || !selectedMunicipalities || !selectedBarangays) {
      // Display SweetAlert for incomplete fields
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill out all the fields in the form.',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful!',
        text: 'Your form has been submitted successfully.',
      });

        setSelectedRegion('');
        setSelectedProvinces('');
        setSelectedMunicipalities('');
        setSelectedBarangays('');
        setProvinces([]);
        setMunicipalities([]); 
        setBarangays([]);
    }
  };

  return (
    <>
      <div className="container-fluid text-bg-dark">
        <div className="container">
          <section className="p-3 text-center">
            <h1 className="text-uppercase">Philippines Barangay Selector</h1>
          </section>
        </div>
      </div>
      <div className="container">
        <section className="d-flex justify-content-center p-3">
          <form style={{ width: '50%' }} onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="region">
                Region
              </label>
              <select className="form-control" value={selectedRegion ? selectedRegion : ''} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="" disabled> Choose region... </option>
                {
                  regions.map((item) => (
                    <option key={item.code} value={item.code}> {item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="province">
                Province
              </label>
              <select
                className="form-control"
                value={selectedProvinces ? selectedProvinces : ''}
                onChange={(e) => setSelectedProvinces(e.target.value)}
                disabled={!selectedRegion}
              >
                <option value="" > Choose province... </option>
                {
                  provinces && provinces.map((item) => (
                    <option key={item.code} value={item.code}> {item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="municipality">
                City/Municipality
              </label>
              <select
                className="form-control"
                value={selectedMunicipalities ? selectedMunicipalities : ''}
                onChange={(e) => setSelectedMunicipalities(e.target.value)}
                disabled={!selectedProvinces}
              >
                <option value="" disabled>
                  Choose city/municipality...
                </option>
                {
                  municipalities && municipalities.map((item) => (
                    <option key={item.code} value={item.code}> {item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="barangay">
                Barangay
              </label>
              <select className="form-control"
                value={selectedBarangays ? selectedBarangays : ''}
                onChange={(e) => setSelectedBarangays(e.target.value)}
                disabled={!selectedMunicipalities}
              >
                <option value="" disabled>
                  Choose barangay...
                </option>
                {
                  barangays && barangays.map((item) => (
                    <option key={item.code} value={item.code}> {item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group">
              <button className="btn w-100 btn-primary" data-select="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
