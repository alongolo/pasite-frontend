import React from "react";
import FadeIn from "react-fade-in";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AutocompleteC from "../AutocompleteC"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BsShieldShaded} from "react-icons/bs";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import '../../styles/Correlations.css'
import {GiDrippingTube} from "react-icons/gi";

/**
 * calculates the correlation between one defense system to an ISO Type
 */
export default function DefVSIsoType({parentCallback2}) {
    const [open, setOpen] = React.useState(false);
    const [selectedDF, setSelectedDF] = React.useState([]);
    const [selectedIso, setSelectedIso] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [buttonOff, setButtonOff] = React.useState(true)


    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        console.log(selectedDF)
        let arr = selectedDF.concat(selectedIso);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedDF]);

    React.useEffect(() => {
        console.log(selectedIso)
        let arr = selectedIso.concat(selectedDF);
        if (arr.length === 2) {
            setButtonOff(false)
        } else {
            setButtonOff(true)
        }
    }, [selectedIso]);


    const getSelectedDF = (selectedA) => {
        if (selectedA) {
            setSelectedDF([selectedA]);
        } else {
            setSelectedDF([]);
        }
    }

    const getSelectedISO = (selectedA) => {
        if (selectedA) {
            setSelectedIso([selectedA]);
        } else {
            setSelectedIso([]);
        }
    }


    return (
        <div className="search-form">
            <FadeIn>
                <div className="title_s">
                    <h1>Defense System vs Isolation Type</h1>
                </div>
                <Form>
                    <Form.Group as={Row} controlId="selectDefSys">
                        <Container>
                            <Row>
                                <Col className="col_s">
                                    <ListItemIcon><BsShieldShaded/></ListItemIcon>
                                </Col>
                                <Col className="col_s">
                                    <ListItemIcon><GiDrippingTube/></ListItemIcon>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select a defense system</p>
                                </Col>
                                <Col>
                                    <p style={{textAlign: "center"}}>Select an isolation type</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/defense' multipleChoice={false}
                                                    parentCallback={getSelectedDF}
                                                    labelText="Choose a Defense System"></AutocompleteC></Col><FontAwesomeIcon
                                icon={faPlusCircle}/>
                                <Col><AutocompleteC apiUrl='http://127.0.0.1:8800/api/v1/isolation/'
                                                    multipleChoice={false}
                                                    parentCallback={getSelectedISO}
                                                    labelText="Select an Isolation Type"></AutocompleteC></Col>
                            </Row>
                        </Container>
                    </Form.Group>

                    <div style={{textAlign: "center"}}>
                        <Button id="dviSearch" onClick={() => parentCallback2(selectedDF, selectedIso)}
                                disabled={buttonOff}>Search</Button>
                    </div>
                </Form>
            </FadeIn>
        </div>


    );
}