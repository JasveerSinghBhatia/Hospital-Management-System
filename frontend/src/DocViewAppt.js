import React, { Component} from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
} from 'grommet';

import './App.css';

const theme = {
    global: {
      colors: {
        brand: '#272343',
        focus: '#272343'
      },
      font: {
        family: 'Lato',
      },
    },
  };

export class DocViewAppt extends Component {
    state = { apptlist: [] }

    componentDidMount() {
        this.getNames();
    }

    getNames() {
        fetch('http://localhost:3001/doctorViewAppt')
        .then(res => res.json())
        .then(res => this.setState({ apptlist: res.data }));
    }

    render() {
        const { apptlist } = this.state;
        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='medium'
                elevation='small'
                justify='center'
                direction='row'
                align='center'
                flex={false}
                style={{ borderBottom: "1px solid grey" }}
            >
                <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/"><Heading level='3' margin='none'>Hospital appointment booking management system</Heading></a>
            </Box>
        );
        const Body = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                <h1 className='heading'>Your Appointments</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>Concerns</th>
                                <th>Symptoms</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apptlist.map(appt =>
                                <tr key={appt.name}>
                                    <td>{appt.id}</td>
                                    <td>{appt.name}</td>
                                    <td>{new Date(appt.date).toLocaleDateString().substring(0,10)} </td>
                                    <td>{appt.starttime}</td>
                                    <td>{appt.concerns}</td>
                                    <td>{appt.symptoms}</td>
                                    <td>{appt.status}</td>
                                    <td>
                                        <Button label="Diagnose" className='button-primary'
                                        href={`/Diagnose/${appt.id}`}
                                        ></Button>     
                                    </td> 
                                    <td>
                                        {appt.status === "NotDone"?
                                            <Button label="Cancel"  className='button-secondary'
                                            onClick = {() => {
                                                fetch('http://localhost:3001/deleteAppt?uid='+ appt.id)
                                                window.location.reload();
                                            }}
                                            ></Button>
                                        :<div></div>}
                                    </td> 
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        );
        return (
            <Grommet full={true}
            theme = {theme}>
                <Header />
                <Box fill={true} pad='medium'>
                    <Body />
                </Box>
            </Grommet>
        );
    }
}

export default DocViewAppt;