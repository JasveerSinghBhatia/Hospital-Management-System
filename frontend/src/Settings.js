import React, { Component} from 'react';

import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form,
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
export class Settings extends Component {
    constuctor() {
    }
    render() {
        return (
            <Grommet theme={theme} full>
                <Box  >
                    <Header />
                    <Box pad="small" width='medium' className='forget'>
                    <Form
                    onSubmit={({ value }) => {
                        let email_in_use = "";
                        console.log(value);
                        fetch("http://localhost:3001/userInSession")
                          .then(res => res.json())
                          .then(res => {
                            var string_json = JSON.stringify(res);
                            var email_json = JSON.parse(string_json);
                            email_in_use = email_json.email;
                            console.log(email_in_use);
                            console.log("eg");
                          fetch("http://localhost:3001/resetPasswordPatient?email=" + 
                          email_in_use + "&oldPassword=" + value.oldPassword + "&newPassword=" + 
                          value.newPassword, {method: 'POST'})
                          .then(res => res.json())
                          .then(res => {
                            let didUpdate = res.data.affectedRows;
                            if(didUpdate === 0) {
                                window.alert("Entered your old password incorrectly");
                            } else {
                                window.alert("Password Reset Successful");
                            }
                          });
                          });
                    }}>
                        <h3>Password Change</h3>
                        <FormField
                            type='password'
                            label="Old password"
                            name="oldPassword"
                            required
                        />
                        <br />
                        <FormField
                            label="New password"
                            name="newPassword"
                            required
                        />
                        <br />
                        <Button
                            type="submit"
                            label="Change Password"
                            className='button-primary'
                            primary
                        />
                    </Form>
                    </Box>
                </Box>
            </Grommet>
        );
    }
}
export default Settings;