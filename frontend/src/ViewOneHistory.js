import React, { Component } from 'react';

import {
    Box,
    Heading,
    Grommet,
    Table,
    Grid,
    TableBody,
    TableCell,
    TableRow
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

export class ViewOneHistory extends Component {
    state = { medhiststate: [], medhiststate2: [] }
    componentDidMount() {
        const { email } = this.props.match.params;
        this.allDiagnoses(email);
        this.getHistory(email);
    }

    getHistory(value) {
        let email = "'" + value + "'";
        fetch('http://localhost:3001/OneHistory?patientEmail=' + email)
            .then(res => res.json())
            .then(res => this.setState({ medhiststate: res.data }));
    }

    allDiagnoses(value) {
        let email = "'" + value + "'";
        fetch('http://localhost:3001/allDiagnoses?patientEmail=' + email)
            .then(res => res.json())
            .then(res => this.setState({ medhiststate2: res.data }));
    }

    render() {
        const { medhiststate } = this.state;
        const { medhiststate2 } = this.state;
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
            <div className="container container-border">
                <div className="panel panel-default p50 uth-panel">
                    {medhiststate.map(patient =>
                    
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell scope="row">
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                        <strong>Gender</strong>
                                    </TableCell>
                                    <TableCell>
                                        {patient.gender}
                                    </TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell>
                                        <strong>Address</strong>
                                    </TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Conditions</strong>
                                    </TableCell>
                                    <TableCell>{patient.conditions}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Surgeries</strong>
                                    </TableCell>
                                    <TableCell>{patient.surgeries}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Medications</strong>
                                    </TableCell>
                                    <TableCell>{patient.medication}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </div>
                
            </div>
        );
        const Body2 = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                <h1 className='heading '>Patient's medical history</h1>

                    {medhiststate2.map(patient =>
                        <div>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Date</strong>
                                        </TableCell>
                                        <TableCell>{patient.date.split('T')[0]}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><strong>Doctor</strong></TableCell>
                                        <TableCell>{patient.doctor}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Concerns</strong>
                                        </TableCell>
                                        <TableCell>
                                            {patient.concerns}
                                        </TableCell>
                                        <TableCell />
                                        <TableCell>
                                            <strong>Symptoms</strong>
                                        </TableCell>
                                        <TableCell>{patient.symptoms}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Diagnosis</strong>
                                        </TableCell>
                                        <TableCell>{patient.diagnosis}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Prescription</strong>
                                        </TableCell>
                                        <TableCell>{patient.prescription}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        );
        return (
            <Grommet full={true} theme={theme}>
                <Box fill={true} align="left">
                    <Header />
                    <Grid
                    fill
                    rows={['auto', 'flex']}
                    columns={['auto', 'flex']}
                    areas={[
                        { name: 'sidebar', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] },
                    ]}>
                    <Box
                        gridArea="sidebar"
                        width="medium"
                        animation={[
                            { type: 'fadeIn', duration: 300 },
                            { type: 'slideRight', size: 'xlarge', duration: 150 },
                        ]}
                    >
                        <Body />
                    </Box>
                    <Box
                        gridArea="main"
                        justify="top"
                        align="left">
                        <Box align="left" pad="medium">
                        <Body2 />
                        </Box>
                    </Box>
                </Grid>
    
                    
                </Box>
            </Grommet>
        );
    }
}
export default ViewOneHistory;