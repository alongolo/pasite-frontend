import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AutocompleteC from "../AutocompleteC"
import '../../styles/Correlations.css'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BsShieldShaded} from "react-icons/bs";

/**
 * calculates the correlation between one defense system to another
 */
export default function DefVSDef({parentCallback2}) {
    const [open, setOpen] = React.useState(false);
    const [selectedA, setSelectedA] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [buttonOff, setButtonOff] = React.useState(true)


    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (getSelectedLength() === 2){
            setButtonOff(false)
        }
        else{
            setButtonOff(true)
        }
    }, [selectedA]);


    const getSelected = (selected) => {
        setSelectedA(selected)

    }


    const getSelectedLength = () => {
        return selectedA.length;
    }

    return (
        <div className="search-form">



            <FadeIn>

                <div className="title_s">
                    <h1>Defense System vs Defense System</h1>
                </div>

                <Form>

                    <Row >
                        <Col className="col_s">
                            <ListItemIcon><BsShieldShaded/></ListItemIcon>
                        </Col>
                    </Row>

                    <Form.Group as={Row} controlId="selectDefSys">
                        <Form.Label className="wrapper" column sm="4">
                            <p style={{textAlign: "right"}}>Select two different defense systems</p>
                        </Form.Label>
                        <Col sm="4">
                            <AutocompleteC disableCloseOnSelect = {true} className="textBox" apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={true} limit_length={2}
                                           parentCallback={getSelected} parentCallbackLegnth={getSelectedLength} labelText="Choose Defense Systems" ></AutocompleteC>
                        </Col>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button id="dvdSearch" onClick={() => parentCallback2(selectedA)} disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}