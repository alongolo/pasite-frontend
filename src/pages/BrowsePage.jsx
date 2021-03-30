import React, {Component, useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import IconButton from '@material-ui/core/IconButton';
import {ArrowsFullscreen, ZoomIn, ZoomOut} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import '../styles/BrowsePage.css';
import chroma from 'chroma-js';
import {colourOptions} from '../utilities/colors';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import '../assets/fonts/YesevaOne-Regular.ttf';
import Switch from "react-switch";
import AutocompleteC from "../components/AutocompleteC";
import MiniDrawer from "../components/Drawer";
import Cluster from "../components/Cluster";
import {Col} from "react-bootstrap";

var qs = require('qs');

class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.cluster = React.createRef();
        this.state = {
            source: [],
            loaded: false,
            textbox: true,
            textOrFile: 'Text Box',
            selectedOption: [],
            selectedFile: {},
            selectedStrains: [],
            isOpen: false,
            generateType: "defense",
            checkmlst: false
        }
    };

    /*
    load empty phylogenetic tree as default tree
     */
    componentDidMount() {
        axios
            .get(
                "http://127.0.0.1:8800/api/v1/strains/phyloTree",
                {responseType: 'arraybuffer'},
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({source: "data:;base64," + base64});
                this.setState({loaded: true})
            });
    }

    /*
    compute a new tree when the user click the button "generate tree"
    similar to the orginial function, this time - with query params.
     */
    computeTree = () => {
        this.setState({source: []});
        this.setState({loaded: false});
        let systems = []
        if (this.state.generateType == "cluster") {
            console.log("cluster")
            return this.cluster.current.getTree(this.state.selectedFile,this.state.selectedStrains).then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({source: "data:;base64," + base64});
                this.setState({loaded: true})
                this.setState({selectedFile: {}})
                this.setState({selectedOption: []})
            }).catch((err) => console.log(err)
            );

        } else {
            return axios
                .get(
                    "http://127.0.0.1:8800/api/v1/strains/phyloTree", {
                        params: {
                            systems: this.state.selectedOption.map((option) => option.label),
                            subtree: this.state.selectedFile.length > 0 ? this.state.selectedFile : this.state.selectedStrains
                        },
                        paramsSerializer: function (params) {
                            return qs.stringify(params, {arrayFormat: 'repeat'})
                        },
                        responseType: 'arraybuffer',
                    }
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({source: "data:;base64," + base64});
                    this.setState({loaded: true})
                    this.setState({selectedFile: {}})
                    this.setState({selectedOption: []})
                }).catch((err) => console.log(err)
                );
        }
    };

    /*
    handle file upload and load each line to array of
     integers (aka strain indexes for subtree) for subtree generating
     using selectedFile state.
     */
    onFileChange = e => {

        // Update the state
        if (e.target.files.length > 0) {
            e.preventDefault()
            const reader = new FileReader()
            console.log(e)
            reader.onload = async (e) => {
                const text = (e.target.result);
                this.setState({selectedFile: text.split(/\r?\n/)});
                e.target.value = null;
            };
            reader.readAsText(e.target.files[0])
        }

    };

    /*
    handle the values inserted to autocomplete component and
    saves them in variable of subtree selectedStrains
     */

    handleTextBox = selected => {

        // Update the state
        if (selected.length > 0) {
            let array = [];
            Object.keys(selected).map((key, index) => (
                array.push(selected[key]['index'])
            ))
            this.setState({selectedStrains: [...array]});
        }

    };

    generatingTypeHandler = Gtype => {
        if (Gtype == "defense") {
            this.setState({generateType: "defense"})
        }
        if (Gtype == "cluster") {
            this.setState({generateType: "cluster"})
        }
        if (Gtype == "isolation") {
            this.setState({generateType: "isolation"})
        }
    }


    render() {
        /*
        handles defense systems choice into selectedOptions state and save it.
         */
        const handleChange = selectedOption => {
            if (selectedOption == null) {
                selectedOption = []
            }
            this.setState(
                {selectedOption},
                () => console.log(`Option selected:`, this.state.selectedOption)
            );
        };
        /*
        color the defense systems options in the autocomplete box.
        also, handles multi value selection in it.
         */
        const colourStyles = {
            control: styles => ({...styles, backgroundColor: 'white'}),
            option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected
                            ? data.color
                            : isFocused
                                ? color.alpha(0.1).css()
                                : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                            ? chroma.contrast(color, 'white') > 2
                                ? 'white'
                                : 'black'
                            : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor:
                            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                };
            },
            multiValue: (styles, {data}) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: color.alpha(0.1).css(),
                };
            },
            multiValueLabel: (styles, {data}) => ({
                ...styles,
                color: data.color,
            }),
            multiValueRemove: (styles, {data}) => ({
                ...styles,
                color: data.color,
                ':hover': {
                    backgroundColor: data.color,
                    color: 'white',
                },
            }),
        };

        /*
        render the div of file upload or strain selection - according the
         choice of the user (using switch).
         */
        const renderTextBox = () => {
            if (this.state.textbox == true) {
                return <AutocompleteC multipleChoice={true} apiUrl="http://127.0.0.1:8800/api/v1/strains/indexes"
                                      parentCallback={this.handleTextBox}/>
            } else {
                return <Form.Group>
                    <Form.File onChange={(e) => this.onFileChange(e)} id="exampleFormControlFile1"
                               label="Please upload a file that contains list of strains"/>
                </Form.Group>;
            }
        }

        const renderGenerateType = () => {
            if (this.state.generateType == "defense") {
                return (<Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={colourOptions}
                    styles={colourStyles}
                    onChange={handleChange}
                />)
            }
            if (this.state.generateType == "cluster") {
                return (<Cluster ref={this.cluster} />)
            }
        }

        /*
        update the state of the file upload/strain selection on change
         */
        const setSwitchTextBox = () => {
            if (this.state.textbox == true) {
                this.setState({textbox: false});
                this.setState({textOrFile: 'File Upload'});

            } else {
                this.setState({textbox: true});
                this.setState({textOrFile: 'Text Box'});
            }
        }

        const setCheckMLST = () => {
            let a = !this.state.checkmlst;
            this.setState({checkmlst: a})
            console.log(this.state.checkmlst)
        }

        return (
            <div className="mainDiv">
                <FadeIn>
                    <div className='rowC'>
                        <div className='sidebar'>
                            <div className="instructions">choose a way to upload strains and create subtree:</div>
                            <div className="textBox">
                                <div className='rowC'>
                                    <Switch onChange={setSwitchTextBox} checked={this.state.textbox}/> <span
                                    className="switch">{this.state.textOrFile}</span>
                                </div>
                                <Form>
                                    {renderTextBox()}
                                </Form>
                            </div>
                            <div className="instructions">Choose the Defense Systems you would like to show:</div>

                            <div style={{width: "95%", marginLeft: "5%"}}>
                                {renderGenerateType()}
                                <br/>
                                <Form.Check
                                    label="Display MLST across the tree"
                                    defaultChecked={this.state.checkmlst}
                                    onChange={setCheckMLST}
                                />
                                <br/>
                                <Button onClick={() => this.computeTree()} variant="outline-primary"
                                        className='GenerateTree'>Generate Tree</Button>
                            </div>
                        </div>
                        <div className='Phylo_Tree'>
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                                {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                                    <React.Fragment>
                                        <div style={{marginLeft: "40%"}} className="tools">
                                            <IconButton onClick={zoomIn} color="primary" aria-label="upload picture"
                                                        component="span">
                                                <ZoomIn/>
                                            </IconButton>
                                            <IconButton onClick={zoomOut} color="primary" aria-label="upload picture"
                                                        component="span">
                                                <ZoomOut/>
                                            </IconButton>
                                            <IconButton onClick={resetTransform} color="primary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                <ArrowsFullscreen/>
                                            </IconButton>
                                        </div>
                                        {!this.state.loaded && (
                                            <div style={{marginLeft: "52%"}}><Spinner animation="border"
                                                                                      variant="primary"/>
                                            </div>)}
                                        <TransformComponent>


                                            <img style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                                 src={this.state.source}/>
                                        </TransformComponent>
                                    </React.Fragment>
                                )}
                            </TransformWrapper>
                            <div id="drawer">
                                <MiniDrawer generatingTypeHandler={this.generatingTypeHandler}/>
                            </div>
                        </div>
                    </div>

                </FadeIn>
            </div>
        )
    }

}

export default BrowsePage;

