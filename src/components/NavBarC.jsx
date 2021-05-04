import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import '../styles/NavBarC.css';
import SearchPage from "../pages/SearchPage";
import ResultsPage from "../pages/ResultsPage";
import BrowsePage from "../pages/BrowsePage";
import DownloadPage from "../pages/DownloadPage";
import CorrelationResultsPage from "../pages/CorrelationResultsPage";
import CorrelationSearchPage from "../pages/CorrelationSearchPage"
import MainPage from "../pages/MainPage";
import StrainCircosResultsPage from "../pages/StrainCircosResultsPage"
import StrainCircosPage from "../pages/StrainCircosPage";
import { BrowserRouter as Switch } from "react-router-dom";
import { Route } from "react-router";

class NavBarC extends Component{
    static = {};
    render() {
        return (
            <div >
            <Card className="card_m"  >
                <Card.Header style={{marginBottom: "2%"}}>
                    <Nav fill activeKey="/">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/search">Search</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/CircosStrain">Circos Strain View</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/browse">Browse</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/download">Download</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/CorrelationSearchPage">Correlation</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="body_c" style={{ minHeight:'600px', padding: '0px'}} >
                    <span className="cb">
                    <Card.Text>
                        <Switch>
                            <Route path="/search">
                                <SearchPage/>
                            </Route>

                            <Route path="/results">
                                <ResultsPage/>
                            </Route>

                            <Route path="/browse">
                                <BrowsePage/>
                            </Route>

                            <Route path="/download">
                                <DownloadPage/>
                            </Route>

                            <Route path="/CircosStrain">
                                <StrainCircosPage/>
                            </Route>

                            <Route path="/resultsCircosStrain">
                                <StrainCircosResultsPage/>
                            </Route>

                            <Route path="/CorrelationSearchPage">
                                <CorrelationSearchPage/>
                            </Route>

                            <Route path="/resultsCorrelationPage">
                                <CorrelationResultsPage/>
                                </Route>

                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                        </Switch>
                    </Card.Text>
                        </span>
                </Card.Body>
                <Card.Footer className="c_footer">About</Card.Footer>
            </Card>
            </div>
        )
    }
}

export default NavBarC;